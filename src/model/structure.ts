import Purchasable from "./purchasable";
import { structureDataDict } from "../content/structure-data";
import { StructureData } from "../content/data-interfaces";
import { game } from "./game";
import { SerializableClasses } from "./serializable-class";

/**
 * Stores and updates non-static data relating to a kind of structure.
 * Structures passively generate resources (when their consumption needs are met), and cost both resources and area.
 */
export default class Structure extends Purchasable {
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
    return this.trueCostAt(resId, this.amount);
  }
  /**
   * Calculates the true cost for the next purchase when you have the current
   * amount of this structure
   * @param resId - {@link Resource} to find the cost for
   * @param amount - Amount of the resource you currently have (or potentially
   *  have)
   */
  trueCostAt(resId: number, amount: number): number {
    let dis = this.discount[resId];
    if (!dis) {
      dis = 1;
    }
    let inc = this.dataObject.increase[resId];
    if (!inc) {
      inc = 1;
    }
    return dis * this.dataObject.cost[resId] * inc ** amount;
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
    game.area.incrementAmount(-1 * this.trueCostArea());
    this.amount += 1;
    return true;
  }
  /**
   * Finds the amount that should be given back upon selling a structure.
   * @param resId - {@link Resource} to find the refund amount for
   */
  sellFor(resId: number): number {
    return this.trueCostAt(resId, this.amount - 1);
  }

  /**
   * Whether or not this structure can currently be sold
   */
  canSell(): boolean {
    return this.amount > 0;
  }

  /**
   * Refunds the amount paid for the structure (assuming current discounts,
   * so can potentially lose money).
   */
  sell() {
    if (!this.canSell()) {
      return;
    }
    game.area.incrementOrCap(this.trueCostArea());
    for (const resIdStr in this.dataObject.cost) {
      const resId: number = Number(resIdStr);
      const res = game.resourceDict[resId];
      if (res) {
        const boughtPrice = this.sellFor(resId);
        res.incrementOrCap(boughtPrice);
      }
    }
    this.amount -= 1;
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
