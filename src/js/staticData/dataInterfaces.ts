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
export interface EventData extends IdentifiableData {
  eventRequirements: { [type: string]: { [id: number]: number } }; // Eg `"resource": {1: 10}` will trigger when you get 10 dirt
  eventText: string;
  repeatable: boolean;
}
