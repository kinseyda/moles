import { EventData } from "./dataInterfaces";

// Requirements on an event should be ordered from least likely to be met to most

export const eventDataDict: { [id: number]: EventData } = {
  0: {
    name: "Start",
    description: "Appears when first starting the game",
    eventText:
      "You open your mole eyes and look around you. Though you can't see much you can feel dirt under your feet. You feel an urge to start digging into it.",
    eventRequirements: [
      { requirementType: "gameStart", requirementDetails: {} },
    ],
    repeatable: false,
  },
  1: {
    name: "StartSecond",
    description:
      "Appears when starting the game after the first time (from loading the save)",
    eventText:
      "You feel a faint sense of deja vu as you look around. You see some resources piled up around you. You feel you should gather even more.",
    eventRequirements: [
      { requirementType: "gameStart", requirementDetails: {} },
      { requirementType: "prevEvent", requirementDetails: [0] },
    ],
    repeatable: true,
  },
  2: {
    name: "Dirt5",
    description: "Acquire 5 dirt",
    eventText:
      "You feel proud of amassing such a mighty pile of dirt. You estimate it is about 5 moles high.",
    eventRequirements: [
      {
        requirementType: "resourceAmount",
        requirementDetails: { 1: 5 },
      },
    ],
    repeatable: false,
  },
  3: {
    name: "Dirt10Iron10",
    description: "Acquire 10 dirt and 10 iron",
    eventText: "You got 10 dirt and 10 iron",
    eventRequirements: [
      {
        requirementType: "resourceAmount",
        requirementDetails: { 1: 10, 2: 10 },
      },
    ],
    repeatable: false,
  },
  4: {
    name: "Filler",
    description: "Filler desc",
    eventText: "Filler eventText",
    eventRequirements: [
      {
        requirementType: "none",
        requirementDetails: {},
      },
    ],
    repeatable: false,
  },
};

const reqTypeDict: {
  [reqType: string]: number[];
} = {};
for (const evId in eventDataDict) {
  for (const req of eventDataDict[evId].eventRequirements) {
    if (reqTypeDict[req.requirementType] === undefined) {
      reqTypeDict[req.requirementType] = [];
    }
    reqTypeDict[req.requirementType].push(Number(evId));
  }
}
export const eventIdsByRequirementType: {
  [reqType: string]: number[];
} = reqTypeDict;

const resAmountdict: {
  [resId: number]: number[];
} = {};
for (const evId in eventDataDict) {
  for (const req of eventDataDict[evId].eventRequirements) {
    if (req.requirementType === "resourceAmount") {
      for (const resId in req.requirementDetails) {
        if (!resAmountdict[resId]) {
          resAmountdict[resId] = [];
        }
        resAmountdict[resId].push(Number(evId));
      }
    }
  }
}
export const resAmountEventIdsByResId: {
  [resId: number]: number[];
} = resAmountdict;
