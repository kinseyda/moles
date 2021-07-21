class Resource extends SerializableClass {
  constructor(id, amount, cap, rate, multiplier) {
    super();
    this.id = id;
    this.amount = amount;
    this.cap = cap;
    this.rate = rate;
    this.multiplier = multiplier;
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
};

let startingResources = [
  new Resource(0, 10, 10, 0, 1),
  new Resource(1, 0, 10000, 1, 1),
  new Resource(2, 0, 0, 0, 1),
  new Resource(3, 0, 0, 0, 1),
];
