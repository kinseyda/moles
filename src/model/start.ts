import { resourceDataDict } from "../content/resource-data";
import Resource from "./resource";
import Upgrade from "./upgrade";
import { upgradeDataDict } from "../content/upgrade-data";
import Structure from "./structure";
import { structureDataDict } from "../content/structure-data";
import Expansion from "./expansion";
import { expansionDataDict } from "../content/expansion-data";
import Dig from "./dig";
import Area from "./area";

export function startingResources() {
  return {
    0: new Resource(
      0,
      resourceDataDict[0].startingParams.amount,
      resourceDataDict[0].startingParams.cap,
      resourceDataDict[0].startingParams.capPriority,
      resourceDataDict[0].startingParams.multiplier
    ),
    1: new Resource(
      1,
      resourceDataDict[1].startingParams.amount,
      resourceDataDict[1].startingParams.cap,
      resourceDataDict[1].startingParams.capPriority,
      resourceDataDict[1].startingParams.multiplier
    ),
    2: new Resource(
      2,
      resourceDataDict[2].startingParams.amount,
      resourceDataDict[2].startingParams.cap,
      resourceDataDict[2].startingParams.capPriority,
      resourceDataDict[2].startingParams.multiplier
    ),
  };
}

export function startingUpgrades() {
  return {
    0: new Upgrade(
      0,
      upgradeDataDict[0].startingParams.bought,
      upgradeDataDict[0].startingParams.discount
    ),
    1: new Upgrade(
      1,
      upgradeDataDict[1].startingParams.bought,
      upgradeDataDict[1].startingParams.discount
    ),
    2: new Upgrade(
      2,
      upgradeDataDict[2].startingParams.bought,
      upgradeDataDict[2].startingParams.discount
    ),
  };
}

export function startingStructures() {
  return {
    0: new Structure(
      0,
      structureDataDict[0].startingParams.amount,
      structureDataDict[0].startingParams.discount
    ),
    1: new Structure(
      1,
      structureDataDict[1].startingParams.amount,
      structureDataDict[1].startingParams.discount
    ),
  };
}

export function startingExpansions() {
  return {
    0: new Expansion(
      0,
      expansionDataDict[0].startingParams.amount,
      expansionDataDict[0].startingParams.discount
    ),
    1: new Expansion(
      1,
      expansionDataDict[1].startingParams.amount,
      expansionDataDict[1].startingParams.discount
    ),
  };
}

export function startingDig() {
  return new Dig({ 0: 10, 1: 1 });
}

export function startingArea() {
  return new Area(0, 100, 1);
}
