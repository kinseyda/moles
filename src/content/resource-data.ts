import { ResourceData } from "./data-interfaces";

const defaultStartingValues = {
  amount: 0,
  cap: 0,
  capPriority: 0,
  baseRate: 0,
  multiplier: 1,
  trueRate: 0,
};

export const resourceDataDict: { [id: number]: ResourceData } = {
  0: {
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
  1: {
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
  2: {
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
  3: {
    name: "Iron",
    description: "A particularly shiny kind of rock",
    startingParams: defaultStartingValues,
  },
  4: {
    name: "Gold",
    description: "An even shinier kind of rock",
    startingParams: defaultStartingValues,
  },
  5: {
    name: "Termites",
    description: "Your friendly, delicious neighbours",
    startingParams: defaultStartingValues,
  },
  6: {
    name: "Filler",
    description: "Filler desc",
    startingParams: defaultStartingValues,
  },
  7: {
    name: "Filler",
    description: "Filler desc",
    startingParams: defaultStartingValues,
  },
  8: {
    name: "Filler",
    description: "Filler desc",
    startingParams: defaultStartingValues,
  },
  9: {
    name: "Filler",
    description: "Filler desc",
    startingParams: defaultStartingValues,
  },
};
