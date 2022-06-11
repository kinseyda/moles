import { EventData, RequirementType } from "./data-interfaces";
import { ResourceIDs } from "./resource-data";

export enum EventIDs {
  Start,
  StartSecond,
  Dirt5,
  Dirt10Wood10,
  Prestige,
}

/**
 * Stores data for all events, in the form of a dictionary from an id (number) to an {@link EventData} object.
 * Requirements on an event should be ordered from least likely to be met to most
 */
export const eventDataDict: { [id: number]: EventData } = {
  [EventIDs.Start]: {
    name: "Start",
    description: "Appears when first starting the game",
    eventText:
      "You open your mole eyes and look around you. Though you can't see much you can feel dirt under your feet. You feel an urge to start digging into it.",
    eventRequirements: [
      {
        requirementType: RequirementType.gameStart,
        requirementDetails: {},
      },
    ],
    repeatable: false,
  },
  [EventIDs.StartSecond]: {
    name: "StartSecond",
    description:
      "Appears when starting the game after the first time (from loading the save)",
    eventText:
      "You feel a faint sense of deja vu as you look around. You see some resources piled up around you. You feel you should gather even more.",
    eventRequirements: [
      {
        requirementType: RequirementType.loadGame,
        requirementDetails: {},
      },
      {
        requirementType: RequirementType.prevEvent,
        requirementDetails: [EventIDs.Start],
      },
    ],
    repeatable: true,
  },
  [EventIDs.Dirt5]: {
    name: "Dirt5",
    description: "Acquire 5 dirt",
    eventText:
      "You feel proud of amassing such a mighty pile of dirt. You estimate it is about 5 moles high.",
    eventRequirements: [
      {
        requirementType: RequirementType.resourceAmount,
        requirementDetails: { [ResourceIDs.Dirt]: 5 },
      },
    ],
    repeatable: false,
  },
  [EventIDs.Dirt10Wood10]: {
    name: "Dirt10Wood10",
    description: "Acquire 10 dirt and 10 wood",
    eventText: "You got 10 dirt and 10 wood",
    eventRequirements: [
      {
        requirementType: RequirementType.resourceAmount,
        requirementDetails: {
          [ResourceIDs.Dirt]: 10,
          [ResourceIDs.Wood]: 10,
        },
      },
    ],
    repeatable: false,
  },
  [EventIDs.Prestige]: {
    name: "Prestige",
    description: "Appears whenever you prestige",
    eventText:
      "You wake up to find yourself in a strange new location, yet the same old materials lay around you. Better get digging again.",
    eventRequirements: [
      {
        requirementType: RequirementType.prestige,
        requirementDetails: {},
      },
    ],
    repeatable: true,
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

/**
 * A dictionary of strings (from the {@link RequirementType} enum) to event ids (numbers).
 * Useful for finding events that require aspecific kind of trigger (such as finding all resourceAmount related events)
 */
export const eventIdsByRequirementType: {
  [reqType: string]: number[];
} = reqTypeDict;

const resAmountdict: {
  [resId: number]: number[];
} = {};
for (const evId in eventDataDict) {
  for (const req of eventDataDict[evId].eventRequirements) {
    if (req.requirementType === RequirementType.resourceAmount) {
      for (const resId in req.requirementDetails) {
        if (!resAmountdict[resId]) {
          resAmountdict[resId] = [];
        }
        resAmountdict[resId].push(Number(evId));
      }
    }
  }
}
/**
 * A dictionary of {@link Resource} ids to event ids that correspond to an event which contains a resourceAmount requirement involving the given Resource.
 */
export const resAmountEventIdsByResId: {
  [resId: number]: number[];
} = resAmountdict;
