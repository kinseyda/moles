import { StructureData } from "../model/data-interfaces";
import { ResourceIDs } from "./resource-data";

const defaultStartingValues = {
  amount: 0,
  discount: {},
};

const defaultSellDesc = "Flatten the structure back into usable materials";

export enum StructureIDs {
  BallOfDirt,
  TunnelBore,
  TermitePen,
  TermiteWoodPatrol,
  IronForge,
}

export const structureDataDict: { [id: number]: StructureData } = {
  [StructureIDs.BallOfDirt]: {
    name: "Ball of dirt",
    description:
      "Compress all the dirt you have into a ball and roll that around to pick up more dirt",
    sellDescription: defaultSellDesc,
    production: { [ResourceIDs.Dirt]: 0.1 },
    consumption: {},
    cost: { [ResourceIDs.Dirt]: 10 },
    areaCost: 10,
    increase: { [ResourceIDs.Dirt]: 1.1 },
    startingParams: defaultStartingValues,
  },
  [StructureIDs.TunnelBore]: {
    name: "Tunnel bore",
    description:
      "Construct a mole-megastructure capable of digging tunnels for you",
    sellDescription: defaultSellDesc,
    production: { [ResourceIDs.Dirt]: 10 },
    consumption: {},
    areaCost: 10,
    cost: { [ResourceIDs.Dirt]: 100 },
    increase: { [ResourceIDs.Dirt]: 1.2 },
    startingParams: defaultStartingValues,
  },
  [StructureIDs.TermitePen]: {
    name: "Termite pen",
    description: "Corral some termites together in a cozy wooden enclosure",
    sellDescription: defaultSellDesc,
    production: { [ResourceIDs.Termites]: 0.1 },
    consumption: { [ResourceIDs.Wood]: 0.1 },
    areaCost: 10,
    cost: { [ResourceIDs.Wood]: 25 },
    increase: { [ResourceIDs.Wood]: 1.2 },
    startingParams: defaultStartingValues,
  },
  [StructureIDs.TermiteWoodPatrol]: {
    name: "Termite wood patrol",
    description:
      "Leash and train some termites to sniff out wood for you to gather",
    sellDescription: defaultSellDesc,
    production: { [ResourceIDs.Wood]: 0.3 },
    consumption: { [ResourceIDs.Termites]: 0.2 },
    areaCost: 5,
    cost: { [ResourceIDs.Termites]: 5 },
    increase: { [ResourceIDs.Termites]: 1.2 },
    startingParams: defaultStartingValues,
  },
  [StructureIDs.IronForge]: {
    name: "Iron forge",
    description:
      "Burn some dirt to extract some remaining iron you might have missed when putting it in the dirt pile",
    sellDescription: defaultSellDesc,
    production: { [ResourceIDs.Iron]: 0.5 },
    consumption: { [ResourceIDs.Dirt]: 1, [ResourceIDs.Wood]: 1 },
    areaCost: 50,
    cost: { [ResourceIDs.Rock]: 50 },
    increase: { [ResourceIDs.Rock]: 1.2 },
    startingParams: defaultStartingValues,
  },
};
