import { EventData } from "./dataInterfaces";

export const eventDataDict: { [id: number]: EventData } = {
  0: {
    name: "Start",
    description: "Appears when first starting the game",
    eventText:
      "You open your mole eyes and look around you. Though you can't see much you can feel dirt under your feet. You feel an urge to start digging into it.",
    eventRequirements: { resourceAmount: { 1: 0 } },
    repeatable: false,
  },
  1: {
    name: "Dirt5",
    description: "Acquire 5 dirt",
    eventText:
      "You feel proud of amassing such a mighty pile of dirt. You estimate it is about 5 moles high.",
    eventRequirements: { resourceAmount: { 1: 5 } },
    repeatable: false,
  },
  2: {
    name: "Dirt10Iron10",
    description: "Acquire 10 dirt and 10 iron",
    eventText: "You got 10 dirt and 10 iron",
    eventRequirements: { resourceAmount: { 1: 10, 2: 10 } },
    repeatable: false,
  },
  3: {
    name: "Filler",
    description: "Filler desc",
    eventText: "Filler eventText",
    eventRequirements: {},
    repeatable: false,
  },
};

const dict: {
  [resId: number]: number[];
} = {};
for (const evId in eventDataDict) {
  if (eventDataDict[evId].eventRequirements["resourceAmount"]) {
    for (const resId in eventDataDict[evId].eventRequirements[
      "resourceAmount"
    ]) {
      if (!dict[resId]) {
        dict[resId] = [];
      }
      dict[resId].push(Number(evId));
    }
  }
}

export const resAmountEventIdsByResId: {
  [resId: number]: number[];
} = dict;
