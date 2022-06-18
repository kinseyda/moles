import SerializableClass, { SerializableClasses } from "./serializable-class";
import Upgrade from "./upgrade";
import Structure from "./structure";
import Resource from "./resource";
import Dig from "./dig";
import { reactive } from "vue";
import { handleEvent } from "./event-handling";
import { RequirementType, ResourceRate } from "../content/data-interfaces";
import Area from "./area";
import {
  startingArea,
  startingDig,
  startingExpansions,
  startingResources,
  startingStructures,
  startingUpgrades,
} from "../content/start";
import Expansion from "./expansion";
import Civilization from "./civilization";
import meta from "../metadata.json";

export const currentVersion = meta["gameVersion"];

/**
 * Handles all internal game logic.
 * @extends SerializableClass {@link SerializableClass}
 */
export class Game extends SerializableClass {
  creationVersion: string;
  lastUpdate: number;
  dig: Dig;
  area: Area;
  population: number;
  name: string;
  resourceDict: { [id: number]: Resource };
  upgradeDict: { [id: number]: Upgrade };
  structureDict: { [id: number]: Structure };
  expansionDict: { [id: number]: Expansion };
  permanentUnlocks: { [id: number]: boolean };
  civilizations: Civilization[];
  empireMultiplier: number;
  eventsDict: { [id: number]: number };
  // EventId: Time achieved / last achieved

  /**
   * @param creationVersion - Value of currentVersion at time of creation, used
   * to tell how bad a savegame mismatch is
   * @param lastUpdate - Time of the most recent tick (in ms since epoch).
   * Use Date.now().
   * @param dig - {@link Dig} that stores the game's current dig stats.
   * @param area - {@link Area} that stores the game's current area and related
   * stats.
   * @param population - The amount of moles in this current game.
   * @param name - The name of the civilization currently being played.
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
   * @param permanentUnlocks - A dictionary of ids to booleans to show that the
   * unlock has been unlocked (un-unlocked unlocks will not appear). These are
   * mainly used for unlocking ui elements.
   * @param civilizations - List of {@link Civilization}s that the player has
   * prestiged through.
   * @param empireMultiplier - The fraction of total empire production you
   * receive.
   * @param eventsDict - A dictionary of valid ids (that correspond to an event
   * in {@link eventDataDict}) to the time they were achieved (ms since epoch).
   */
  constructor(
    creationVersion: string,
    lastUpdate: number,
    dig: Dig,
    area: Area,
    population: number,
    name: string,
    resourceDict: { [id: number]: Resource },
    upgradeDict: { [id: number]: Upgrade },
    structureDict: { [id: number]: Structure },
    expansionDict: { [id: number]: Expansion },
    permanentUnlocks: { [id: number]: boolean },
    civilizations: Civilization[],
    empireMultiplier: number,
    eventsDict: { [id: number]: number }
  ) {
    super(SerializableClasses.Game);
    this.creationVersion = creationVersion;
    this.lastUpdate = lastUpdate;
    this.dig = dig;
    this.area = area;
    this.population = population;
    this.name = name;
    this.resourceDict = resourceDict;
    this.upgradeDict = upgradeDict;
    this.structureDict = structureDict;
    this.expansionDict = expansionDict;
    this.permanentUnlocks = permanentUnlocks;
    this.civilizations = civilizations;
    this.empireMultiplier = empireMultiplier;
    this.eventsDict = eventsDict;
  }

  /**
   * Updates all {@link Resource}s in {@link Game.resourceDict resourceDict}
   * based on their {@link Resource.trueRate trueRate} property and how long it
   * has been since {@link Game.lastUpdate lastUpdate}
   *
   * @param debugMultiplier - "Makes time go faster" by this amount.
   *
   * Works by going over all structures (checking that consumption requirements
   * are met) and creating a dict of changes to make in the next tick (which is
   * then converted to Mo/s for the rate)
   */
  tick(debugMultiplier?: number) {
    const updateTime = Date.now();
    const tickSize =
      ((updateTime - this.lastUpdate) * (debugMultiplier || 1)) / 1000;
    // Fraction of a second

    this.population = this.getNextPopulation(tickSize);
    if (this.area.amount > this.area.getUsableArea()) {
      this.area.amount = this.area.getUsableArea();
      this.updateCaps();
      this.checkCaps();
    }

    // Add area from digging
    if (this.dig.digging) {
      this.area.setOrCap(this.area.getNextAmount(tickSize));
    }

    const resCaps: { [resId: number]: number } = {};
    for (const resId in this.resourceDict) {
      resCaps[resId] = this.resourceDict[resId].cap;
    }

    const resCh = this.getResourceChanges(tickSize, resCaps);

    const resChanges: {
      [resId: number]: number;
    } = resCh["changes"];
    const resBreakdown: {
      [resId: number]: ResourceRate;
    } = resCh["breakdown"];

    // Make changes
    for (const resID in resChanges) {
      if (resID in this.resourceDict) {
        // makes sure you dont try to increment resources that haven't been
        // unlocked yet(from previous civilizations)
        this.resourceDict[resID].incrementOrCap(resChanges[resID]);
      }
    }

    for (const resID in this.resourceDict) {
      this.resourceDict[resID].updateRateFromTick(
        resChanges[resID] || 0,
        tickSize,
        resBreakdown[resID]
      );
    }

    this.lastUpdate = updateTime;
  }

