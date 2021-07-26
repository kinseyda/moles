class Structure extends Purchaseable {
  constructor(id, amount, discount) {
    super();
    this.id = id;
    this.amount = amount;
    this.discount = discount;
  }

  get dataObject() {
    return structureDict[this.id];
  }

  trueCost(resId) {
    let dis = this.discount[resId];
    if (!dis) {
      dis = 1;
    }
    let inc = this.dataObject.increase[resId];
    if (!inc) {
      inc = 1;
    }
    return dis * this.dataObject.cost[resId] * inc ** this.amount;
  }

  buy() {
    if (!this.canBuy) {
      return;
    }
    for (const res in this.dataObject.cost) {
      game.resourceById(res).amount -= this.trueCost(res);
    }
    this.amount += 1;
    game.calculateRates();
  }

  get canBuy() {
    for (const res in this.dataObject.cost) {
      if (this.trueCost(res) > game.resourceById(res).amount) {
        return false;
      }
    }
    return true;
  }
}

let structureDict = {
  0: {
    name: "Ball of dirt",
    description: "Compress all the dirt you have into a ball",
    production: { 1: 0.1 },
    cost: { 1: 10 },
    increase: { 1: 1.1 },
  },
  1: {
    name: "Tunnel bore",
    description: "idk",
    production: { 1: 10 },
    cost: { 1: 100 },
    increase: { 1: 1.2 },
  },
};

let startingStructures = [new Structure(0, 0, {}), new Structure(1, 0, {})];
