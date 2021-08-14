import Identifiable from "./identifiable";

export default abstract class Purchaseable extends Identifiable {
  constructor(id: number, typeName: string) {
    super(id, typeName);
  }

  abstract trueCost(resId: number): number;
  abstract get canBuy(): boolean;
  abstract buy(): void;
}
