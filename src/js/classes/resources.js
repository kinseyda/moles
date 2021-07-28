import SerializableClass from "./serializableClass";
import data from "../data.json";
import { game } from "./game";

export default class Resource extends SerializableClass {
  constructor(id, amount, cap, rate, multiplier) {
    super();
    this.id = id;
    this.amount = amount;
    this.cap = cap;
    this.rate = rate;
    this.multiplier = multiplier;
  }
  get dataObject() {
    return data.resourceDict[this.id];
  }
  get trueRate() {
    if (game.dig.digging) {
      let digTR = game.dig.findRate(this.id) || 0;
      return (this.rate + digTR) * this.multiplier;
    }
    return this.rate * this.multiplier;
  }
}
