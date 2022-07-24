export interface IdentifiableData {
  name: string;
  description: string;
}
export interface PurchasableData extends IdentifiableData {
  cost: { [id: number]: number };
}
export enum UpgradeTypes {
  multiplier,
  unlock,
  permanentUnlock,
  empireMultiplier,
  digRate,
  none,
}
export interface UpgradeDetails {
  [UpgradeTypes.multiplier]?: { [resId: number]: number };
  [UpgradeTypes.unlock]?: number;
  [UpgradeTypes.permanentUnlock]?: number;
  [UpgradeTypes.empireMultiplier]?: number;
  [UpgradeTypes.digRate]?: { [resId: number]: number };
  [UpgradeTypes.none]?: undefined;
}
export interface UpgradeEffect {
  func: UpgradeTypes;
  params: UpgradeDetails;
}
export interface UpgradeData extends PurchasableData {
  effects: UpgradeEffect[];
  startingParams?: {
    bought: boolean;
    discount: { [resId: number]: number };
  };
}
export interface StructureData extends PurchasableData {
  areaCost: number;
  production: { [id: number]: number };
  consumption: { [id: number]: number };
  increase: { [id: number]: number };
  startingParams: {
    amount: number;
    discount: { [resId: number]: number };
  };
  sellDescription: string;
}
export interface ExpansionData extends PurchasableData {
  areaEach: number;
  increase: { [id: number]: number };
  startingParams: {
    amount: number;
    discount: { [resId: number]: number };
  };
}
export interface ResourceData extends IdentifiableData {
  startingParams: {
    amount: number;
    cap: number;
    capPriority: number;
    baseRate: number;
    multiplier: number;
    trueRate: number;
  };
  color: string;
}

export interface ResourceRate {
  digRate: number;
  structureProd: number;
  structureCons: number;
  resourceMult: number;
  popMult: number;
  empireRate: number;
  empireMult: number;
}

export interface UnlockData {
  resources: number[];
  upgrades: number[];
  structures: number[];
  expansions: number[];
}

export enum RequirementType {
  gameStart, // details not used
  loadGame, // details not used
  resourceAmount, // details: {[resourceID]: resourceAmount}
  areaAmount, // details: amount (just one number)
  upgrade, // details: upgradeId[]
  prevEvent, // details: {[eventID]: msSinceAchieved}
  prestige, // details not used
  timed, // details: empireAgeInMS (just one number)
}
export interface RequirementDetails {
  [RequirementType.gameStart]?: undefined;
  [RequirementType.loadGame]?: undefined;
  [RequirementType.resourceAmount]?: { [resourceID: number]: number };
  [RequirementType.areaAmount]?: number;
  [RequirementType.upgrade]?: number[];
  [RequirementType.prevEvent]?: { [eventID: number]: number };
  [RequirementType.prestige]?: undefined;
  [RequirementType.timed]?: number;
}
export interface EventRequirement {
  requirementType: RequirementType;
  requirementDetails: RequirementDetails;
}
export interface EventData extends IdentifiableData {
  eventRequirements: EventRequirement[];
  eventText: string;
  repeatable: boolean;
  unlock?: number;
}
