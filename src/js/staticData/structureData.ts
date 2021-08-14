import { StructureData } from "./dataInterfaces";

export let structureDataDict: { [id: number]: StructureData } = {};
structureDataDict = {
  0: {
    name: "Ball of dirt",
    description:
      "Compress all the dirt you have into a ball and roll that around to pick up more dirt",
    production: { 1: 0.1 },
    cost: { 1: 10 },
    increase: { 1: 1.1 },
  },
  1: {
    name: "Tunnel bore",
    description:
      "Construct a mole-megastructure capable of digging tunnels for you",
    production: { 1: 10 },
    cost: { 1: 100 },
    increase: { 1: 1.2 },
  },
};
