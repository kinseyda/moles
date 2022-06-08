import SerializableClass, { SerializableClasses } from "./serializable-class";
import Upgrade from "./upgrade";
import Structure from "./structure";
import Resource from "./resource";
import Dig from "./dig";
import { reactive } from "vue";
import { handleEvent } from "./event-handling";
import { RequirementType } from "../content/data-interfaces";
import Area from "./area";
import {
  startingExpansions,
  startingResources,
  startingStructures,
  startingUpgrades,
} from "./start";
import Expansion from "./expansion";
import Civilization from "./civilization";
import { logBaseA } from "./math-utils";

/**
 * Handles all internal game logic.
 * @extends SerializableClass {@link SerializableClass}
 */
export class Game extends SerializableClass {
  lastUpdate: number;
  dig: Dig;
  area: Area;
  population: number;
  resourceDict: { [id: number]: Resource };
  upgradeDict: { [id: number]: Upgrade };
  structureDict: { [id: number]: Structure };
  expansionDict: { [id: number]: Expansion };
  eventsDict: { [id: number]: number };
  // EventId: Time achieved / last achieved

  /**
   * @param lastUpdate - Time of the most recent tick (in ms since epoch).
   * Use Date.now().
   * @param dig - {@link Dig} that stores the game's current dig stats.
   * @param area - {@link Area} that stores the game's current area and related
   * stats.
   * @param population - The amount of moles in this current game.
   * @param resourceDict - A dictionary of ids to their corresponding
   * {@link Resource}. Does not
   *  necessarily contain every resource contained in the static
   * {@link resourceDataDict}
   * @param upgradeDict - A dictionary of ids to their corresponding
   * {@link Upgrade}.
   * @param structureDict - A dictionary of ids to their corresponding
   * {@link Structure}.
   * @param expansionDict - A dictionary of ids to their corresponding
   * {@link Expansion}.
   * @param eventsDict - A dictionary of valid ids (that correspond to an event
   * in {@link eventDataDict}) to the time they were achieved (ms since epoch).
   */
  constructor(
    lastUpdate: number,
    dig: Dig,
    area: Area,
    population: number,
    resourceDict: { [id: number]: Resource },
    upgradeDict: { [id: number]: Upgrade },
    structureDict: { [id: number]: Structure },
    expansionDict: { [id: number]: Expansion },
    eventsDict: { [id: number]: number }
  ) {
    super(SerializableClasses.Game);
    this.lastUpdate = lastUpdate;
    this.dig = dig;
    this.area = area;
    this.population = population;
    this.resourceDict = resourceDict;
    this.upgradeDict = upgradeDict;
    this.structureDict = structureDict;
    this.expansionDict = expansionDict;
    this.eventsDict = eventsDict;
    this.handleEvent(RequirementType.gameStart);
  }

  /**
   * Updates all {@link Resource}s in {@link Game.resourceDict resourceDict}
   * based on their {@link Resource.trueRate trueRate} property and how long it
   * has been since {@link Game.lastUpdate lastUpdate}
   *
   * Works by going over all structures (checking that consumption requirements
   * are met) and creating a dict of changes to make in the next tick (which is
   * then converted to Mo/s for the rate)
   */
  tick() {
    const updateTime = Date.now();
    const tickSize = (updateTime - this.lastUpdate) / 1000;
    // Fraction of a second

    const resChanges: { [resID: number]: number } = {};

    // Add area from digging
    if (this.dig.digging) {
      this.area.setAmount(this.area.getNextAmount(tickSize));
      if (this.area.amount > this.area.cap) {
        this.area.setAmount(this.area.cap);
      }
      for (const resID in this.dig.digRates) {
        resChanges[resID] =
          (resChanges[resID] || 0) +
          this.dig.digRates[resID] *
            this.resourceDict[resID].multiplier *
            tickSize;
      }
    }

    // Go over structs
    for (const structID in this.structureDict) {
      const curStruct = this.structureDict[structID];
      const structAmount = curStruct.amount;

      // Check space is not already filled in all resources
      let shouldProd = false;
      for (const resID in curStruct.dataObject.production) {
        if (this.resourceDict[resID].amount < this.resourceDict[resID].cap) {
          shouldProd = true;
          break;
        }
      }
      if (!shouldProd) {
        continue;
      }

      // Check all consumption requirements are met
      let canConsume = true;
      const structConsume: {
        [resID: number]: number;
      } = {};

      for (const resID in curStruct.dataObject.consumption) {
        const toConsume =
          curStruct.dataObject.consumption[resID] * structAmount * tickSize;
        const afterOthers =
          this.resourceDict[resID].amount + (resChanges[resID] || 0);
        if (afterOthers < toConsume) {
          canConsume = false;
          break;
        } else {
          structConsume[resID] = toConsume;
        }
      }
      if (!canConsume) {
        continue;
      } else {
        for (const resID in structConsume) {
          resChanges[resID] = (resChanges[resID] || 0) - structConsume[resID];
        }
        for (const resID in curStruct.dataObject.production) {
          resChanges[resID] =
            (resChanges[resID] || 0) +
            curStruct.dataObject.production[resID] *
              this.resourceDict[resID].multiplier *
              // Multiplier only for prod not consumption
              structAmount *
              tickSize;
        }
      }
    }

    // Make changes

    for (const resID in resChanges) {
      this.resourceDict[resID].incrementOrCap(resChanges[resID]);
    }

    for (const resID in this.resourceDict) {
      this.resourceDict[resID].updateRateFromTick(
        resChanges[resID] || 0,
        tickSize
      );
    }

    this.population = this.getNextPopulation(tickSize);

    this.lastUpdate = updateTime;
  }

