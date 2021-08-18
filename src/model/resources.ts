import { resourceDataDict } from "@/model/staticData/resourceData";
import { RequirementType, ResourceData } from "./staticData/dataInterfaces";
import { game } from "./game";
import Identifiable from "./identifiable";
import { SerializableClasses } from "./serializableClass";

/**
 * Stores and updates non-static data relating to a resource type.
 */
export default class Resource extends Identifiable {
  amount: number;
  cap: number;
  baseRate: number;
  multiplier: number;
  trueRate: number;

  /**
   * @param id - A unique id corresponding to the relevant item in {@link resourceDataDict}.
   * @param amount - The amount of the resource the player has.
   * @param cap - The max amount of the resource that can be stored
   * @param baseRate - The rate at which the resource is generated at a base level (just derived from {@link Structure}s)
   * @param multiplier - A multiplier for all production of this resource.
   * @param trueRate - The rate at which the resource is generated in total (including multipliers and manual {@link Dig digging})
   */
  constructor(
    id: number,
    amount: number,
    cap: number,
    baseRate: number,
    multiplier: number,
    trueRate: number
  ) {
    super(id, SerializableClasses.Resource);
    this.amount = amount;
    this.cap = cap;
    this.baseRate = baseRate;
    this.multiplier = multiplier;
    this.trueRate = trueRate;
  }
  /**
   * Dictionary of static data for this resource.
   * @see {@link ResourceData}
   */
  get dataObject(): ResourceData {
    return resourceDataDict[this.id];
  }
  /**
   * Resets amount to 0;
   */
  reset() {
    this.setAmount(0);
  }
  /**
   * Changes the current amount of this resource and triggers the relevant event[s]
   * @param newAmount - Number to change amount to
   */
  setAmount(newAmount: number) {
    if (this.amount != newAmount) {
      this.amount = newAmount;
      game.handleEvent(RequirementType.resourceAmount, {
        resId: this.id,
      });
    }
  }
  /**
   * Increments the current amount of this resource and triggers the relevant event[s]
   * @param newAmount - Number to increment amount by
   */
  incrementAmount(incrementBy: number) {
    if (incrementBy != 0) {
      this.amount += incrementBy;
      game.handleEvent(RequirementType.resourceAmount, {
        resId: this.id,
      });
    }
  }
  /**
   * Calculates and sets what the current true rate should be (including multipliers and manual digging)
   */
  updateTrueRate() {
    let digTR = 0;
    if (game.dig.digging) {
      digTR = game.dig.findTrueDigRate(this.id) || 0;
    }
    this.trueRate = this.baseRate * this.multiplier + digTR;
  }
}
