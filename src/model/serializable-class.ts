/**
 * Types of leaf class that can be deserialized by the game.
 */
export enum SerializableClasses {
  SerializableClass,
  Game,
  Dig,
  Resource,
  Area,
  Structure,
  Expansion,
  Upgrade,
  Civilization,
}

/**
 * Super-type of all classes that the game can load from a cookie.
 * Stores the class name so that a loaded plain object can be reassociated with its proper class when parsing JSON.
 */
export default class SerializableClass {
  _class: SerializableClasses;
  /**
   * @param classType - The type (from {@link SerializableClasses}) of leaf class being constructed.
   */
  constructor(classType: SerializableClasses) {
    this._class = classType;
  }
}
