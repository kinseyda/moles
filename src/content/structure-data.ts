import { StructureData } from "./data-interfaces";

const defaultStartingValues = {
  amount: 0,
  discount: {},
};

const defaultSellDesc = "Flatten the structure back into usable materials";

export const structureDataDict: { [id: number]: StructureData } = {
  0: {
    name: "Ball of dirt",
    description:
      "Compress all the dirt you have into a ball and roll that around to pick up more dirt",
    sellDescription: defaultSellDesc,
    production: { 0: 0.1 },
    consumption: {},
    cost: { 0: 10 },
    areaCost: 10,
    increase: { 0: 1.1 },
    startingParams: defaultStartingValues,
  },
  1: {
    name: "Tunnel bore",
    description:
      "Construct a mole-megastructure capable of digging tunnels for you",
    sellDescription: defaultSellDesc,
    production: { 0: 10 },
    consumption: {},
    areaCost: 10,
    cost: { 0: 100 },
    increase: { 0: 1.2 },
    startingParams: defaultStartingValues,
  },
  2: {
    name: "Termite pen",
    description: "Corral some termites together in a cozy wooden enclosure",
    sellDescription: defaultSellDesc,
    production: { 5: 0.1 },
    consumption: { 1: 0.1 },
    areaCost: 10,
    cost: { 1: 25 },
    increase: { 1: 1.2 },
    startingParams: defaultStartingValues,
  },
  3: {
    name: "Termite wood patrol",
    description:
      "Leash and train some termites to sniff out wood for you to gather",
    sellDescription: defaultSellDesc,
    production: { 1: 0.3 },
    consumption: { 5: 0.2 },
    areaCost: 5,
    cost: { 5: 5 },
    increase: { 5: 1.2 },
    startingParams: defaultStartingValues,
  },
  4: {
    name: "Iron forge",
    description:
      "Burn some dirt to extract some remaining iron you might have missed when putting it in the dirt pile",
    sellDescription: defaultSellDesc,
    production: { 3: 0.5 },
    consumption: { 0: 1, 1: 1 },
    areaCost: 50,
    cost: { 2: 50 },
    increase: { 2: 1.2 },
    startingParams: defaultStartingValues,
  },
};
