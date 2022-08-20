import { ExpansionData } from "../model/data-interfaces";
import { getID } from "./id-generator";
import { ResourceIDs } from "./resource-data";

export const ExpansionIDs = {
  WoodenStrut: getID(),
  RockColumn: getID(),
  IronBeam: getID(),
};

export const expansionDataDict: { [id: number]: ExpansionData } = {
  [ExpansionIDs.WoodenStrut]: {
    name: "Wooden strut",
    description: "Prop up the walls of this cave you're in with some twigs.",
    cost: { [ResourceIDs.wood]: 50 },
    increase: { [ResourceIDs.wood]: 1.3 },
    areaEach: 100,
    startingParams: {
      amount: 0,
      discount: {},
    },
  },
  [ExpansionIDs.RockColumn]: {
    name: "Rock column",
    description:
      "Stack some rocks up to the ceiling to keep things from falling down just a bit longer",
    cost: { [ResourceIDs.rock]: 500 },
    increase: { [ResourceIDs.rock]: 1.2 },
    areaEach: 1000,
    startingParams: { amount: 0, discount: {} },
  },
  [ExpansionIDs.IronBeam]: {
    name: "Iron beam",
    description:
      "Construct some support beams to really let you expand this magnificent cave.",
    cost: { [ResourceIDs.iron]: 1000 },
    increase: { [ResourceIDs.iron]: 1.15 },
    areaEach: 2500,
    startingParams: {
      amount: 0,
      discount: {},
    },
  },
};
