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
    increase: { 0: 1.2 },
    startingParams: defaultStartingValues,
  },
};