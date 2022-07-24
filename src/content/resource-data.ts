import { ResourceData } from "../model/data-interfaces";
import { getID } from "./id-generator";

const defaultStartingValues = {
  amount: 0,
  cap: 0,
  capPriority: 0,
  baseRate: 0,
  multiplier: 1,
  trueRate: 0,
};

export const ResourceIDs = {
  dirt: getID(),
  wood: getID(),
  rock: getID(),
  iron: getID(),
  gold: getID(),
  termites: getID(),
};

export const resourceDataDict: { [id: number]: ResourceData } = {
  [ResourceIDs.dirt]: {
    name: "Dirt",
    description: "The basic building block of all mole civilization",
    startingParams: {
      amount: 0,
      cap: 0,
      capPriority: 1,
      baseRate: 0,
      multiplier: 1,
      trueRate: 0,
    },
    color: "#915a30",
  },
  [ResourceIDs.wood]: {
    name: "Wood",
    description:
      "Twigs and roots that look like they can be made into all sorts of things",
    startingParams: { ...defaultStartingValues },
    color: "#cfab59",
  },
  [ResourceIDs.rock]: {
    name: "Rock",
    description: "A hard, grey lump of... whatever rocks are made of.",
    startingParams: { ...defaultStartingValues },
    color: "#454545",
  },
  [ResourceIDs.iron]: {
    name: "Iron",
    description: "A particularly shiny kind of rock",
    startingParams: { ...defaultStartingValues },
    color: "#bdbdbd",
  },
  [ResourceIDs.gold]: {
    name: "Gold",
    description: "An even shinier kind of rock",
    startingParams: { ...defaultStartingValues },
    color: "#e8d241",
  },
  [ResourceIDs.termites]: {
    name: "Termites",
    description: "Your friendly, delicious neighbours",
    startingParams: { ...defaultStartingValues },
    color: "#a66f1e",
  },
};
