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
      game.resourceById(res).amount -= this.cost[res];
    }
    switch (upgradeDict[this.id].effect.func) {
      case "addMultiplier":
        addMultiplier(upgradeDict[this.id].effect.params[0]);
    }
    this.bought = true;
  }

  get canBuy() {
    if (this.bought) {
      return false;
    }
    for (const res in this.cost) {
      if (this.cost[res] > game.resourceById(res).amount) {
        return false;
      }
    }
    return true;
  }
}
function addMultiplier(dict) {
  for (let res in dict) {
    game.resourceById(res).multiplier += dict[res];
  }
}

let upgradeDict = {
  0: {
    name: "Ball of dirt",
    description: "Compress all the dirt you have into a ball",
    effect: {
      func: "addMultiplier",
      params: [{ 1: 1 }],
    },
  },
  1: {
    name: "Filler",
    description: "Filler desc",
    effect: {},
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
