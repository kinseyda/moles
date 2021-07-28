import SerializableClass from "./serializableClass";
import Upgrade from "./upgrades";
import Structure from "./structures";
import Resource from "./resources";
import Dig from "./dig";

export class Game extends SerializableClass {
  constructor(
    lastUpdate,
    startingDig,
    resourceList,
    upgradeList,
    structureList
  ) {
    super();
    this.lastUpdate = lastUpdate;
    this.dig = startingDig;
    this.resourceList = resourceList;
    this.upgradeList = upgradeList;
    this.structureList = structureList;
  }

  resourceById(id) {
    for (let i = 0; i < this.resourceList.length; i++) {
      if (this.resourceList[i].id == id) {
        return this.resourceList[i];
      }
    }
    return;
  }
  resetRates() {
    for (let i = 0; i < this.resourceList.length; i++) {
      this.resourceList[i].rate = 0;
    }
  }
  calculateRates() {
    this.resetRates();
    for (let i = 0; i < this.structureList.length; i++) {
      let prodDict = this.structureList[i].dataObject.production;
      for (let prodId in prodDict) {
        this.resourceById(prodId).rate +=
          prodDict[prodId] * this.structureList[i].amount;
      }
    }
  }
}
let startingResources = [
  new Resource(0, 10, 10, 0, 1),
  new Resource(1, 0, 10000, 0, 1),
  new Resource(2, 0, 0, 0, 1),
  new Resource(3, 0, 0, 0, 1),
  new Resource(4, 0, 0, 0, 1),
  new Resource(5, 0, 0, 0, 1),
  new Resource(6, 0, 0, 0, 1),
  new Resource(7, 0, 0, 0, 1),
  new Resource(8, 0, 0, 0, 1),
  new Resource(9, 0, 0, 0, 1),
  new Resource(10, 0, 0, 0, 1),
];

let startingUpgrades = [
  new Upgrade(0, false, {}),
  new Upgrade(1, false, {}),
  new Upgrade(2, false, {}),
  new Upgrade(3, false, {}),
  new Upgrade(4, false, {}),
  new Upgrade(5, false, {}),
  new Upgrade(6, false, {}),
  new Upgrade(7, false, {}),
  new Upgrade(8, false, {}),
  new Upgrade(9, false, {}),
  new Upgrade(10, false, {}),
];

let startingStructures = [new Structure(0, 0, {}), new Structure(1, 0, {})];

export var game = new Game(
  Date.now(),
  new Dig(),
  startingResources,
  startingUpgrades,
  startingStructures
);
export function setGame(ng) {
  game = ng;
}
