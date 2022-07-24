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
