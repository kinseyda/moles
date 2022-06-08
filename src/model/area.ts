import { game } from "./game";
import { logBaseA } from "./math-utils";
import SerializableClass, { SerializableClasses } from "./serializable-class";

/**
 * Handles area amount calculations and parameters.
 * Area is only ever generated via digging.
 * Area can be generated non-linearly (in a logarithmic way by default).
 */
export default class Area extends SerializableClass {
  amount: number;
  cap: number;
  multiplier: number;

  /**
   * @param amount - The amount of area the player has.
   * @param cap - The max amount of area that the player's molehill can take up
   * @param multiplier - A multiplier for all production of this resource.
   */
  constructor(amount: number, cap: number, multiplier: number) {
    super(SerializableClasses.Area);
    this.amount = amount;
    this.cap = cap;
    this.multiplier = multiplier;
  }

  /**
   * Changes the current amount of area and triggers the relevant event[s]
   * @param newAmount - Number to change amount to
   */
  setAmount(newAmount: number) {
    if (this.amount != newAmount) {
      this.amount = newAmount;
      game.updateCaps();
      //   game.handleEvent(RequirementType.areaAmount, );
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
   * Increments the current amount of this resource and triggers the relevant
   * event[s] or sets the amount to the cap
   * @param newAmount - Number to increment amount by
   */
  incrementOrCap(incrementBy: number) {
    if (this.amount + incrementBy > this.cap) {
      this.setAmount(this.cap);
    } else {
      this.incrementAmount(incrementBy);
    }
  }

  /**
   * Calculates what the next amount of space should be according to the current equation.
   * @param diff - The amount of time since the last game tick.
   * @returns - What the new total amount of area should be.
   */
  getNextAmount(diff: number): number {
    // Default: 10 seconds to fill up
    /**
     * Equation:
     * y = a * log_{b+c}(x+c)
     * y = area
     * a = cap
     * b = total seconds to fill up
     * c = offset (so equation passes through origin)
     * x = time dug so far (derived through inverse in our calculations)
     * inverse : x = (b+c)^{y/a}-c
     */
    if (!game.dig.digging) {
      return this.amount;
    }
    const a = this.cap;
    const b = 10;
    const c = 1;
    const curY = this.amount;
    const curX = (b + c) ** (curY / a) - c;
    const nextX = curX + diff;

    return a * logBaseA(nextX + c, b + c);
  }
}