  getResourceChanges(tickSize: number, resCaps: { [resId: number]: number }) {
    const popMult =
      this.getPopulation() >= 2 ? 1 + this.getPopulation() / 100 : 1;
    const resChanges: { [resId: number]: number } = {};
    const rateBreakdown: { [resId: number]: ResourceRate } = {};

    for (const resId in this.resourceDict) {
      rateBreakdown[resId] = {
        digRate: 0,
        structureProd: 0,
        structureCons: 0,
        resourceMult: this.resourceDict[resId].multiplier,
        popMult: popMult,
        empireRate: 0,
        empireMult: this.empireMultiplier,
      };
    }

    if (this.dig.digging) {
      for (const resID in this.dig.digRates) {
        rateBreakdown[resID].digRate = this.dig.digRates[resID];
        resChanges[resID] =
          (resChanges[resID] || 0) +
          this.dig.digRates[resID] *
            this.resourceDict[resID].multiplier *
            popMult *
            tickSize;
      }
    }

    // Go over structs
    for (const structID in this.structureDict) {
      const curStruct = this.structureDict[structID];
      const structAmount = curStruct.amount;

      // Check space is not already filled in all resources
      // Caused issues where rates would jitter annoyingly
      //   let shouldProd = false;
      //   for (const resID in curStruct.dataObject.production) {
      //     if (this.resourceDict[resID].amount < resCaps[resID]) {
      //       shouldProd = true;
      //       break;
      //     }
      //   }
      //   if (!shouldProd) {
      //     continue;
      //   }

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
          rateBreakdown[resID].structureCons =
            (rateBreakdown[resID].structureCons || 0) + structConsume[resID];
        }
        for (const resID in curStruct.dataObject.production) {
          resChanges[resID] =
            (resChanges[resID] || 0) +
            curStruct.dataObject.production[resID] *
              popMult *
              this.resourceDict[resID].multiplier *
              // Multiplier only for prod not consumption
              structAmount *
              tickSize;
          rateBreakdown[resID].structureProd =
            (rateBreakdown[resID].structureProd || 0) +
            curStruct.dataObject.production[resID] * structAmount;
        }
      }
    }

    // Add civilization changes
    for (const civ of this.civilizations) {
      for (const resIdStr in civ.resourceRates) {
        if (resChanges[resIdStr] === undefined) {
          continue;
        }
        const resId = Number(resIdStr);
        resChanges[resId] =
          (resChanges[resId] || 0) +
          civ.resourceRates[resId] * this.empireMultiplier * tickSize;
        rateBreakdown[resId].empireRate =
          (rateBreakdown[resId].empireRate || 0) + civ.resourceRates[resId];
      }
    }
    return { changes: resChanges, breakdown: rateBreakdown };
  }

  getPopulation(): number {
    return Math.floor(this.population);
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
    // const a = 60; // 1 minute
    // const a = 5; // 5 sec
    const a = 1200;

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

  checkCaps() {
    for (const resId in this.resourceDict) {
      this.resourceDict[resId].checkCap();
    }
  }

  getEmpireRates() {
    const resRates: { [resId: number]: number } = {};
    for (const civ of this.civilizations) {
      for (const resId in civ.resourceRates) {
        resRates[resId] = (resRates[resId] || 0) + civ.resourceRates[resId];
      }
    }
    return resRates;
  }

  getHighestPotentialRates() {
    const resCaps: { [resId: number]: number } = {};
    for (const resId in this.resourceDict) {
      resCaps[resId] = Infinity;
    }
    return this.getResourceChanges(1, resCaps)["changes"];
  }

  prestige(resIDs: number[]) {
    const prod = this.getHighestPotentialRates();
    const resRates: { [resId: number]: number } = {};
    for (const index in resIDs) {
      const resId = resIDs[index];
      resRates[resId] = prod[resId];
    }

    const civ = new Civilization(resRates, this.name, this.population);
    this.civilizations.push(civ);

    const g = new Game(
      this.creationVersion,
      Date.now(),
      startingDig(),
      startingArea(),
      1,
      "Civ " + Date.now(),
      startingResources(),
      startingUpgrades(),
      startingStructures(),
      startingExpansions(),
      this.permanentUnlocks,
      this.civilizations,
      0,
      this.eventsDict
    );

    setGame(g);
    this.handleEvent(RequirementType.prestige);
  }

  /**
   * Returns true if the given permanent unlock has been unlocked
   * @param permId - The id of the unlock to check
   * @returns Boolean value representing unlock status
   */
  isUnlocked(permId: number): boolean {
    return this.permanentUnlocks[permId] || false;
  }

  static loadGame(gameString: string) {
    const recurConstruct = (obj: any) => {
      if (
        (Array.isArray(obj) && obj.length > 0) ||
        (typeof obj !== "string" && Object.keys(obj).length > 0)
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
              obj.creationVersion,
              obj.lastUpdate,
              obj.dig,
              obj.area,
              obj.population,
              obj.name,
              obj.resourceDict,
              obj.upgradeDict,
              obj.structureDict,
              obj.expansionDict,
              obj.permanentUnlocks,
              obj.civilizations,
              obj.empireMultiplier,
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
            return new Area(obj.amount, obj.cap);
          case "Civilization":
            return new Civilization(
              obj.resourceRates,
              obj.name,
              obj.population
            );
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
      setGame(recurConstruct(save));
      game.handleEvent(RequirementType.loadGame);
    }
  }
}

export function setGame(newGame: Game) {
  game = reactive(newGame);
}

export function startGame() {
  setGame(
    new Game(
      currentVersion,
      Date.now(),
      startingDig(),
      startingArea(),
      1,
      "Civ " + Date.now(),
      startingResources(),
      startingUpgrades(),
      startingStructures(),
      startingExpansions(),
      {},
      [],
      0,
      {}
    )
  );
  handleEvent(RequirementType.gameStart, game);
}

/**
 * The static game being played
 * Use {@link setGame} to change
 */
export let game: Game;
