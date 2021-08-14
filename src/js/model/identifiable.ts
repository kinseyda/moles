import { IdentifiableData } from "../staticData/dataInterfaces";
import SerializableClass from "./serializableClass";

export default abstract class Identifiable extends SerializableClass {
  id: number;
  constructor(id: number, typeName: string) {
    super(typeName);
    this.id = id;
  }
  abstract dataObject: IdentifiableData;
}
