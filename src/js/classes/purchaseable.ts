import SerializableClass from "./serializableClass";
import { game } from "./game";

export default abstract class Purchaseable extends SerializableClass {
  constructor() {
    super();
  }
  timeUntil(resId: number) {
    const res = game.resourceById(resId);
    if (res) {
      return Math.max((this.trueCost(resId) - res.amount) / res.trueRate, 0);
    }
  }
  abstract trueCost(resId: number): number;
}
