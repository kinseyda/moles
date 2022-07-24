import { expansionDataDict } from "@/content/expansion-data";
import { resourceDataDict } from "@/content/resource-data";
import { structureDataDict } from "@/content/structure-data";
import {
  unlockDataDict,
  PermanentUnlocks,
  defaultUpgradeStartingParams,
} from "@/content/upgrade-unlock-data";
import { upgradeDataDict } from "@/content/upgrade-unlock-data";
import Expansion from "./expansion";
import { game } from "./game";
import Resource from "./resource";
import Structure from "./structure";
import Upgrade from "./upgrade";

export function applyUnlock(unlockId: number) {
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
    game.resourceDict[resId].setCapPriority(
      sp.capPriority,
      game.area.amount,
      game.totalPriorities()
    );
  }
  for (const upId of unlockData.upgrades) {
    const sp =
      upgradeDataDict[upId].startingParams != undefined
        ? upgradeDataDict[upId].startingParams
        : defaultUpgradeStartingParams;
    game.upgradeDict[upId] = new Upgrade(
      Number(upId),
      sp!.bought,
      sp!.discount
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
  for (const exId of unlockData.expansions) {
    const ex = expansionDataDict[exId].startingParams;
    game.expansionDict[exId] = new Expansion(
      Number(exId),
      ex.amount,
      ex.discount
    );
  }
}
export function applyPermanentUnlock(unlockId: number) {
  game.permanentUnlocks[unlockId] = true;

  // For random, one-off things that permanent unlocks might need to do
  switch (unlockId) {
    case PermanentUnlocks.Population:
      game.population += 1;
      break;
    default:
      break;
  }
}
