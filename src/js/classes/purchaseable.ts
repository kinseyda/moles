import SerializableClass from "./serializableClass";
import { game } from "./game";
import { PurchaseableData } from "../data";
import Identifiable from "./identifiable";

export default abstract class Purchaseable extends Identifiable {
  constructor(id: number) {
    super(id);
  }
  
  abstract trueCost(resId: number): number;
  abstract get canBuy(): boolean;
  abstract buy(): void;
}
