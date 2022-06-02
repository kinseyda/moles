import Purchaseable from "./purchaseable";
import { upgradeDataDict } from "../content/upgrade-data";
import { game } from "./game";
import { SerializableClasses } from "./serializable-class";
import { UpgradeData } from "../content/data-interfaces";
import { unlockDataDict } from "../content/unlock-data";
import Resource from "./resource";
import { resourceDataDict } from "../content/resource-data";
import { structureDataDict } from "../content/structure-data";
import Structure from "./structure";

/**
 * Stores and updates non-static data relating to a kind of upgrade.
 * Upgrades are single-time purchases that increase performance in some way, such as multiplying resource gains.
 * Upgrades cost resources and no area.
 */
export default class Upgrade extends Purchaseable {
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
      return;
    }
    for (const resIdStr in this.dataObject.cost) {
      const resId: number = Number(resIdStr);
      if (game.resourceDict[resId]) {
        game.resourceDict[resId].incrementAmount(-1 * this.trueCost(resId));
      }
    }

    for (const effect of this.dataObject.effects) {
      switch (effect.func) {
        case "multiplier":
          Upgrade.applyMultiplier(effect.params[0]);
          break;
        case "unlock":
          Upgrade.applyUnlock(effect.params[0]);
          break;
        case "none":
          break;
        default:
          break;
      }
    }
    this.bought = true;
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
  static applyUnlock(unlockId: number) {
    const unlockData = unlockDataDict[unlockId];
    for (const resId of unlockData.resources) {
      const sp = resourceDataDict[resId].startingParams;
      game.resourceDict[resId] = new Resource(
        Number(resId),
        sp.amount,
        sp.cap,
        sp.capPriority,
        sp.multiplier
      );
    }
    for (const upId of unlockData.upgrades) {
      const sp = upgradeDataDict[upId].startingParams;
      game.upgradeDict[upId] = new Upgrade(
        Number(upId),
        sp.bought,
        sp.discount
      );
    }
    for (const stId of unlockData.structures) {
      const sp = structureDataDict[stId].startingParams;
      game.structureDict[stId] = new Structure(
        Number(stId),
        sp.amount,
        sp.discount
      );
    }
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
}
