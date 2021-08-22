export interface IdentifiableData {
  name: string;
  description: string;
}
export interface PurchaseableData extends IdentifiableData {
  cost: { [id: number]: number };
}
export interface UpgradeData extends PurchaseableData {
  effect: { func: string; params: any[] };
  startingParams: {
    bought: boolean;
    discount: { [resId: number]: number };
  };
}
export interface StructureData extends PurchaseableData {
  areaCost: number;
  production: { [id: number]: number };
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
    capMultiplier: number;
    baseRate: number;
    multiplier: number;
    trueRate: number;
  };
}

export interface UnlockData {
  resources: number[];
  upgrades: number[];
  structures: number[];
}

export enum RequirementType {
  gameStart,
  resourceAmount,
  prevEvent,
  none,
}
export interface EventRequirement {
  requirementType: RequirementType;
  requirementDetails: { [id: number]: number } | number[];
}
export interface EventData extends IdentifiableData {
  eventRequirements: EventRequirement[];
  eventText: string;
  repeatable: boolean;
}
