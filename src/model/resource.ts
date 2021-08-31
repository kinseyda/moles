import { resourceDataDict } from "@/model/staticData/resource-data";
import { RequirementType, ResourceData } from "./staticData/data-interfaces";
import { game } from "./game";
import Identifiable from "./identifiable";
import { SerializableClasses } from "./serializable-class";

/**
 * Stores and updates non-static data relating to a resource type.
 * Resources are generated passively by {@link Structure}s and actively by {@link Dig}ging and can be affected by {@link Upgrade}
 */
export default class Resource extends Identifiable {
  amount: number;
  cap: number;
  capPriority: number;
  baseRate: number;
  multiplier: number;
  trueRate: number;

  /**
   * @param id - A unique id corresponding to the relevant item in {@link resourceDataDict}.
   * @param amount - The amount of the resource the player has.
   * @param cap - The max amount of the resource that can be stored.
   * @param capPriority - The priority (0 - 10) of storage for this resource.
   * @param baseRate - The rate at which the resource is generated at a base level (just derived from {@link Structure}s).
   * @param multiplier - A multiplier for all production of this resource.
   * @param trueRate - The rate at which the resource is generated in total (including multipliers and manual {@link Dig digging}).
   */
  constructor(
    id: number,
    amount: number,
    cap: number,
    capPriority: number,
    baseRate: number,
    multiplier: number,
    trueRate: number
  ) {
    super(id, SerializableClasses.Resource);
    this.amount = amount;
    this.cap = cap;
    this.capPriority = capPriority;
    this.baseRate = baseRate;
    this.multiplier = multiplier;
    this.trueRate = trueRate;
  }

  /**
   * Changes the priority that storage for this resource has.
   * @param newVal - The new value for the priority (integer 0 - 10 inclusive).
   * @param areaAmount - The amount of area the player currently has.
   */
  setCapPriority(newVal: number, areaAmount: number, totalPriorities: number) {
    this.capPriority = newVal;
    this.setCap(areaAmount, totalPriorities);
  }

  /**
   * Changes the resource's maximum. (Currently does nothing if the resource is area)
   * @param areaAmount - The amount of area the player currently has
   */
  setCap(areaAmount: number, totalPriorities: number) {
    let tp = totalPriorities;
    if (totalPriorities == 0) {
      tp = 1;
    }
    this.cap = areaAmount * (this.capPriority / tp);
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
    this.setAmount(this.amount + incrementBy);
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
