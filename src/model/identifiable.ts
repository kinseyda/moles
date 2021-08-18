import { IdentifiableData } from "./staticData/dataInterfaces";
import SerializableClass, { SerializableClasses } from "./serializableClass";

/**
 * Super-type of all classes that have an id (and static information)
 */
export default abstract class Identifiable extends SerializableClass {
  id: number;
  constructor(id: number, typeName: SerializableClasses) {
    super(typeName);
    this.id = id;
  }
  /**
   * Object containing static data for the leaf class
   */
  abstract dataObject: IdentifiableData;
}
