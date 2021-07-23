let Dig = class extends SerializableClass {
  constructor() {
    super();
    this.digRates = { 1: 1 };
    this.digging = false;
  }
  trueRate(resId) {
    if (this.digRates[resId] === undefined) {
      return undefined;
    }
    return this.digRates[resId] * game.resourceById(resId).multiplier;
  }
};

let startingDig = new Dig();
