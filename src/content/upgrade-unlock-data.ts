import {
  UnlockData,
  UpgradeData,
  UpgradeTypes,
} from "../model/data-interfaces";
import { ExpansionIDs } from "./expansion-data";
import { ResourceIDs } from "./resource-data";
import { StructureIDs } from "./structure-data";

const defaultStartingValues = {
  bought: false,
  discount: {},
};

export enum UpgradeIDs {
  LookAround,
  ExamineDirt,
  DirtCompacting,
  SimpleTools,
  Dirtomata,
  SurveyTower,
  MakeshiftShovel,
  Pickaxe,
  TermiteKnowledge,
  TermiteDomestication,
  FindSecondMole,
  Ledger,
  TunnelToSurface,
  Catapult,
  Carpentry,
  Cairnery,
  MetalWorking,
}

export enum UnlockIDs {
  StartingUnlock,
  UnlockExamineDirt,
  ExamineDirt,
  DirtCompacting,
  SimpleTools,
  Dirtomata,
  SurveyTower,
  MakeshiftShovel,
  Pickaxe,
  TermiteKnowledge,
  TermiteDomestication,
  FindSecondMole,
  Ledger,
  TunnelToSurface,
  Carpentry,
  Cairnery,
  MetalWorking,
}

export enum PermanentUnlocks {
  Digging,
  Empire,
  Prestige,
  Population,
}

export const upgradeDataDict: { [id: number]: UpgradeData } = {
  [UpgradeIDs.LookAround]: {
    name: "Look around",
    description: "Examine your sorroundings",
    effects: [
      {
        func: UpgradeTypes.permanentUnlock,
        params: { [UpgradeTypes.permanentUnlock]: PermanentUnlocks.Digging },
      },
    ],
    cost: {},
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.ExamineDirt]: {
    name: "Examine the ground",
    description:
      "Take a closer look at this strange brown substance you see all around",
    effects: [
      {
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.ExamineDirt },
      },
      {
        func: UpgradeTypes.digRate,
        params: { [UpgradeTypes.digRate]: { [ResourceIDs.Dirt]: 2 } },
      },
    ],
    cost: {},
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.DirtCompacting]: {
    name: "Dirt compacting",
    description: "Figure out how to compress dirt into useful shapes",
    effects: [
      {
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.DirtCompacting },
      },
      {
        func: UpgradeTypes.multiplier,
        params: { [UpgradeTypes.multiplier]: { [ResourceIDs.Dirt]: 2 } },
      },
    ],
    cost: { [ResourceIDs.Dirt]: 50 },
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.SimpleTools]: {
    name: "Simple tools",
    description:
      "Discover the benefits of combining materials into simple paw-tools",
    effects: [
      {
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.SimpleTools },
      },
    ],
    cost: { [ResourceIDs.Dirt]: 50 },
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.Dirtomata]: {
    name: "Dirtomata",
    description:
      "Discover the secret to making simple dirt into complex machines capable of work",
    effects: [
      {
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.Dirtomata },
      },
      {
        func: UpgradeTypes.multiplier,
        params: { [UpgradeTypes.multiplier]: { [ResourceIDs.Dirt]: 1.5 } },
      },
    ],
    cost: { [ResourceIDs.Dirt]: 50 },
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.SurveyTower]: {
    name: "Survey tower",
    description:
      "Construct a survey tower (maybe more of a small hill) inside your cave to search outmore useful materials.",
    effects: [
      {
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.SurveyTower },
      },
      {
        func: UpgradeTypes.digRate,
        params: {
          [UpgradeTypes.digRate]: {
            [ResourceIDs.Wood]: 1,
            [ResourceIDs.Rock]: 0.5,
          },
        },
      },
    ],
    cost: {
      [ResourceIDs.Dirt]: 10,
    },
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.MakeshiftShovel]: {
    name: "Makeshift shovel",
    description: "Fashion some twigs and pebbles lying around into a shovel",
    effects: [
      {
        func: UpgradeTypes.multiplier,
        params: { [UpgradeTypes.multiplier]: { [ResourceIDs.Dirt]: 1 } },
      },
      {
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.MakeshiftShovel },
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
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.Pickaxe },
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
        func: UpgradeTypes.multiplier,
        params: { [UpgradeTypes.multiplier]: { [ResourceIDs.Wood]: 1 } },
      },
      {
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.TermiteKnowledge },
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
      "Upon studying the termites for a while, you realize how useful it could be to keep them in one place and harness their wood-finding abilities",
    effects: [
      {
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.TermiteDomestication },
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
        func: UpgradeTypes.permanentUnlock,
        params: { [UpgradeTypes.permanentUnlock]: PermanentUnlocks.Population },
      },
      {
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.FindSecondMole },
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
        func: UpgradeTypes.empireMultiplier,
        params: { [UpgradeTypes.empireMultiplier]: 5 / 100 },
      },
      {
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.Ledger },
      },
      {
        func: UpgradeTypes.permanentUnlock,
        params: { [UpgradeTypes.permanentUnlock]: PermanentUnlocks.Empire },
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
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.TunnelToSurface },
      },
      {
        func: UpgradeTypes.multiplier,
        params: { [UpgradeTypes.multiplier]: { [ResourceIDs.Wood]: 1 } },
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
        func: UpgradeTypes.permanentUnlock,
        params: { [UpgradeTypes.permanentUnlock]: PermanentUnlocks.Prestige },
      },
    ],
    cost: {
      [ResourceIDs.Wood]: 300,
    },
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.Carpentry]: {
    name: "Carpentry",
    description:
      "The brilliant idea to rotate some sticks vertically crosses your mind",
    effects: [
      {
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.Carpentry },
      },
    ],
    cost: { [ResourceIDs.Wood]: 25 },
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.Cairnery]: {
    name: "Cairnery",
    description:
      "While idly stacking rocks on top of each other, you start to wonder if this could actually be useful",
    effects: [
      {
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.Cairnery },
      },
    ],
    cost: { [ResourceIDs.Rock]: 150 },
    startingParams: defaultStartingValues,
  },
  [UpgradeIDs.MetalWorking]: {
    name: "Metal working",
    description:
      "By focusing all your mole strength you realize you can actually bend some iron into more useful shapes",
    effects: [
      {
        func: UpgradeTypes.unlock,
        params: { [UpgradeTypes.unlock]: UnlockIDs.MetalWorking },
      },
    ],
    cost: { [ResourceIDs.Iron]: 500 },
    startingParams: defaultStartingValues,
  },
};

