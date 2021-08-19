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
  capMultiplier: number;
  baseRate: number;
  multiplier: number;
  trueRate: number;

  /**
   * @param id - A unique id corresponding to the relevant item in {@link resourceDataDict}.
   * @param amount - The amount of the resource the player has.
   * @param cap - The max amount of the resource that can be stored.
   * @param capMultiplier - A multiplier to this resources cap (could potentially be increased with sliders controlled by the user), 1 by default.
   * @param baseRate - The rate at which the resource is generated at a base level (just derived from {@link Structure}s).
   * @param multiplier - A multiplier for all production of this resource.
   * @param trueRate - The rate at which the resource is generated in total (including multipliers and manual {@link Dig digging}).
   */
  constructor(
    id: number,
    amount: number,
    cap: number,
    capMultiplier: number,
    baseRate: number,
    multiplier: number,
    trueRate: number
  ) {
    super(id, SerializableClasses.Resource);
    this.amount = amount;
    this.cap = cap;
    this.capMultiplier = capMultiplier;
    this.baseRate = baseRate;
    this.multiplier = multiplier;
    this.trueRate = trueRate;
  }
  setCap(areaAmount: number, areaCap: number, resourcesCount: number) {
    if (this.id == 0) {
      return;
    }
    console.log(`Resource: ${this.id}`);
    console.log(areaAmount);
    console.log(this.capMultiplier);
    console.log(areaCap);
    console.log(resourcesCount);
    this.cap = (areaAmount * this.capMultiplier) / resourcesCount;
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
      if (this.id == 0) {
        game.updateCaps();
      }
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
