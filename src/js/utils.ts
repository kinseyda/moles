export function formatTime(numSeconds: number) {
  if (numSeconds === Infinity) {
    return "∞s";
  }
  if (numSeconds === -Infinity) {
    return "0";
  }
  let str = `${Math.floor(numSeconds % 60)}s`;
  if (numSeconds > 60) {
    str = `${Math.floor(numSeconds / 60) % 60}m ` + str;
  }
  if (numSeconds > 60 * 60) {
    str = `${Math.floor(numSeconds / (60 * 60)) % 24}h ` + str;
  }
  if (numSeconds > 60 * 60 * 24) {
    str = `${Math.floor(numSeconds / (60 * 60 * 24))}d ` + str;
  }
  return str;
}

export function formatTimeConcise(numSeconds: number) {
  if (numSeconds === Infinity) {
    return "∞s";
  }
  if (numSeconds === -Infinity) {
    return "00s";
  }
  let str = `${String(Math.floor(numSeconds % 60)).padStart(2, "0")}s`;
  if (numSeconds > 60) {
    str = `${String(Math.floor(numSeconds / 60) % 60).padStart(2, "0")}m `;
  }
  if (numSeconds > 60 * 60) {
    str = `${String(Math.floor(numSeconds / (60 * 60)) % 24).padStart(
      2,
      "0"
    )}h `;
  }
  if (numSeconds > 60 * 60 * 24) {
    str = `${String(Math.floor(numSeconds / (60 * 60 * 24))).padStart(
      2,
      "0"
    )}d `;
  }
  return str;
}

export function formatNumber(num: number, style: string | undefined) {
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

function formatNormal(num: number) {
  if (Number.isInteger(num) || num > 1000) {
    return num.toFixed(0);
  }
  return num.toFixed(1);
}
function formatIllion(num: number) {
  const millions = num / 1000000;
  const billions = num / 1000000000;
  const trillions = num / 1000000000000;
  if (1 <= trillions && trillions < 1000) {
    return trillions.toFixed(3).substring(0, 5) + "T";
  } else if (1 <= billions && billions < 1000) {
    return billions.toFixed(3).substring(0, 5) + "B";
  } else if (1 <= millions && millions < 1000) {
    return millions.toFixed(3).substring(0, 5) + "M";
  }
  return (num / 1000).toFixed(3).substring(0, 5) + "K";
}
function formatExp(num: number) {
  return num.toExponential(2);
}
