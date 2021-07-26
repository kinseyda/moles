let defaultDescription =
  "Hover over something to see a description of it here.";

class SerializableClass {
  constructor() {
    this._class = this.constructor.name;
  }
}
class Purchaseable extends SerializableClass {
  constructor() {
    super();
  }
  timeUntil(resId) {
    let res = game.resourceById(resId);
    return Math.max((this.trueCost(resId) - res.amount) / res.trueRate, 0);
  }
  trueCost(resId) {}
  buy() {}
  get canBuy() {}
}

function formatTime(num) {
  if (num === Infinity) {
    return "∞s";
  }
  if (num === -Infinity) {
    return "0s";
  }
  let str = `${Math.floor(num % 60)}s`;
  if (num > 60) {
    str = `${Math.floor(num / 60) % 60}m ` + str;
  }
  if (num > 60 * 60) {
    str = `${Math.floor(num / (60 * 60)) % 24}h ` + str;
  }
  if (num > 60 * 60 * 24) {
    str = `${Math.floor(num / (60 * 60 * 24))}d ` + str;
  }
  return str;
}

function formatNumber(num, style) {
  if (!(style === "normal" || style === "illion" || style === "exp")) {
    if (num < 1000) {
      style = "normal";
    } else if (num < 1000000000000000) {
      // Less than a quadrillion use 1M, 34B notation
      style = "illion";
    } else {
      style = "exp";
    }
  }
  switch (style) {
    case "normal":
      return formatNormal(num);
    case "illion":
      return formatIllion(num);
    case "exp":
      return formatExp(num);
  }
}

function formatNormal(num) {
  if (num === parseInt(num, 10) || num > 1000) {
    return num.toFixed(0);
  }
  return num.toFixed(1);
}
function formatIllion(num) {
  let millions = num / 1000000;
  let billions = num / 1000000000;
  let trillions = num / 1000000000000;
  if (1 <= trillions && trillions < 1000) {
    return trillions.toFixed(3).substring(0, 5) + "T";
  } else if (1 <= billions && billions < 1000) {
    return billions.toFixed(3).substring(0, 5) + "B";
  } else if (1 <= millions && millions < 1000) {
    return millions.toFixed(3).substring(0, 5) + "M";
  }
  return (num / 1000).toFixed(3).substring(0, 5) + "K";
}
function formatExp(num) {
  return num.toExponential(2);
}
