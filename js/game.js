let Game = class extends SerializableClass {
  constructor(lastUpdate, resourceList, upgradeList) {
    super();
    this.lastUpdate = lastUpdate;
    this.resourceList = resourceList;
    this.upgradeList = upgradeList;
  }

  resourceById(id) {
    for (let i = 0; i < this.resourceList.length; i++) {
      if (this.resourceList[i].id == id) {
        return this.resourceList[i];
      }
    }
    return;
  }
};

let game = new Game(Date.now(), startingResources, startingUpgrades);
