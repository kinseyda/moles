let Dig = class extends SerializableClass {
  constructor() {
    super();
    this.digRates = { 1: 1 };
    this.digging = false;
  }
  findRate(resId) {
    if (this.digRates[resId] === undefined) {
      return undefined;
    }
    return this.digRates[resId];
  }
};

let startingDig = new Dig();
