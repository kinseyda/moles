import Purchasable from "./purchasable";
import { ExpansionData } from "./data-interfaces";
import { game } from "./game";
import { SerializableClasses } from "./serializable-class";
import { expansionDataDict } from "../content/expansion-data";

/**
 * Allows for increasing the amount of area the player has access to.
 * To buy an expansion the player must dedicate all their storage to a "low level" resource, like wood.
 * Theres only one type of expansion at the moment but more should unlock upon prestige / "territory expansion"
 */
export default class Expansion extends Purchasable {
  amount: number;
  discount: { [id: number]: number };

  /**
   * @param id - A unique id corresponding to the relevant item in {@link expansionDataDict}.
   * @param amount - The amount of this expansion type that has been successfully bought.
   * @param discount - A dictionary of {@link Resource} ids to a decimal multiplier for their cost.
   */
  constructor(id: number, amount: number, discount: { [id: number]: number }) {
    super(id, SerializableClasses.Expansion);
    this.amount = amount;
    this.discount = discount;
  }
  /**
   * Dictionary of static data for this structure.
   * @see {@link ExpansionData}
   */
  get dataObject(): ExpansionData {
    return expansionDataDict[this.id];
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
      return false;
    }
    for (const resIdStr in this.dataObject.cost) {
      const resId: number = Number(resIdStr);
      const res = game.resourceDict[resId];
      if (res) {
        res.incrementAmount(-1 * this.trueCost(resId));
      }
    }
    game.area.cap += this.dataObject.areaEach;
    this.amount += 1;
    return true;
  }

  get canBuy() {
    for (const resIdStr in this.dataObject.cost) {
      const resId: number = Number(resIdStr);
      const res = game.resourceDict[resId];
      if (res) {
        if (this.trueCost(resId) > res.amount) {
          return false;
        }
      } else {
        // If resource is not yet unlocked
        return false;
      }
    }
    return true;
  }
}
