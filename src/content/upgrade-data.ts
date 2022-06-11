import { UnlockData, UpgradeData, UpgradeEffects } from "./data-interfaces";
import { ResourceIDs } from "./resource-data";
import { StructureIDs } from "./structure-data";

const defaultStartingValues = {
  bought: false,
  discount: {},
};

export enum UpgradeIDs {
  MakeshiftShovel,
  Pickaxe,
  TermiteKnowledge,
  TermiteDomestication,
}

export enum UnlockIDs {
  Pickaxe,
  TermiteKnowledge,
  TermiteDomestication,
}
export const upgradeDataDict: { [id: number]: UpgradeData } = {
  [UpgradeIDs.MakeshiftShovel]: {
    name: "Makeshift shovel",
    description: "Fashion some twigs and pebbles lying around into a shovel",
    effects: [
      {
        func: UpgradeEffects.multiplier,
        params: [{ [ResourceIDs.Dirt]: 1 }],
      },
    ],
    cost: {
      [ResourceIDs.Dirt]: 10,
    },
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.Pickaxe]: {
    name: "Pickaxe",
    description:
      "Construct a pickaxe out of twigs to help you get at those iron veins you've been seeing",
    effects: [
      {
        func: UpgradeEffects.unlock,
        params: [UnlockIDs.Pickaxe],
      },
    ],
    cost: {
      [ResourceIDs.Wood]: 10,
      [ResourceIDs.Rock]: 10,
    },
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.TermiteKnowledge]: {
    name: "Termite knowledge",
    description:
      "Ask the friendly local termites how they find so much wood in the ground",
    effects: [
      {
        func: UpgradeEffects.multiplier,
        params: [{ [ResourceIDs.Wood]: 1 }],
      },
      {
        func: UpgradeEffects.unlock,
        params: [UnlockIDs.TermiteKnowledge],
      },
    ],
    cost: {
      [ResourceIDs.Dirt]: 100,
    },
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.TermiteDomestication]: {
    name: "Termite Domestication",
    description:
      "Upon studying the termites for a while, you realize how useful it could be to keep them in one place",
    effects: [
      {
        func: UpgradeEffects.unlock,
        params: [UnlockIDs.TermiteDomestication],
      },
    ],
    cost: {
      [ResourceIDs.Dirt]: 120,
    },
    startingParams: defaultStartingValues,
  },
};

export const unlockDataDict: { [id: number]: UnlockData } = {
  [UnlockIDs.Pickaxe]: {
    resources: [ResourceIDs.Iron],
    upgrades: [],
    structures: [StructureIDs.IronForge],
  },
  [UnlockIDs.TermiteKnowledge]: {
    resources: [],
    upgrades: [UpgradeIDs.TermiteDomestication],
    structures: [],
  },
  [UnlockIDs.TermiteDomestication]: {
    resources: [ResourceIDs.Termites],
    upgrades: [],
    structures: [StructureIDs.TermitePen, StructureIDs.TermiteWoodPatrol],
  },
};
