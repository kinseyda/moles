import Purchasable from "./purchasable";
import { game } from "./game";
import { SerializableClasses } from "./serializable-class";
import {
  RequirementType,
  UpgradeData,
  UpgradeEffects,
} from "../content/data-interfaces";
import { upgradeDataDict } from "@/content/upgrade-unlock-data";
import { applyUnlock, applyPermanentUnlock } from "./unlock";

/**
 * Stores and updates non-static data relating to a kind of upgrade.
 * Upgrades are single-time purchases that increase performance in some way, such as multiplying resource gains.
 * Upgrades cost resources and no area.
 */
export default class Upgrade extends Purchasable {
  bought: boolean;
  discount: { [id: number]: number };

  /**
   * @param id - A unique id corresponding to the relevant item in {@link upgradeDataDict}.
   * @param bought - Whether or not this upgrade has been purchased already.
   * @param discount - A dictionary of {@link Resource} ids to a decimal multiplier for their cost.
   */
  constructor(id: number, bought: boolean, discount: { [id: number]: number }) {
    super(id, SerializableClasses.Upgrade);
    this.bought = bought;
    this.discount = discount;
  }
  /**
   * Dictionary of static data for this upgrade.
   * @see {@link UpgradeData}
   */
  get dataObject(): UpgradeData {
    return upgradeDataDict[this.id];
  }

  trueCost(resId: number) {
    let dis = this.discount[resId];
    if (dis === undefined) {
      dis = 1;
    }
    return dis * this.dataObject.cost[resId];
  }

  buy() {
    if (!this.canBuy) {
      return false;
    }
    for (const resIdStr in this.dataObject.cost) {
      const resId: number = Number(resIdStr);
      if (game.resourceDict[resId]) {
        game.resourceDict[resId].incrementAmount(-1 * this.trueCost(resId));
      }
    }

    for (const effect of this.dataObject.effects) {
      switch (effect.func) {
        case UpgradeEffects.multiplier:
          Upgrade.applyMultiplier(effect.params[0]);
          break;
        case UpgradeEffects.unlock:
          applyUnlock(effect.params[0]);
          break;
        case UpgradeEffects.permanentUnlock:
          applyPermanentUnlock(effect.params[0]);
          break;
        case UpgradeEffects.empireMultiplier:
          Upgrade.applyEmpireMultiplier(effect.params[0]);
          break;
        case UpgradeEffects.digRate:
          Upgrade.applyDigRate(effect.params[0]);
          break;
        case UpgradeEffects.none:
          break;
        default:
          break;
      }
    }
    this.bought = true;
    game.handleEvent(RequirementType.upgrade, { upId: this.id });
    return true;
  }

  get canBuy() {
    if (this.bought) {
      return false;
    }
    for (const resIdStr in this.dataObject.cost) {
      const resId: number = Number(resIdStr);
      const res = game.resourceDict[resId];
      if (res !== undefined) {
        if (this.trueCost(resId) > res.amount) {
          return false;
        }
      } else {
        // If resource is not yet unlocked
        return false;
      }
    }
    return true;
  }

  static applyMultiplier(multDict: { [resId: number]: number }) {
    for (const resIdStr in multDict) {
      const resId: number = Number(resIdStr);
      const res = game.resourceDict[resId];
      if (res) {
        res.multiplier += multDict[resId];
      }
    }
  }
  static applyDigRate(digRates: { [resId: number]: number }) {
    for (const resIdStr in digRates) {
      const resId: number = Number(resIdStr);
      if (game.dig.digRates[resId] !== undefined) {
        game.dig.digRates[resId] += digRates[resId];
      } else {
        game.dig.digRates[resId] = digRates[resId];
      }
    }
  }
  static applyEmpireMultiplier(amount: number) {
    game.empireMultiplier += amount;
  }
}
