import { ResourceData } from "./data-interfaces";

const defaultStartingValues = {
  amount: 0,
  cap: 0,
  capPriority: 0,
  baseRate: 0,
  multiplier: 1,
  trueRate: 0,
};

export enum ResourceIDs {
  Dirt,
  Wood,
  Rock,
  Iron,
  Gold,
  Termites,
}

export const resourceDataDict: { [id: number]: ResourceData } = {
  [ResourceIDs.Dirt]: {
    name: "Dirt",
    description: "The basic building block of all mole civilization",
    startingParams: {
      amount: 0,
      cap: 0,
      capPriority: 1,
      baseRate: 0,
      multiplier: 1,
      trueRate: 0,
    },
  },
  [ResourceIDs.Wood]: {
    name: "Wood",
    description:
      "Twigs and roots that look like they can be made into all sorts of things",
    startingParams: {
      amount: 0,
      cap: 0,
      capPriority: 1,
      baseRate: 0,
      multiplier: 1,
      trueRate: 0,
    },
  },
  [ResourceIDs.Rock]: {
    name: "Rock",
    description: "A hard, grey lump of... whatever rocks are made of.",
    startingParams: {
      amount: 0,
      cap: 0,
      capPriority: 1,
      baseRate: 0,
      multiplier: 1,
      trueRate: 0,
    },
  },
  [ResourceIDs.Iron]: {
    name: "Iron",
    description: "A particularly shiny kind of rock",
    startingParams: defaultStartingValues,
  },
  [ResourceIDs.Gold]: {
    name: "Gold",
    description: "An even shinier kind of rock",
    startingParams: defaultStartingValues,
  },
  [ResourceIDs.Termites]: {
    name: "Termites",
    description: "Your friendly, delicious neighbours",
    startingParams: defaultStartingValues,
  },
};
