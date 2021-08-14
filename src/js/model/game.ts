import SerializableClass from "./serializableClass";
import Upgrade from "./upgrades";
import Structure from "./structures";
import Resource from "./resources";
import Dig from "./dig";
import { reactive } from "vue";
import {
  eventDataDict,
  resAmountEventIdsByResId,
} from "../staticData/eventData";

export class Game extends SerializableClass {
  lastUpdate: number;
  dig: Dig;
  resourceDict: { [id: number]: Resource };
  upgradeDict: { [id: number]: Upgrade };
  structureDict: { [id: number]: Structure };
  eventsDict: { [id: number]: number }; // EventId: Time achieved / last achieved

  constructor(
    lastUpdate: number,
    dig: Dig,
    resourceDict: { [id: number]: Resource },
    upgradeDict: { [id: number]: Upgrade },
    structureDict: { [id: number]: Structure },
    eventsDict: { [id: number]: number }
  ) {
    super("Game");
    this.lastUpdate = lastUpdate;
    this.dig = dig;
    this.resourceDict = resourceDict;
    this.upgradeDict = upgradeDict;
    this.structureDict = structureDict;
    this.eventsDict = eventsDict;
  }
  tick() {
    const updateTime = Date.now();
    const diff = (updateTime - this.lastUpdate) / 1000;
    for (const resId in this.resourceDict) {
      this.resourceDict[resId].incrementAmount(
        this.resourceDict[resId].trueRate * diff
      );
      if (this.resourceDict[resId].amount > this.resourceDict[resId].cap) {
        this.resourceDict[resId].setAmount(this.resourceDict[resId].cap);
      }
    }
    this.lastUpdate = updateTime;
  }
  handleEvent(eventType: string, params: { [x: string]: any }) {
    switch (eventType) {
      case "resourceAmount":
        if (params["resId"]) {
          const evIds = resAmountEventIdsByResId[params["resId"]];
          for (const id in evIds) {
            if (
              this.checkEventResourceAmount(
                eventDataDict[id].eventRequirements["resourceAmount"]
              )
            ) {
              if (
                !this.eventsDict[id] ||
                (this.eventsDict[id] && eventDataDict[id].repeatable)
              ) {
                // Hasnt been achieved, or has been and is repeatable
                this.eventsDict[id] = Date.now();
              }
            }
          }
        }
        break;
      default:
        throw new Error(`Unknown event type '${eventType}'`);
    }
  }
  checkEventResourceAmount(resReqs: { [resId: number]: number }) {
    for (const resId in resReqs) {
      if (this.resourceDict[resId].amount < resReqs[resId]) {
        return false;
      }
    }
    return true;
  }
  resetResourceAmounts() {
    for (const resId in this.resourceDict) {
      this.resourceDict[resId].reset();
    }
  }
  resetBaseRates() {
    for (const resId in this.resourceDict) {
      this.resourceDict[resId].baseRate = 0;
    }
  }
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
  calculateTrueRates() {
    for (const resId in this.resourceDict) {
      this.resourceDict[resId].updateTrueRate();
    }
  }
}
const startingResources = {
  0: new Resource(0, 10, 10, 0, 1, 0),
  1: new Resource(1, 0, 10000, 0, 1, 0),
  2: new Resource(2, 0, 10, 0, 1, 0),
  3: new Resource(3, 0, 0, 0, 1, 0),
  4: new Resource(4, 0, 0, 0, 1, 0),
  5: new Resource(5, 0, 0, 0, 1, 0),
  6: new Resource(6, 0, 0, 0, 1, 0),
  7: new Resource(7, 0, 0, 0, 1, 0),
  8: new Resource(8, 0, 0, 0, 1, 0),
  9: new Resource(9, 0, 0, 0, 1, 0),
  10: new Resource(10, 0, 0, 0, 1, 0),
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

export let game: Game = reactive(
  new Game(
    Date.now(),
    new Dig({ 1: 2, 2: 1 }),
    startingResources,
    startingUpgrades,
    startingStructures,
    {}
  )
);
export function setGame(ng: Game) {
  game = reactive(ng);
}
