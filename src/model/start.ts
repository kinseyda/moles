import { resourceDataDict } from "./staticData/resource-data";
import Resource from "./resource";
import Upgrade from "./upgrade";
import { upgradeDataDict } from "./staticData/upgrade-data";
import Structure from "./structure";
import { structureDataDict } from "./staticData/structure-data";
import Expansion from "./expansion";
import { expansionDataDict } from "./staticData/expansion-data";
  

export const startingResources = {
  0: new Resource(
    0,
    resourceDataDict[0].startingParams.amount,
    resourceDataDict[0].startingParams.cap,
    resourceDataDict[0].startingParams.capPriority,
    resourceDataDict[0].startingParams.baseRate,
    resourceDataDict[0].startingParams.multiplier,
    resourceDataDict[0].startingParams.trueRate
  ),
  1: new Resource(
    1,
    resourceDataDict[1].startingParams.amount,
    resourceDataDict[1].startingParams.cap,
    resourceDataDict[1].startingParams.capPriority,
    resourceDataDict[1].startingParams.baseRate,
    resourceDataDict[1].startingParams.multiplier,
    resourceDataDict[1].startingParams.trueRate
  ),
  2: new Resource(
    2,
    resourceDataDict[2].startingParams.amount,
    resourceDataDict[2].startingParams.cap,
    resourceDataDict[2].startingParams.capPriority,
    resourceDataDict[2].startingParams.baseRate,
    resourceDataDict[2].startingParams.multiplier,
    resourceDataDict[2].startingParams.trueRate
  ),
};

export const startingUpgrades = {
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
  3: new Upgrade(
    3,
    upgradeDataDict[3].startingParams.bought,
    upgradeDataDict[3].startingParams.discount
  ),
  4: new Upgrade(
    4,
    upgradeDataDict[4].startingParams.bought,
    upgradeDataDict[4].startingParams.discount
  ),
  5: new Upgrade(
    5,
    upgradeDataDict[5].startingParams.bought,
    upgradeDataDict[5].startingParams.discount
  ),
  6: new Upgrade(
    6,
    upgradeDataDict[6].startingParams.bought,
    upgradeDataDict[6].startingParams.discount
  ),
  7: new Upgrade(
    7,
    upgradeDataDict[7].startingParams.bought,
    upgradeDataDict[7].startingParams.discount
  ),
  8: new Upgrade(
    8,
    upgradeDataDict[8].startingParams.bought,
    upgradeDataDict[8].startingParams.discount
  ),
  9: new Upgrade(
    9,
    upgradeDataDict[9].startingParams.bought,
    upgradeDataDict[9].startingParams.discount
  ),
  10: new Upgrade(
    10,
    upgradeDataDict[10].startingParams.bought,
    upgradeDataDict[10].startingParams.discount
  ),
};

export const startingStructures = {
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

export const startingExpansions = {
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
