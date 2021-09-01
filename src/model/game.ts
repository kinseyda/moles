import SerializableClass, { SerializableClasses } from "./serializable-class";
import Upgrade from "./upgrade";
import Structure from "./structure";
import Resource from "./resource";
import Dig from "./dig";
import { reactive } from "vue";
import { handleEvent } from "./event-handling";
import { RequirementType } from "./staticData/data-interfaces";
import Area from "./area";
import { resourceDataDict } from "./staticData/resource-data";
import { upgradeDataDict } from "./staticData/upgrade-data";
import { structureDataDict } from "./staticData/structure-data";
import Expansion from "./expansion";
import { expansionDataDict } from "./staticData/expansion-data";

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
   * @param eventsDict - A dictionary of valid ids (that correspond to an event in {@link eventDataDict}) to a the time they were achieved (ms since epoch).
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
}
const startingResources = {
  0: new Resource(
    0,
    resourceDataDict[0].startingParams.amount,
    resourceDataDict[0].startingParams.cap,
    resourceDataDict[0].startingParams.capPriority,
    resourceDataDict[0].startingParams.baseRate,
    resourceDataDict[0].startingParams.multiplier,
    resourceDataDict[0].startingParams.trueRate
  ),
  1: new Resource(
    1,
    resourceDataDict[1].startingParams.amount,
    resourceDataDict[1].startingParams.cap,
    resourceDataDict[1].startingParams.capPriority,
    resourceDataDict[1].startingParams.baseRate,
    resourceDataDict[1].startingParams.multiplier,
    resourceDataDict[1].startingParams.trueRate
  ),
  2: new Resource(
    2,
    resourceDataDict[2].startingParams.amount,
    resourceDataDict[2].startingParams.cap,
    resourceDataDict[2].startingParams.capPriority,
    resourceDataDict[2].startingParams.baseRate,
    resourceDataDict[2].startingParams.multiplier,
    resourceDataDict[2].startingParams.trueRate
  ),
};

const startingUpgrades = {
  0: new Upgrade(
    0,
    upgradeDataDict[0].startingParams.bought,
    upgradeDataDict[0].startingParams.discount
  ),
  1: new Upgrade(
    1,
    upgradeDataDict[1].startingParams.bought,
    upgradeDataDict[1].startingParams.discount
  ),
  2: new Upgrade(
    2,
    upgradeDataDict[2].startingParams.bought,
    upgradeDataDict[2].startingParams.discount
  ),
  3: new Upgrade(
    3,
    upgradeDataDict[3].startingParams.bought,
    upgradeDataDict[3].startingParams.discount
  ),
  4: new Upgrade(
    4,
    upgradeDataDict[4].startingParams.bought,
    upgradeDataDict[4].startingParams.discount
  ),
  5: new Upgrade(
    5,
    upgradeDataDict[5].startingParams.bought,
    upgradeDataDict[5].startingParams.discount
  ),
  6: new Upgrade(
    6,
    upgradeDataDict[6].startingParams.bought,
    upgradeDataDict[6].startingParams.discount
  ),
  7: new Upgrade(
    7,
    upgradeDataDict[7].startingParams.bought,
    upgradeDataDict[7].startingParams.discount
  ),
  8: new Upgrade(
    8,
    upgradeDataDict[8].startingParams.bought,
    upgradeDataDict[8].startingParams.discount
  ),
  9: new Upgrade(
    9,
    upgradeDataDict[9].startingParams.bought,
    upgradeDataDict[9].startingParams.discount
  ),
  10: new Upgrade(
    10,
    upgradeDataDict[10].startingParams.bought,
    upgradeDataDict[10].startingParams.discount
  ),
};

const startingStructures = {
  0: new Structure(
    0,
    structureDataDict[0].startingParams.amount,
    structureDataDict[0].startingParams.discount
  ),
  1: new Structure(
    1,
    structureDataDict[1].startingParams.amount,
    structureDataDict[1].startingParams.discount
  ),
};

const startingExpansions = {
  0: new Expansion(
    0,
    expansionDataDict[0].startingParams.amount,
    expansionDataDict[0].startingParams.discount
  ),
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
    startingExpansions,
    {}
  )
);
export function setGame(ng: Game) {
  game = reactive(ng);
}
