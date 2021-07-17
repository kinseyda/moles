let resource = class {
  constructor(id, name, amount, cap, rate) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.cap = cap;
    this.rate = rate;
  }
};

let startingResources = [
  new resource(0, "Area", 10, 10, 0),
  new resource(1, "Dirt", 0, 10, 0.5),
  new resource(2, "Iron", 0, 0, 0),
  new resource(3, "Gold", 0, 0, 0),
];
