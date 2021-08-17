import Identifiable from "./identifiable";
import { SerializableClasses } from "./serializableClass";

export default abstract class Purchaseable extends Identifiable {
  constructor(id: number, typeName: SerializableClasses) {
    super(id, typeName);
  }

  abstract trueCost(resId: number): number;
  abstract get canBuy(): boolean;
  abstract buy(): void;
}
