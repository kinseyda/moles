import { IdentifiableData } from "../staticData/dataInterfaces";
import SerializableClass, { SerializableClasses } from "./serializableClass";

export default abstract class Identifiable extends SerializableClass {
  id: number;
  constructor(id: number, typeName: SerializableClasses) {
    super(typeName);
    this.id = id;
  }
  abstract dataObject: IdentifiableData;
}
