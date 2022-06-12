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
  FindSecondMole,
  Ledger,
  TunnelToSurface,
  Catapult,
}

export enum UnlockIDs {
  Pickaxe,
  TermiteKnowledge,
  TermiteDomestication,
  FindSecondMole,
  Ledger,
  TunnelToSurface,
}

export enum PermanentUnlocks {
  Empire,
  Prestige,
  Population,
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
  [UpgradeIDs.FindSecondMole]: {
    name: "Find a second mole",
    description:
      "You think you can smell another mole digging about in the dirt nearby. You feel a sudden sense of loneliness, and think you ought to try and find them.",
    effects: [
      {
        func: UpgradeEffects.permanentUnlock,
        params: [PermanentUnlocks.Population],
      },
      {
        func: UpgradeEffects.unlock,
        params: [UnlockIDs.FindSecondMole],
      },
    ],
    cost: {
      [ResourceIDs.Dirt]: 250,
    },
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.Ledger]: {
    name: "Ledger",
    description:
      "All these materials are getting hard to keep track of. You think you ought to start writing things down.",
    effects: [
      {
        func: UpgradeEffects.empireMultiplier,
        params: [5 / 100],
      },
      {
        func: UpgradeEffects.unlock,
        params: [UnlockIDs.Ledger],
      },
      {
        func: UpgradeEffects.permanentUnlock,
        params: [PermanentUnlocks.Empire],
      },
    ],
    cost: {
      [ResourceIDs.Dirt]: 150,
      [ResourceIDs.Wood]: 100,
    },
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.TunnelToSurface]: {
    name: "Tunnel to the surface",
    description:
      "You start wondering what could be above the dirt, it seems warm up there.",
    effects: [
      {
        func: UpgradeEffects.unlock,
        params: [UnlockIDs.TunnelToSurface],
      },
      {
        func: UpgradeEffects.multiplier,
        params: [{ [ResourceIDs.Wood]: 1 }],
      },
    ],
    cost: {
      [ResourceIDs.Dirt]: 300,
    },
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.Catapult]: {
    name: "Catapult",
    description:
      "All the warmth and light above the dirt is making you nauseous, you want to get away and start building nice tunnels under somewhere else as soon as possible",
    effects: [
      {
        func: UpgradeEffects.permanentUnlock,
        params: [PermanentUnlocks.Prestige],
      },
    ],
    cost: {
      [ResourceIDs.Wood]: 300,
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
  [UnlockIDs.FindSecondMole]: {
    resources: [],
    upgrades: [UpgradeIDs.Ledger],
    structures: [],
  },
  [UnlockIDs.Ledger]: {
    resources: [],
    upgrades: [UpgradeIDs.TunnelToSurface],
    structures: [],
  },
  [UnlockIDs.TunnelToSurface]: {
    resources: [],
    upgrades: [UpgradeIDs.Catapult],
    structures: [],
  },
};
