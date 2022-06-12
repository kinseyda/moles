export interface IdentifiableData {
  name: string;
  description: string;
}
export interface PurchaseableData extends IdentifiableData {
  cost: { [id: number]: number };
}
export enum UpgradeEffects {
  multiplier,
  unlock,
  permanentUnlock,
  empireMultiplier,
  none,
}
export interface UpgradeData extends PurchaseableData {
  effects: {
    func: UpgradeEffects;
    params: any[];
  }[];
  startingParams: {
    bought: boolean;
    discount: { [resId: number]: number };
  };
}
export interface StructureData extends PurchaseableData {
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
export interface ExpansionData extends PurchaseableData {
  areaEach: number;
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
}

export interface UnlockData {
  resources: number[];
  upgrades: number[];
  structures: number[];
}

export enum RequirementType {
  gameStart,
  loadGame,
  resourceAmount,
  upgrade,
  prevEvent,
  prestige,
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
