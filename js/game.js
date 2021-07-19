let Game = class {
  constructor(object) {
    this.lastUpdate = object.lastUpdate;
    this.resourceList = [];
    for (let i = 0; i < object.resourceList.length; i++) {
      this.resourceList.push(new Resource(object.resourceList[i]));
    }
    this.upgradeList = [];
    for (let i = 0; i < object.upgradeList.length; i++) {
      this.upgradeList.push(new Upgrade(object.upgradeList[i]));
    }
  }

  resourceByName(name) {
    for (let i = 0; i < this.resourceList.length; i++) {
      if (this.resourceList[i].name === name) {
        return this.resourceList[i];
      }
    }
    return;
  }
};
