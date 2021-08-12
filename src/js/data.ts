export interface IdentifiableData {
  name: string;
  description: string;
}

export interface PurchaseableData extends IdentifiableData {
  cost: { [id: number]: number };
}
export interface UpgradeData extends PurchaseableData {
  effect: { func: string; params: any[] };
}
export interface StructureData extends PurchaseableData {
  production: { [id: number]: number };
  increase: { [id: number]: number };
}
export interface ResourceData extends IdentifiableData {}
export let upgradeDataDict: { [id: number]: UpgradeData } = {};
upgradeDataDict = {
  0: {
    name: "Makeshift shovel",
    description: "Fashion some twigs and pebbles lying around into a shovel",
    effect: {
      func: "addMultiplier",
      params: [{ 1: 1 }],
    },
    cost: {
      1: 10,
    },
  },
  1: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      1: 9999,
    },
  },
  2: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      1: 9999,
    },
  },
  3: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      1: 9999,
    },
  },
  4: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      1: 9999,
    },
  },
  5: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      1: 9999,
    },
  },
  6: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      1: 9999,
    },
  },
  7: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      1: 9999,
    },
  },
  8: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      1: 9999,
    },
  },
  9: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      1: 9999,
    },
  },
  10: {
    name: "Filler",
    description: "Filler desc",
    effect: {
      func: "none",
      params: [],
    },
    cost: {
      1: 9999,
    },
  },
};

export let resourceDataDict: { [id: number]: ResourceData } = {};
resourceDataDict = {
  0: { name: "Area", description: "The size of your mole hole / abode" },
  1: {
    name: "Dirt",
    description: "The basic building block of all mole civilization",
  },
  2: { name: "Iron", description: "A particularly shiny kind of rock" },
  3: { name: "Gold", description: "An even shinier kind of rock" },
  4: { name: "Filler", description: "Filler desc" },
  5: { name: "Filler", description: "Filler desc" },
  6: { name: "Filler", description: "Filler desc" },
  7: { name: "Filler", description: "Filler desc" },
  8: { name: "Filler", description: "Filler desc" },
  9: { name: "Filler", description: "Filler desc" },
  10: { name: "Filler", description: "Filler desc" },
};
export let structureDataDict: { [id: number]: StructureData } = {};
structureDataDict = {
  0: {
    name: "Ball of dirt",
    description:
      "Compress all the dirt you have into a ball and roll that around to pick up more dirt",
    production: { 1: 0.1 },
    cost: { 1: 10 },
    increase: { 1: 1.1 },
  },
  1: {
    name: "Tunnel bore",
    description:
      "Construct a mole-megastructure capable of digging tunnels for you",
    production: { 1: 10 },
    cost: { 1: 100 },
    increase: { 1: 1.2 },
  },
};