export const unlockDataDict: { [id: number]: UnlockData } = {
  [UnlockIDs.StartingUnlock]: {
    resources: [],
    upgrades: [UpgradeIDs.LookAround],
    structures: [],
    expansions: [],
  },
  [UnlockIDs.UnlockExamineDirt]: {
    resources: [],
    upgrades: [UpgradeIDs.ExamineDirt],
    structures: [],
    expansions: [],
  },
  [UnlockIDs.ExamineDirt]: {
    resources: [ResourceIDs.Dirt],
    upgrades: [UpgradeIDs.SurveyTower, UpgradeIDs.DirtCompacting],
    structures: [],
    expansions: [],
  },
  [UnlockIDs.DirtCompacting]: {
    resources: [],
    upgrades: [UpgradeIDs.SimpleTools],
    structures: [StructureIDs.BallOfDirt],
    expansions: [],
  },
  [UnlockIDs.SimpleTools]: {
    resources: [],
    upgrades: [UpgradeIDs.MakeshiftShovel, UpgradeIDs.Dirtomata],
    structures: [],
    expansions: [],
  },
  [UnlockIDs.Dirtomata]: {
    resources: [],
    upgrades: [],
    structures: [StructureIDs.TunnelBore],
    expansions: [],
  },
  [UnlockIDs.SurveyTower]: {
    resources: [ResourceIDs.Wood, ResourceIDs.Rock],
    upgrades: [
      UpgradeIDs.TermiteKnowledge,
      UpgradeIDs.FindSecondMole,
      UpgradeIDs.Carpentry,
    ],
    structures: [],
    expansions: [],
  },
  [UnlockIDs.MakeshiftShovel]: {
    resources: [],
    upgrades: [UpgradeIDs.Pickaxe],
    structures: [],
    expansions: [],
  },
  [UnlockIDs.Pickaxe]: {
    resources: [ResourceIDs.Iron],
    upgrades: [],
    structures: [StructureIDs.IronForge],
    expansions: [],
  },
  [UnlockIDs.TermiteKnowledge]: {
    resources: [],
    upgrades: [UpgradeIDs.TermiteDomestication],
    structures: [],
    expansions: [],
  },
  [UnlockIDs.TermiteDomestication]: {
    resources: [ResourceIDs.Termites],
    upgrades: [],
    structures: [StructureIDs.TermitePen, StructureIDs.TermiteWoodPatrol],
    expansions: [],
  },
  [UnlockIDs.FindSecondMole]: {
    resources: [],
    upgrades: [UpgradeIDs.Ledger],
    structures: [],
    expansions: [],
  },
  [UnlockIDs.Ledger]: {
    resources: [],
    upgrades: [UpgradeIDs.TunnelToSurface],
    structures: [],
    expansions: [],
  },
  [UnlockIDs.TunnelToSurface]: {
    resources: [],
    upgrades: [UpgradeIDs.Catapult],
    structures: [],
    expansions: [],
  },
  [UnlockIDs.Carpentry]: {
    resources: [],
    upgrades: [UpgradeIDs.Cairnery],
    structures: [],
    expansions: [ExpansionIDs.WoodenStrut],
  },
  [UnlockIDs.Cairnery]: {
    resources: [],
    upgrades: [UpgradeIDs.MetalWorking],
    structures: [],
    expansions: [ExpansionIDs.RockColumn],
  },
  [UnlockIDs.MetalWorking]: {
    resources: [],
    upgrades: [],
    structures: [],
    expansions: [ExpansionIDs.IronBeam],
  },
};
