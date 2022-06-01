import Purchaseable from "./purchaseable";
import { structureDataDict } from "../content/structure-data";
import { StructureData } from "../content/data-interfaces";
import { game } from "./game";
import { SerializableClasses } from "./serializable-class";

/**
 * Stores and updates non-static data relating to a kind of structure.
 * Structures passively generate resources, and cost both resources and area.
 */
export default class Structure extends Purchaseable {
  amount: number;
  discount: { [id: number]: number };

  /**
   * @param id - A unique id corresponding to the relevant item in {@link structureDataDict}.
   * @param amount - The amount of this structure that has been successfully bought.
   * @param discount - A dictionary of {@link Resource} ids to a decimal multiplier for their cost.
   */
  constructor(id: number, amount: number, discount: { [id: number]: number }) {
    super(id, SerializableClasses.Structure);
    this.amount = amount;
    this.discount = discount;
  }
  /**
   * Dictionary of static data for this structure.
   * @see {@link StructureData}
   */
  get dataObject(): StructureData {
    return structureDataDict[this.id];
  }

  /**
   * Finds the amount of area it will cost to build this structure.
   */
  trueCostArea() {
    return this.dataObject.areaCost;
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
        res.incrementAmount(-1 * this.trueCost(resId));
      }
    }
    game.area.incrementAmount(-1 * this.trueCostArea());
    this.amount += 1;
    game.calculateBaseRates();
    game.calculateTrueRates();
  }

  get canBuy() {
    for (const resIdStr in this.dataObject.cost) {
      const resId: number = Number(resIdStr);
      const res = game.resourceDict[resId];
      if (res !== undefined) {
        if (this.trueCost(resId) > res.amount) {
          return false;
        }
      } else {
        // If resource is not yet unlocked
        return false;
      }
    }
    if (this.trueCostArea() > game.area.amount) {
      return false;
    }
    return true;
  }
}
