import { StructureData } from "../model/data-interfaces";
import { getID } from "./id-generator";
import { ResourceIDs } from "./resource-data";

const defaultStartingValues = {
  amount: 0,
  discount: {},
};

const defaultSellDesc = "Flatten the structure back into usable materials";

export const StructureIDs = {
  BallOfDirt: getID(),
  TunnelBore: getID(),
  TermitePen: getID(),
  TermiteWoodPatrol: getID(),
  IronForge: getID(),
};
export const structureDataDict: { [id: number]: StructureData } = {
  [StructureIDs.BallOfDirt]: {
    name: "Ball of dirt",
    description:
      "Compress all the dirt you have into a ball and roll that around to pick up more dirt",
    sellDescription: defaultSellDesc,
    production: { [ResourceIDs.dirt]: 0.1 },
    consumption: {},
    cost: { [ResourceIDs.dirt]: 10 },
    areaCost: 10,
    increase: { [ResourceIDs.dirt]: 1.1 },
    startingParams: { ...defaultStartingValues },
  },
  [StructureIDs.TunnelBore]: {
    name: "Tunnel bore",
    description:
      "Construct a mole-megastructure capable of digging tunnels for you",
    sellDescription: defaultSellDesc,
    production: { [ResourceIDs.dirt]: 10 },
    consumption: {},
    areaCost: 10,
    cost: { [ResourceIDs.dirt]: 100 },
    increase: { [ResourceIDs.dirt]: 1.2 },
    startingParams: { ...defaultStartingValues },
  },
  [StructureIDs.TermitePen]: {
    name: "Termite pen",
    description: "Corral some termites together in a cozy wooden enclosure",
    sellDescription: defaultSellDesc,
    production: { [ResourceIDs.termites]: 0.1 },
    consumption: { [ResourceIDs.wood]: 0.1 },
    areaCost: 10,
    cost: { [ResourceIDs.wood]: 25 },
    increase: { [ResourceIDs.wood]: 1.2 },
    startingParams: { ...defaultStartingValues },
  },
  [StructureIDs.TermiteWoodPatrol]: {
    name: "Termite wood patrol",
    description:
      "Leash and train some termites to sniff out wood for you to gather",
    sellDescription: defaultSellDesc,
    production: { [ResourceIDs.wood]: 0.3 },
    consumption: { [ResourceIDs.termites]: 0.2 },
    areaCost: 5,
    cost: { [ResourceIDs.termites]: 5 },
    increase: { [ResourceIDs.termites]: 1.2 },
    startingParams: { ...defaultStartingValues },
  },
  [StructureIDs.IronForge]: {
    name: "Iron forge",
    description:
      "Burn some dirt to extract some remaining iron you might have missed when putting it in the dirt pile",
    sellDescription: defaultSellDesc,
    production: { [ResourceIDs.iron]: 0.5 },
    consumption: { [ResourceIDs.dirt]: 1, [ResourceIDs.wood]: 1 },
    areaCost: 50,
    cost: { [ResourceIDs.rock]: 50 },
    increase: { [ResourceIDs.rock]: 1.2 },
    startingParams: { ...defaultStartingValues },
  },
};