  /**
   * Finds the maximum amount of moles that will live in the current
   * civilization.
   */
  getPopulationCap(): number {
    return this.area.cap / 2;
  }

  /**
   * Calculates what the next amount of moles should be.
   * @param diff - The amount of time since the last game tick.
   * @returns - What the new total amount of area should be.
   */
  getNextPopulation(diff: number): number {
    /**
     * Population is logistic, and bear with me, this is the equation
     * y = \frac{s \cdot M}{s+(M - s)\cdot 2^{k \cdot x}}
     * with
     * k = 2\cdot \frac{\log_2\left(\frac{s}{M-s}\right)}{a}
     * This is designed so that the amount of moles increases fastest in the
     * middle. Moles dont like being overcrowded.
     *
     * s = starting moles (2)
     * M = cap (half of the total area?)
     * a = "time until done" (2 times the time until half done in reality)
     *
     * The inverse of this function then is:
     * y=\frac{\log_{2}\left(
     * \frac{P_{0}M-P_{0}x}{x\left(M-P_{0}\right)}\right)}{k}
     *
     * If this is really slow, I think an offset sine wave may be cheaper to
     * compute and functionally identical, change to that if necessary (eg
     * something like \frac{M}{2}\left(-1\right)\cos\left(\frac{\pi x}{a}\right)
     * +\frac{M}{2}).
     */
    const popCap = this.area.cap / 2;
    if (this.population < 2 || this.population == popCap) {
      return this.population;
    }
    if (popCap - this.population < 0.001) {
      return popCap;
    }

    const s = 2;
    const M = popCap;
    // const a = 600; // 10 minutes
    const a = 60; // 1 minute

    const k = (2 * Math.log2(s / (M - s))) / a;

    const curY = this.population;
    const curX = Math.log2((s * M - s * curY) / (curY * (M - s))) / k;
    const nextX = curX + diff;

    return (s * M) / (s + (M - s) * 2 ** (k * nextX));
  }

  /**
   * @see {@link handleEvent}
   * @param triggerEventType - The type of event calling this function, from
   * {@link RequirementType}. Eg when a resource amount changes this is
   * {@link RequirementType.resourceAmount resourceAmount}.
   * @param params - Optional parameters used for some event types. Eg
   * resourceAmount uses the "resId" property, prevEvent uses the "evId"
   * property.
   */
  handleEvent(
    triggerEventType: RequirementType,
    params?: { [x: string]: any }
  ) {
    handleEvent(triggerEventType, this, params);
  }
  /**
   * Sets all {@link Resource}s {@link Resource.amount amount}s to 0
   */
  resetResourceAmounts() {
    for (const resId in this.resourceDict) {
      this.resourceDict[resId].reset();
    }
  }

  totalPriorities(): number {
    let total = 0;
    for (const resId in this.resourceDict) {
      total += Number(this.resourceDict[resId].capPriority);
    }
    return total;
  }

  updateCaps() {
    const total = this.totalPriorities();
    for (const resId in this.resourceDict) {
      this.resourceDict[resId].setCap(this.area.amount, total);
    }
  }

  static loadGame(gameString: string) {
    const recurConstruct = (obj: any) => {
      if (
        (Array.isArray(obj) && obj.length > 0) ||
        Object.keys(obj).length > 0
      ) {
        // If list or object, recurse through each thing contained to assign all
        // the referenced items into the class they need
        for (const i in obj) {
          if (i != "_class") {
            obj[i] = recurConstruct(obj[i]);
          }
        }
      }
      if (SerializableClasses[obj["_class"]] !== undefined) {
        // We only need to do anything if the object we're looking at has a
        // "_class" key, otherwise it should just be returned
        switch (SerializableClasses[Number(obj["_class"])]) {
          case "Game":
            return new Game(
              obj.lastUpdate,
              obj.dig,
              obj.area,
              obj.population,
              obj.resourceDict,
              obj.upgradeDict,
              obj.structureDict,
              obj.expansionDict,
              obj.eventsDict
            );
          case "Resource":
            return new Resource(
              obj.id,
              obj.amount,
              obj.cap,
              obj.capPriority,
              obj.multiplier
            );
          case "Upgrade":
            return new Upgrade(obj.id, obj.bought, obj.discount);
          case "Structure":
            return new Structure(obj.id, obj.amount, obj.discount);
          case "Expansion":
            return new Expansion(obj.id, obj.amount, obj.discount);
          case "Dig":
            return new Dig(obj.digRates);
          case "Area":
            return new Area(obj.amount, obj.cap, obj.multiplier);
          case "Civilization":
            return new Civilization(obj.resRates, obj.name, obj.population);
          default:
            // Shouldn't happen, nothing should be a SerializableClass without
            // being one of the classes listed above, and constructed that way
            console.error(
              "Warning: SerializableClass loaded, this may be an error"
            );
            return Object.assign(
              new SerializableClass(SerializableClasses.SerializableClass),
              obj
            );
        }
      } else if (obj["_class"] !== undefined) {
        throw new Error(`Loading error! Invalid class '${obj["_class"]}'`);
      }
      return obj;
    };
    if (gameString) {
      const save = JSON.parse(gameString);
      game = reactive(recurConstruct(save));
    }
  }
}

/**
 * The static game being played
 * Use {@link setGame} to change
 */
export let game: Game = reactive(
  new Game(
    Date.now(),
    new Dig({ 0: 10, 1: 1 }),
    new Area(0, 100, 1),
    2,
    startingResources,
    startingUpgrades,
    startingStructures,
    startingExpansions,
    {}
  )
);
