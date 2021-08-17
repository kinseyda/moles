export enum SerializableClasses {
  SerializableClass,
  Game,
  Dig,
  Resource,
  Structure,
  Upgrade,
}

export default class SerializableClass {
  _class: SerializableClasses;
  constructor(classType: SerializableClasses) {
    this._class = classType;
  }
}
