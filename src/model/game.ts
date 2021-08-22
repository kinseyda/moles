import SerializableClass, { SerializableClasses } from "./serializableClass";
import Upgrade from "./upgrades";
import Structure from "./structures";
import Resource from "./resources";
import Dig from "./dig";
import { reactive } from "vue";
import { handleEvent } from "./eventHandling";
import { RequirementType } from "./staticData/dataInterfaces";
import Area from "./area";

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
  eventsDict: { [id: number]: number }; // EventId: Time achieved / last achieved

  /**
   * @param lastUpdate - Time of the most recent tick (in ms since epoch). Use Date.now().
   * @param dig - {@link Dig} that stores the game's current dig stats.
   * @param area - {@link Area} that stores the game's current area and related stats.
   * @param resourceDict - A dictionary of ids to their corresponding {@link Resource}. Does not necessarily contain every resource contained in the static {@link resourceDataDict}
   * @param upgradeDict - A dictionary of ids to their corresponding {@link Upgrade}.
   * @param structureDict - A dictionary of ids to their corresponding {@link Structure}.
   * @param eventsDict - A dictionary of valid ids (that correspond to an event in {@link eventDataDict}) to a the time they were achieved (ms since epoch).
   */
  constructor(
    lastUpdate: number,
    dig: Dig,
    area: Area,
    resourceDict: { [id: number]: Resource },
    upgradeDict: { [id: number]: Upgrade },
    structureDict: { [id: number]: Structure },
    eventsDict: { [id: number]: number }
  ) {
    super(SerializableClasses.Game);
    this.lastUpdate = lastUpdate;
    this.dig = dig;
    this.area = area;
    this.resourceDict = resourceDict;
    this.upgradeDict = upgradeDict;
    this.structureDict = structureDict;
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
    this.area.setAmount(this.area.getNextAmount(diff));
    if (this.area.amount > this.area.cap) {
      this.area.setAmount(this.area.cap);
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

  updateCaps() {
    for (const resId in this.resourceDict) {
      this.resourceDict[resId].setCap(this.area.amount);
    }
  }
}
const startingResources = {
  0: new Resource(0, 0, 0, 1, 0, 1, 0),
  1: new Resource(1, 0, 0, 1, 0, 1, 0),
};

const startingUpgrades = {
  0: new Upgrade(0, false, {}),
  1: new Upgrade(1, false, {}),
  2: new Upgrade(2, false, {}),
  3: new Upgrade(3, false, {}),
  4: new Upgrade(4, false, {}),
  5: new Upgrade(5, false, {}),
  6: new Upgrade(6, false, {}),
  7: new Upgrade(7, false, {}),
  8: new Upgrade(8, false, {}),
  9: new Upgrade(9, false, {}),
  10: new Upgrade(10, false, {}),
};

const startingStructures = {
  0: new Structure(0, 0, {}),
  1: new Structure(1, 0, {}),
};

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
    {}
  )
);
export function setGame(ng: Game) {
  game = reactive(ng);
}
