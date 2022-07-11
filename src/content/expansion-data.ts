import { ExpansionData } from "../model/data-interfaces";
import { ResourceIDs } from "./resource-data";

export enum ExpansionIDs {
  WoodenStrut,
  RockColumn,
  IronBeam,
}

export const expansionDataDict: { [id: number]: ExpansionData } = {
  [ExpansionIDs.WoodenStrut]: {
    name: "Wooden strut",
    description: "Prop up the walls of this cave you're in with some twigs.",
    cost: { [ResourceIDs.Wood]: 50 },
    increase: { [ResourceIDs.Wood]: 1.3 },
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
    cost: { [ResourceIDs.Rock]: 500 },
    increase: { [ResourceIDs.Rock]: 1.2 },
    areaEach: 1000,
    startingParams: { amount: 0, discount: {} },
  },
  [ExpansionIDs.IronBeam]: {
    name: "Iron beam",
    description:
      "Construct some support beams to really let you expand this magnificent cave.",
    cost: { [ResourceIDs.Iron]: 1000 },
    increase: { [ResourceIDs.Iron]: 1.15 },
    areaEach: 2500,
    startingParams: {
      amount: 0,
      discount: {},
    },
  },
};
