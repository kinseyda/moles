import { resourceDataDict } from "@/content/resource-data";
import { RequirementType, ResourceData } from "../content/data-interfaces";
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
  multiplier: number;
  rateLastTick: number; // Rate in m/s derived from game tick increase

  /**
   * @param id - A unique id corresponding to the relevant item in {@link resourceDataDict}.
   * @param amount - The amount of the resource the player has.
   * @param cap - The max amount of the resource that can be stored.
   * @param capPriority - The priority (0 - 10) of storage for this resource.
   * @param multiplier - A multiplier for all production of this resource.
   */
  constructor(
    id: number,
    amount: number,
    cap: number,
    capPriority: number,
    multiplier: number
  ) {
    super(id, SerializableClasses.Resource);
    this.amount = amount;
    this.cap = cap;
    this.capPriority = capPriority;
    this.multiplier = multiplier;
    this.rateLastTick = 0;
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
   * Changes the current amount of this resource and triggers the relevant
   * event[s] if there is space in storage
   * @param newAmount - Number to change amount to
   */
  setAmount(newAmount: number) {
    if (this.amount != newAmount && newAmount >= 0 && newAmount <= this.cap) {
      this.amount = newAmount;
      game.handleEvent(RequirementType.resourceAmount, {
        resId: this.id,
      });
    }
  }
  /**
   * Increments the current amount of this resource and triggers the relevant
   * event[s] if there is space in storage
   * @param incrementBy - Number to increment amount by
   */
  incrementAmount(incrementBy: number) {
    this.setAmount(this.amount + incrementBy);
  }
  /**
   * Increments the current amount of this resource and triggers the relevant
   * event[s] if there is space in storage, or sets the amount to the cap
   * @param incrementBy - Number to increment amount by
   */
  incrementOrCap(incrementBy: number) {
    if (this.amount + incrementBy > this.cap) {
      this.setAmount(this.cap);
    } else {
      this.incrementAmount(incrementBy);
    }
  }

  /**
   *
   * @param change
   * @param ticksize
   */
  updateRateFromTick(change: number, ticksize: number) {
    this.rateLastTick = change / ticksize;
  }

  /**
   * Sets current resource amount to the cap if it is greater than the cap
   */
  checkCap() {
    if (this.amount > this.cap) {
      this.setAmount(this.cap);
    }
  }
}
