class Upgrade extends SerializableClass {
  constructor(id, bought, discount) {
    super();
    this.id = id;
    this.bought = bought;
    this.discount = discount;
  }

  get dataObject() {
    return upgradeDict[this.id];
  }

  trueCost(resId) {
    let dis = this.discount[resId];
    if (dis === undefined) {
      dis = 1;
    }
    return dis * this.dataObject.cost[resId];
  }
  buy() {
    if (!this.canBuy) {
      return;
    }
    for (const res in this.dataObject.cost) {
      game.resourceById(res).amount -= this.trueCost(res);
    }
    switch (this.dataObject.effect.func) {
      case "addMultiplier":
        addMultiplier(this.dataObject.effect.params[0]);
    }
    this.bought = true;
  }

  get canBuy() {
    if (this.bought) {
      return false;
    }
    for (const res in this.dataObject.cost) {
      if (this.trueCost(res) > game.resourceById(res).amount) {
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
    name: "Shovel",
    description: "Shovel desc",
    effect: {
      func: "addMultiplier",
      params: [{ 1: 1 }],
    },
    cost: {
      1: 10,
    },
  },
  1: {
    name: "Filler",
    description: "Filler desc",
    effect: {},
    cost: {
      1: 9999,
    },
  },
  2: {
    name: "Filler",
    description: "Filler desc",
    effect: {},
    cost: {
      1: 9999,
    },
  },
  3: {
    name: "Filler",
    description: "Filler desc",
    effect: {},
    cost: {
      1: 9999,
    },
  },
  4: {
    name: "Filler",
    description: "Filler desc",
    effect: {},
    cost: {
      1: 9999,
    },
  },
  5: {
    name: "Filler",
    description: "Filler desc",
    effect: {},
    cost: {
      1: 9999,
    },
  },
  6: {
    name: "Filler",
    description: "Filler desc",
    effect: {},
    cost: {
      1: 9999,
    },
  },
  7: {
    name: "Filler",
    description: "Filler desc",
    effect: {},
    cost: {
      1: 9999,
    },
  },
  8: {
    name: "Filler",
    description: "Filler desc",
    effect: {},
    cost: {
      1: 9999,
    },
  },
  9: {
    name: "Filler",
    description: "Filler desc",
    effect: {},
    cost: {
      1: 9999,
    },
  },
  10: {
    name: "Filler",
    description: "Filler desc",
    effect: {},
    cost: {
      1: 9999,
    },
  },
};

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
