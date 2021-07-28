import Purchaseable from "./purchaseable";
import data from "../data.json";
import { game } from "./game";

export default class Structure extends Purchaseable {
  constructor(id, amount, discount) {
    super();
    this.id = id;
    this.amount = amount;
    this.discount = discount;
  }

  get dataObject() {
    return data.structureDict[this.id];
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
