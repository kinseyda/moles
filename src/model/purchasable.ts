import Identifiable from "./identifiable";
import { SerializableClasses } from "./serializable-class";

/**
 * Super-type for {@link Structure}s and {@link Upgrade}s
 */
export default abstract class Purchasable extends Identifiable {
  constructor(id: number, typeName: SerializableClasses) {
    super(id, typeName);
  }

  /**
   * Calculates the true cost for the purchase (including all discounts or increases).
   * @param resId - The resource to calculate the cost for.
   */
  abstract trueCost(resId: number): number;

  /**
   * Whether or not {@link game} can currently afford this purchase.
   */
  abstract get canBuy(): boolean;
  /**
   * Attempts to buy this purchase, and decements resources where needed if the purchase is successful.
   * Returns true if bought successfully
   */
  abstract buy(): boolean;
}
