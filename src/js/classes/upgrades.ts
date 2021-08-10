import Purchaseable from "./purchaseable";
import { upgradeDataDict } from "../data";
import { game } from "./game";

export default class Upgrade extends Purchaseable {
  bought: boolean;
  discount: { [id: number]: number };
  constructor(id: number, bought: boolean, discount: { [id: number]: number }) {
    super(id);
    this.bought = bought;
    this.discount = discount;
  }

  get dataObject() {
    return upgradeDataDict[this.id];
  }

  trueCost(resId: number) {
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
    for (const resIdStr in this.dataObject.cost) {
      const resId: number = Number(resIdStr);
      if (game.resourceDict[resId]) {
        game.resourceDict[resId].amount -= this.trueCost(resId);
      }
    }
    switch (this.dataObject.effect.func) {
      case "addMultiplier":
        addMultiplier(this.dataObject.effect.params[0]);
        break;
      case "none":
        break;
      default:
        break;
    }
    this.bought = true;
  }

  get canBuy() {
    if (this.bought) {
      return false;
    }
    for (const resIdStr in this.dataObject.cost) {
      const resId: number = Number(resIdStr);
      const res = game.resourceDict[resId];
      if (res) {
        if (this.trueCost(resId) > res.amount) {
          return false;
        }
      }
    }
    return true;
  }
}
function addMultiplier(multDict: { [resId: number]: number }) {
  for (const resIdStr in multDict) {
    const resId: number = Number(resIdStr);
    const res = game.resourceDict[resId];
    if (res) {
      res.multiplier += multDict[resId];
      res.updateTrueRate();
    }
  }
}
