let Upgrade = class {
  constructor(object) {
    this.id = object.id;
    this.name = object.name;
    this.description = object.description;
    this.bought = object.bought;
    this.cost = object.cost;
  }
  buy() {
    if (!this.canBuy) {
      return;
    }
    for (const res in this.cost) {
      app.gameData.resourceByName(res).amount -= this.cost[res];
    }
    this.bought = true;
  }
  get canBuy() {
    if (this.bought) {
      return false;
    }
    for (const res in this.cost) {
      if (this.cost[res] > app.gameData.resourceByName(res).amount) {
        return false;
      }
    }
    return true;
  }
};

let startingUpgrades = [
  {
    id: 0,
    name: "Ball of dirt",
    description: "Compress all the dirt you have into a ball",
    cost: {
      Dirt: 10,
      Area: 2,
    },
    bought: false,
  },
  {
    id: 1,
    name: "Filler",
    description: "Filler desc",
    cost: {
      Dirt: 99999999,
    },
    bought: false,
  },
];
