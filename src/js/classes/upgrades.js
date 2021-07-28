import Purchaseable from "./purchaseable";
import data from "../data.json";
import { game } from "./game";

export default class Upgrade extends Purchaseable {
  constructor(id, bought, discount) {
    super();
    this.id = id;
    this.bought = bought;
    this.discount = discount;
  }

  get dataObject() {
    return data.upgradeDict[this.id];
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
