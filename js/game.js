class Game extends SerializableClass {
  constructor(lastUpdate, resourceList, upgradeList, structureList) {
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
      let prodDict = structureDict[this.structureList[i].id].production;
      for (let prodId in prodDict) {
        this.resourceById(prodId).rate +=
          prodDict[prodId] * this.structureList[i].amount;
      }
    }
  }
}

let game = new Game(
  Date.now(),
  startingResources,
  startingUpgrades,
  startingStructures
);
