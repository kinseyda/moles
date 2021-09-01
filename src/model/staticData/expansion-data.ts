import { ExpansionData } from "./data-interfaces";

export const expansionDataDict: { [id: number]: ExpansionData } = {
  0: {
    name: "Wooden strut",
    description: "Prop up the walls of this cave you're in with some twigs.",
    cost: { 1: 100 },
    areaEach: 100,
    startingParams: {
      amount: 0,
      discount: {},
    },
  },
  1: {
    name: "Iron beam",
    description:
      "Construct some support beams to really let you expand this magnificent cave.",
    cost: { 3: 1000 },
    areaEach: 1000,
    startingParams: {
      amount: 0,
      discount: {},
    },
  },
};
