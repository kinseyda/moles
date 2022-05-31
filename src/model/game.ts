import SerializableClass, { SerializableClasses } from "./serializable-class";
import Upgrade from "./upgrade";
import Structure from "./structure";
import Resource from "./resource";
import Dig from "./dig";
import { reactive } from "vue";
import { handleEvent } from "./event-handling";
import { RequirementType } from "./staticData/data-interfaces";
import Area from "./area";
import {startingExpansions, startingResources, startingStructures, startingUpgrades} from "./start"
import Expansion from "./expansion";

/**
 * Handles all internal game logic.
 * @extends SerializableClass {@link SerializableClass}
 */
export class Game extends SerializableClass {
  lastUpdate: number;
  dig: Dig;
  area: Area;
  resourceDict: { [id: number]: Resource };
  upgradeDict: { [id: number]: Upgrade };
  structureDict: { [id: number]: Structure };
  expansionDict: { [id: number]: Expansion };
  eventsDict: { [id: number]: number }; // EventId: Time achieved / last achieved

  /**
   * @param lastUpdate - Time of the most recent tick (in ms since epoch). Use Date.now().
   * @param dig - {@link Dig} that stores the game's current dig stats.
   * @param area - {@link Area} that stores the game's current area and related stats.
   * @param resourceDict - A dictionary of ids to their corresponding {@link Resource}. Does not necessarily contain every resource contained in the static {@link resourceDataDict}
   * @param upgradeDict - A dictionary of ids to their corresponding {@link Upgrade}.
   * @param structureDict - A dictionary of ids to their corresponding {@link Structure}.
   * @param expansionDict - A dictionary of ids to their corresponding {@link Expansion}.
   * @param eventsDict - A dictionary of valid ids (that correspond to an event in {@link eventDataDict}) to the time they were achieved (ms since epoch).
   */
  constructor(
    lastUpdate: number,
    dig: Dig,
    area: Area,
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
    this.resourceDict = resourceDict;
    this.upgradeDict = upgradeDict;
    this.structureDict = structureDict;
    this.expansionDict = expansionDict;
    this.eventsDict = eventsDict;
    this.handleEvent(RequirementType.gameStart);
  }

  /**
   * Updates all {@link Resource}s in {@link Game.resourceDict resourceDict} based on their {@link Resource.trueRate trueRate} property and how long it has been since {@link Game.lastUpdate lastUpdate}
   */
  tick() {
    const updateTime = Date.now();
    const diff = (updateTime - this.lastUpdate) / 1000;
    for (const resId in this.resourceDict) {
      const newAmount =
        this.resourceDict[resId].amount +
        this.resourceDict[resId].trueRate * diff;
      if (newAmount > this.resourceDict[resId].cap) {
        this.resourceDict[resId].setAmount(this.resourceDict[resId].cap);
      } else {
        this.resourceDict[resId].setAmount(newAmount);
      }
    }
    if (this.dig.digging) {
      this.area.setAmount(this.area.getNextAmount(diff));
      if (this.area.amount > this.area.cap) {
        this.area.setAmount(this.area.cap);
      }
    }

    this.lastUpdate = updateTime;
  }
  /**
   * @see {@link handleEvent}
   * @param triggerEventType - The type of event calling this function, from {@link RequirementType}. Eg when a resource amount changes this is {@link RequirementType.resourceAmount resourceAmount}.
   * @param params - Optional parameters used for some event types. Eg resourceAmount uses the "resId" property, prevEvent uses the "evId" property.
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
  /**
   * Sets all {@link Resource}s {@link Resource.baseRate baseRate}s to 0.
   */
  resetBaseRates() {
    for (const resId in this.resourceDict) {
      this.resourceDict[resId].baseRate = 0;
    }
  }
  /**
   * Calculates and sets all {@link Resource}s {@link Resource.baseRate baseRate}s to their new currect numbers based on the current {@link Structure}s.
   */
  calculateBaseRates() {
    this.resetBaseRates();
    for (const strucId in this.structureDict) {
      const prodDict = this.structureDict[strucId].dataObject.production;
      for (const prodIdStr in prodDict) {
        const prodId: number = Number(prodIdStr);
        const res = this.resourceDict[prodId];
        if (res) {
          res.baseRate += prodDict[prodId] * this.structureDict[strucId].amount;
        }
      }
    }
  }
  /**
   * Calculates and sets all {@link Resource}s trueRates.
   * @see {@link Resource.updateTrueRate} for more information.
   */
  calculateTrueRates() {
    for (const resId in this.resourceDict) {
      this.resourceDict[resId].updateTrueRate();
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
          // If list or object, recurse through each thing contained to assign all the referenced items into the class they need
          for (const i in obj) {
            if (i != "_class") {
              obj[i] = recurConstruct(obj[i]);
            }
          }
        }
        if (SerializableClasses[obj["_class"]] !== undefined) {
          // We only need to do anything if the object we're looking at has a "_class" key, otherwise it should just be returned
          switch (SerializableClasses[Number(obj["_class"])]) {
            case "Game":
              return new Game(
                obj.lastUpdate,
                obj.dig,
                obj.area,
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
                obj.baseRate,
                obj.multiplier,
                obj.trueRate
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
            default:
              //Shouldn't happen, nothing should be a SerializableClass without being one of the classes listed above, and constructed that way
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
    startingResources,
    startingUpgrades,
    startingStructures,
    startingExpansions,
    {}
  )
);