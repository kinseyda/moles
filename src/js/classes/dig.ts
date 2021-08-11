import { game } from "./game";
import SerializableClass from "./serializableClass";

export default class Dig extends SerializableClass {
  digRates: { [index: number]: number };
  digging: Boolean;

  constructor(digrates: { [index: number]: number }) {
    super();
    this.digRates = digrates;
    this.digging = false;
  }
  findTrueDigRate(resId: number) {
    if (this.digRates[resId] === undefined) {
      return undefined;
    }
    return this.digRates[resId] * game.resourceDict[resId].multiplier;
  }
}
