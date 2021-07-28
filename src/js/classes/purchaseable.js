import SerializableClass from "./serializableClass";
import { game } from "./game";

export default class Purchaseable extends SerializableClass {
  constructor() {
    super();
  }
  timeUntil(resId) {
    let res = game.resourceById(resId);
    return Math.max((this.trueCost(resId) - res.amount) / res.trueRate, 0);
  }
}
