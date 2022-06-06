import { UpgradeData } from "./data-interfaces";

const defaultStartingValues = {
  bought: false,
  discount: {},
};

export const upgradeDataDict: { [id: number]: UpgradeData } = {
  0: {
    name: "Makeshift shovel",
    description: "Fashion some twigs and pebbles lying around into a shovel",
    effects: [
      {
        func: "multiplier",
        params: [{ 0: 1 }],
      },
    ],
    cost: {
      0: 10,
    },
    startingParams: defaultStartingValues,
  },
  1: {
    name: "Pickaxe",
    description:
      "Construct a pickaxe out of twigs to help you get at those iron veins you've been seeing",
    effects: [
      {
        func: "unlock",
        params: [0],
      },
    ],
    cost: {
      0: 10,
      1: 10,
    },
    startingParams: defaultStartingValues,
  },
  2: {
    name: "Termite knowledge",
    description:
      "Ask the friendly local termites how they find so much wood in the ground",
    effects: [
      {
        func: "multiplier",
        params: [{ 1: 1 }],
      },
      {
        func: "unlock",
        params: [1],
      },
    ],
    cost: {
      0: 100,
    },
    startingParams: defaultStartingValues,
  },
  3: {
    name: "Termite Domestication",
    description:
      "Upon studying the termites for a while, you realize how useful it could be to keep them in one place",
    effects: [
      {
        func: "unlock",
        params: [2],
      },
    ],
    cost: {
      0: 120,
    },
    startingParams: defaultStartingValues,
  },
  4: {
    name: "Filler",
    description: "Filler desc",
    effects: [
      {
        func: "none",
        params: [],
      },
    ],
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  5: {
    name: "Filler",
    description: "Filler desc",
    effects: [
      {
        func: "none",
        params: [],
      },
    ],
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  6: {
    name: "Filler",
    description: "Filler desc",
    effects: [
      {
        func: "none",
        params: [],
      },
    ],
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  7: {
    name: "Filler",
    description: "Filler desc",
    effects: [
      {
        func: "none",
        params: [],
      },
    ],
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  8: {
    name: "Filler",
    description: "Filler desc",
    effects: [
      {
        func: "none",
        params: [],
      },
    ],
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  9: {
    name: "Filler",
    description: "Filler desc",
    effects: [
      {
        func: "none",
        params: [],
      },
    ],
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  10: {
    name: "Filler",
    description: "Filler desc",
    effects: [
      {
        func: "none",
        params: [],
      },
    ],
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
};