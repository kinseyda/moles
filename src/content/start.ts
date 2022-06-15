import { resourceDataDict, ResourceIDs } from "./resource-data";
import Resource from "../model/resource";
import Upgrade from "../model/upgrade";
import { upgradeDataDict, UpgradeIDs } from "./upgrade-data";
import Structure from "../model/structure";
import { structureDataDict, StructureIDs } from "./structure-data";
import Expansion from "../model/expansion";
import { expansionDataDict, ExpansionIDs } from "./expansion-data";
import Dig from "../model/dig";
import Area from "../model/area";

export function startingResources() {
  return {
    [ResourceIDs.Dirt]: new Resource(
      ResourceIDs.Dirt,
      resourceDataDict[ResourceIDs.Dirt].startingParams.amount,
      resourceDataDict[ResourceIDs.Dirt].startingParams.cap,
      resourceDataDict[ResourceIDs.Dirt].startingParams.capPriority,
      resourceDataDict[ResourceIDs.Dirt].startingParams.multiplier
    ),
    [ResourceIDs.Wood]: new Resource(
      ResourceIDs.Wood,
      resourceDataDict[ResourceIDs.Wood].startingParams.amount,
      resourceDataDict[ResourceIDs.Wood].startingParams.cap,
      resourceDataDict[ResourceIDs.Wood].startingParams.capPriority,
      resourceDataDict[ResourceIDs.Wood].startingParams.multiplier
    ),
    [ResourceIDs.Rock]: new Resource(
      ResourceIDs.Rock,
      resourceDataDict[ResourceIDs.Rock].startingParams.amount,
      resourceDataDict[ResourceIDs.Rock].startingParams.cap,
      resourceDataDict[ResourceIDs.Rock].startingParams.capPriority,
      resourceDataDict[ResourceIDs.Rock].startingParams.multiplier
    ),
  };
}

export function startingUpgrades() {
  return {
    [UpgradeIDs.MakeshiftShovel]: new Upgrade(
      UpgradeIDs.MakeshiftShovel,
      upgradeDataDict[UpgradeIDs.MakeshiftShovel].startingParams.bought,
      upgradeDataDict[UpgradeIDs.MakeshiftShovel].startingParams.discount
    ),
    [UpgradeIDs.TermiteKnowledge]: new Upgrade(
      UpgradeIDs.TermiteKnowledge,
      upgradeDataDict[UpgradeIDs.TermiteKnowledge].startingParams.bought,
      upgradeDataDict[UpgradeIDs.TermiteKnowledge].startingParams.discount
    ),
    [UpgradeIDs.FindSecondMole]: new Upgrade(
      UpgradeIDs.FindSecondMole,
      upgradeDataDict[UpgradeIDs.FindSecondMole].startingParams.bought,
      upgradeDataDict[UpgradeIDs.FindSecondMole].startingParams.discount
    ),
    [UpgradeIDs.Carpentry]: new Upgrade(
      UpgradeIDs.Carpentry,
      upgradeDataDict[UpgradeIDs.Carpentry].startingParams.bought,
      upgradeDataDict[UpgradeIDs.Carpentry].startingParams.discount
    ),
  };
}

export function startingStructures() {
  return {
    [StructureIDs.BallOfDirt]: new Structure(
      StructureIDs.BallOfDirt,
      structureDataDict[StructureIDs.BallOfDirt].startingParams.amount,
      structureDataDict[StructureIDs.BallOfDirt].startingParams.discount
    ),
    [StructureIDs.TunnelBore]: new Structure(
      StructureIDs.TunnelBore,
      structureDataDict[StructureIDs.TunnelBore].startingParams.amount,
      structureDataDict[StructureIDs.TunnelBore].startingParams.discount
    ),
  };
}

export function startingExpansions() {
  return {};
}

export function startingDig() {
  return new Dig({
    [ResourceIDs.Dirt]: 10,
    [ResourceIDs.Wood]: 1,
    [ResourceIDs.Rock]: 0.5,
  });
}

export function startingArea() {
  return new Area(0, 100);
}
