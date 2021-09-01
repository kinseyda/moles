import { UpgradeData } from "./data-interfaces";

const defaultStartingValues = {
  bought: false,
  discount: {},
};

export const upgradeDataDict: { [id: number]: UpgradeData } = {
  0: {
    name: "Makeshift shovel",
    description: "Fashion some twigs and pebbles lying around into a shovel",
    effect: {
      func: "addMultiplier",
      params: [{ 0: 1 }],
    },
    cost: {
      0: 10,
    },
    startingParams: defaultStartingValues,
  },
  1: {
    name: "Pickaxe",
    description:
      "Construct a pickaxe out of twigs to help you get at those iron veins you've been seeing",
    effect: {
      func: "unlock",
      params: [0],
    },
    cost: {
      0: 10,
      1: 10,
    },
    startingParams: defaultStartingValues,
  },
  2: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  3: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  4: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  5: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  6: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  7: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  8: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  9: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
  10: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      0: 9999,
    },
    startingParams: defaultStartingValues,
  },
};
