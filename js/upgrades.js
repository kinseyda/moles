class Upgrade extends SerializableClass {
  constructor(id, bought, cost) {
    super();
    this.id = id;
    this.bought = bought;
    this.cost = cost;
  }
  buy() {
    if (!this.canBuy) {
      return;
    }
    for (const res in this.cost) {
      app.gameData.resourceById(res).amount -= this.cost[res];
    }
    this.bought = true;
  }

  get canBuy() {
    if (this.bought) {
      return false;
    }
    for (const res in this.cost) {
      if (this.cost[res] > app.gameData.resourceById(res).amount) {
        return false;
      }
    }
    return true;
  }
}

let upgradeDict = {
  0: {
    name: "Ball of dirt",
    description: "Compress all the dirt you have into a ball",
  },
  1: {
    name: "Filler",
    description: "Filler desc",
  },
};

let startingUpgrades = [
  new Upgrade(0, false, {
    0: 2,
    1: 10,
  }),
  new Upgrade(1, false, {
    1: 99999,
  }),
];
