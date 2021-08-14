import { resourceDataDict } from "@/js/staticData/resourceData";
import { game } from "./game";
import Identifiable from "./identifiable";

export default class Resource extends Identifiable {
  amount: number;
  cap: number;
  baseRate: number;
  multiplier: number;
  trueRate: number;

  constructor(
    id: number,
    amount: number,
    cap: number,
    baseRate: number,
    multiplier: number,
    trueRate: number
  ) {
    super(id, "Resource");
    this.amount = amount;
    this.cap = cap;
    this.baseRate = baseRate;
    this.multiplier = multiplier;
    this.trueRate = trueRate;
  }
  get dataObject() {
    return resourceDataDict[this.id];
  }
  updateTrueRate() {
    let digTR = 0;
    if (game.dig.digging) {
      digTR = game.dig.findTrueDigRate(this.id) || 0;
    }
    this.trueRate = this.baseRate * this.multiplier + digTR;
  }
}
