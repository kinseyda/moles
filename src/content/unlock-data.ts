import { UnlockData } from "./data-interfaces";

export const unlockDataDict: { [id: number]: UnlockData } = {
  0: {
    // Pickaxe
    resources: [3],
    upgrades: [],
    structures: [4],
  },
  1: {
    // Termite knowledge
    resources: [],
    upgrades: [3],
    structures: [],
  },
  2: {
    // Termite Domestication
    resources: [5],
    upgrades: [],
    structures: [2, 3],
  },
};
