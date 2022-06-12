import { ExpansionData } from "./data-interfaces";
import { ResourceIDs } from "./resource-data";

export enum ExpansionIDs {
  WoodenStrut,
  IronBeam,
}

export const expansionDataDict: { [id: number]: ExpansionData } = {
  [ExpansionIDs.WoodenStrut]: {
    name: "Wooden strut",
    description: "Prop up the walls of this cave you're in with some twigs.",
    cost: { [ResourceIDs.Wood]: 50 },
    areaEach: 100,
    startingParams: {
      amount: 0,
      discount: {},
    },
  },
  [ExpansionIDs.IronBeam]: {
    name: "Iron beam",
    description:
      "Construct some support beams to really let you expand this magnificent cave.",
    cost: { [ResourceIDs.Iron]: 1000 },
    areaEach: 1000,
    startingParams: {
      amount: 0,
      discount: {},
    },
  },
};
