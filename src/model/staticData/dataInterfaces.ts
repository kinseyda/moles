export interface IdentifiableData {
  name: string;
  description: string;
}
export interface PurchaseableData extends IdentifiableData {
  cost: { [id: number]: number };
}
export interface UpgradeData extends PurchaseableData {
  effect: { func: string; params: any[] };
}
export interface StructureData extends PurchaseableData {
  production: { [id: number]: number };
  increase: { [id: number]: number };
}
export interface ResourceData extends IdentifiableData {}

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
