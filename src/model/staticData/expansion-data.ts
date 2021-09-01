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
};
