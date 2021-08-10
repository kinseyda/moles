import Purchaseable from "./purchaseable";
import { structureDataDict, StructureData } from "../data";
import { game } from "./game";

export default class Structure extends Purchaseable {
  amount: number;
  discount: { [id: number]: number };

  constructor(id: number, amount: number, discount: { [id: number]: number }) {
    super(id);
    this.amount = amount;
    this.discount = discount;
  }

  get dataObject(): StructureData {
    return structureDataDict[this.id];
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
      const res = game.resourceDict[resId];
      if (res) {
        res.amount -= this.trueCost(resId);
      }
    }
    this.amount += 1;
    game.calculateBaseRates();
    game.calculateTrueRates();
  }

  get canBuy() {
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
