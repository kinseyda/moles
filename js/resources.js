let Resource = class {
  constructor(object) {
    this.id = object.id;
    this.name = object.name;
    this.amount = object.amount;
    this.cap = object.cap;
    this.rate = object.rate;
  }
};

let startingResources = [
  { id: 0, name: "Area", amount: 10, cap: 10, rate: 0 },
  { id: 1, name: "Dirt", amount: 0, cap: 10000, rate: 1 },
  { id: 2, name: "Iron", amount: 0, cap: 10, rate: 0 },
  { id: 3, name: "Gold", amount: 0, cap: 10, rate: 0 },
];
