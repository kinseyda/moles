import SerializableClass from "./serializableClass";
import { resourceDict } from "../data";
import { game } from "./game";

export default class Resource extends SerializableClass {
  id: number;
  amount: number;
  cap: number;
  rate: number;
  multiplier: number;

  constructor(id: number, amount: number, cap: number, rate: number, multiplier: number) {
    super();
    this.id = id;
    this.amount = amount;
    this.cap = cap;
    this.rate = rate;
    this.multiplier = multiplier;
  }
  get dataObject() {
    return resourceDict[this.id];
  }
  get trueRate() {
    if (game.dig.digging) {
      const digTR = game.dig.findRate(this.id) || 0;
      return (this.rate + digTR) * this.multiplier;
    }
    return this.rate * this.multiplier;
  }
}
