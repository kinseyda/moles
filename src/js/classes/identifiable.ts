import { IdentifiableData } from "../data";
import SerializableClass from "./serializableClass";

export default abstract class Identifiable extends SerializableClass {
  id: number;
  constructor(id: number) {
      super();
      this.id = id;
  }
  abstract dataObject: IdentifiableData;
}
