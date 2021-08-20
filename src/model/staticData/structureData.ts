import { StructureData } from "./dataInterfaces";

export const structureDataDict: { [id: number]: StructureData } = {
  0: {
    name: "Ball of dirt",
    description:
      "Compress all the dirt you have into a ball and roll that around to pick up more dirt",
    production: { 0: 0.1 },
    cost: { 0: 10 },
    areaCost: 10,
    increase: { 0: 1.1 },
  },
  1: {
    name: "Tunnel bore",
    description:
      "Construct a mole-megastructure capable of digging tunnels for you",
    production: { 0: 10 },
    areaCost: 10,
    cost: { 0: 100 },
    increase: { 0: 1.2 },
  },
};
