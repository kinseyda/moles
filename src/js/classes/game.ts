import SerializableClass from "./serializableClass";
import Upgrade from "./upgrades";
import Structure from "./structures";
import Resource from "./resources";
import Dig from "./dig";

export class Game extends SerializableClass {
  lastUpdate: number;
  dig: Dig;
  resourceList: Resource[];
  upgradeList: Upgrade[];
  structureList: Structure[];

  constructor(
    lastUpdate: number,
    dig: Dig,
    resourceList: Resource[],
    upgradeList: Upgrade[],
    structureList: Structure[]
  ) {
    super();
    this.lastUpdate = lastUpdate;
    this.dig = dig;
    this.resourceList = resourceList;
    this.upgradeList = upgradeList;
    this.structureList = structureList;
  }

  resourceById(id: number): Resource | undefined {
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
      const prodDict = this.structureList[i].dataObject.production;
      for (const prodIdStr in prodDict) {
        const prodId: number = Number(prodIdStr);
        const res = this.resourceById(prodId);
        if (res) {
          res.rate +=
          prodDict[prodId] * this.structureList[i].amount;
        }
      }
    }
  }
}
const startingResources = [
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

const startingUpgrades = [
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

const startingStructures = [new Structure(0, 0, {}), new Structure(1, 0, {})];

export let game: Game = new Game(
  Date.now(),
  new Dig({1: 1}),
  startingResources,
  startingUpgrades,
  startingStructures
);
export function setGame(ng: Game) {
  game = ng;
}
