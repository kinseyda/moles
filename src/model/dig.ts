import { game } from "./game";
import SerializableClass, { SerializableClasses } from "./serializableClass";

/**
 * Handles data and operations pertaining to manual digging.
 * Digging increases the {@link Resource}s in digRates, but always increases {@link Area} when digging is true. By how much is defined by Area
 */
export default class Dig extends SerializableClass {
  digRates: { [index: number]: number };
  digging: Boolean;

  /**
   * @param digRates - Dictionary of {@link Resource} {@link Resource.id id}s to the rates at which they are dug manually.
   */
  constructor(digRates: { [index: number]: number }) {
    super(SerializableClasses.Dig);
    this.digRates = digRates;
    this.digging = false;
  }
  /**
   * Finds the true dig rate for a given {@link Resource}, including the Resource's multiplier.
   * @param resId - The Resource to look for.
   * @returns Either the true dig rate or undefined when manual digging doesnt produce the given resource.
   */
  findTrueDigRate(resId: number): number | undefined {
    if (this.digRates[resId] === undefined) {
      return undefined;
    }
    return this.digRates[resId] * game.resourceDict[resId].multiplier;
  }
}
