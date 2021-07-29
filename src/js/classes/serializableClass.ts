export default class SerializableClass {
  _class: string
  constructor() {
    this._class = this.constructor.name;
  }
}
