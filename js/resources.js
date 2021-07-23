class Resource extends SerializableClass {
  constructor(id, amount, cap, rate, multiplier) {
    super();
    this.id = id;
    this.amount = amount;
    this.cap = cap;
    this.rate = rate;
    this.multiplier = multiplier;
  }
  get dataObject() {
    return resourceDict[this.id];
  }
  get trueRate() {
    return this.rate * this.multiplier;
  }
}

let resourceDict = {
  0: { name: "Area" },
  1: { name: "Dirt" },
  2: { name: "Iron" },
  3: { name: "Gold" },
  4: { name: "Filler" },
  5: { name: "Filler" },
  6: { name: "Filler" },
  7: { name: "Filler" },
  8: { name: "Filler" },
  9: { name: "Filler" },
  10: { name: "Filler" },
};

let startingResources = [
  new Resource(0, 10, 10, 0, 1),
  new Resource(1, 0, 10000, 1, 1),
  new Resource(2, 0, 0, 0, 1),
  new Resource(3, 0, 0, 0, 1),
  new Resource(4, 0, 0, 0, 1),
  new Resource(5, 0, 0, 0, 1),
  new Resource(6, 0, 0, 0, 1),
  new Resource(7, 0, 0, 0, 1),
  new Resource(8, 0, 0, 0, 1),
  new Resource(9, 0, 0, 0, 1),
  new Resource(10, 0, 0, 0, 1),
];
