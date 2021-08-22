import { ResourceData } from "./dataInterfaces";

const defaultStartingValues = {
  amount: 0,
  cap: 0,
  capMultiplier: 1,
  baseRate: 0,
  multiplier: 1,
  trueRate: 0,
};

export const resourceDataDict: { [id: number]: ResourceData } = {
  0: {
    name: "Dirt",
    description: "The basic building block of all mole civilization",
    startingParams: defaultStartingValues,
  },
  1: {
    name: "Iron",
    description: "A particularly shiny kind of rock",
    startingParams: defaultStartingValues,
  },
  2: {
    name: "Gold",
    description: "An even shinier kind of rock",
    startingParams: defaultStartingValues,
  },
  3: {
    name: "Filler",
    description: "Filler desc",
    startingParams: defaultStartingValues,
  },
  4: {
    name: "Filler",
    description: "Filler desc",
    startingParams: defaultStartingValues,
  },
  5: {
    name: "Filler",
    description: "Filler desc",
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
