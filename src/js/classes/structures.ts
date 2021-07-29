import Purchaseable from "./purchaseable";
import { structureDict, StructureData } from "../data";
import { game } from "./game";

export default class Structure extends Purchaseable {
  id: number;
  amount: number;
  discount: {[id: number]: number};
  constructor(id: number, amount: number, discount: {[id: number]: number}) {
    super();
    this.id = id;
    this.amount = amount;
    this.discount = discount;
  }

  get dataObject(): StructureData {
    return structureDict[this.id];
  }

  trueCost(resId: number): number {
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
    for (const resIdStr in this.dataObject.cost) {
      const resId: number = Number(resIdStr);
      const res = game.resourceById(resId);
      if (res) {
        res.amount -= this.trueCost(resId);
      }
      
    }
    this.amount += 1;
    game.calculateRates();
  }

  get canBuy() {
    for (const resIdStr in this.dataObject.cost) {
      const resId: number = Number(resIdStr);
      const res = game.resourceById(resId);
      if (res) {
        if (this.trueCost(resId) > res.amount) {
          return false;
        }
      }
    }
    return true;
  }
}
