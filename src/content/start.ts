import { resourceDataDict, ResourceIDs } from "./resource-data";
import Resource from "../model/resource";
import Upgrade from "../model/upgrade";
import { upgradeDataDict, UpgradeIDs } from "./upgrade-unlock-data";
import Structure from "../model/structure";
import { structureDataDict, StructureIDs } from "./structure-data";
import Expansion from "../model/expansion";
import { expansionDataDict, ExpansionIDs } from "./expansion-data";
import Dig from "../model/dig";
import Area from "../model/area";

export function startingResources() {
  return {};
}

export function startingUpgrades() {
  return {};
}

export function startingStructures() {
  return {};
}

export function startingExpansions() {
  return {};
}

export function startingDig() {
  return new Dig({});
}

export function startingArea() {
  return new Area(0, 100);
}
