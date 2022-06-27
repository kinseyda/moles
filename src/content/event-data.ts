import Upgrade from "@/model/upgrade";
import { EventData, RequirementType } from "./data-interfaces";
import { ResourceIDs } from "./resource-data";
import { UpgradeIDs } from "./upgrade-data";

export enum EventIDs {
  Start,
  StartSecond,
  Dirt5,
  Dirt10Wood10,
  Prestige,
  UpgradeMakshiftShovel,
  UpgradeFindSecondMole,
  UpgradeTunnelToSurface,
  UpgradeTermiteKnowledge,
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
  [EventIDs.UpgradeMakshiftShovel]: {
    name: "UpgradeMakshiftShovel",
    description: "Create a simple digging tool",
    eventText:
      "Now that you can dig through the ground at incredible speed, you feel like you ought to put more thought into these shiny rocks you keep finding.",
    eventRequirements: [
      {
        requirementType: RequirementType.upgrade,
        requirementDetails: [UpgradeIDs.MakeshiftShovel],
      },
    ],
    repeatable: true,
  },
  [EventIDs.UpgradeFindSecondMole]: {
    name: "UpgradeFindSecondMole",
    description: "Start building up a mole colony",
    eventText:
      "With another mole around to help the colony things should start moving much quicker, though you worry management will start to become an issue. You were never much of a moles mole.",
    eventRequirements: [
      {
        requirementType: RequirementType.upgrade,
        requirementDetails: [UpgradeIDs.FindSecondMole],
      },
    ],
    repeatable: true,
  },
  [EventIDs.UpgradeTunnelToSurface]: {
    name: "UpgradeTunnelToSurface",
    description: "Tunnel to above the dirt",
    eventText:
      "Upon finally reaching the surface of all this dirt, you realize one thing: it is awful up here. Full of light, smell, grass, and much less dirt. You vow not to return unless you absolutely must.",
    eventRequirements: [
      {
        requirementType: RequirementType.upgrade,
        requirementDetails: [UpgradeIDs.TunnelToSurface],
      },
    ],
    repeatable: true,
  },
  [EventIDs.UpgradeTermiteKnowledge]: {
    name: "UpgradeTermiteKnowledge",
    description: "Find out how the local termites find so much wood",
    eventText:
      "The termites graciously teach you their ways of finding roots in the ground, but your mind starts to wander. These termites look pretty tasty, and also pretty useful.",
    eventRequirements: [
      {
        requirementType: RequirementType.upgrade,
        requirementDetails: [UpgradeIDs.TermiteKnowledge],
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

const upgradeEventDict: {
  [upId: number]: number[];
} = {};
for (const evId in eventDataDict) {
  for (const req of eventDataDict[evId].eventRequirements) {
    if (req.requirementType === RequirementType.upgrade) {
      const eventUpId = req.requirementDetails[0];
      if (!upgradeEventDict[eventUpId]) {
        upgradeEventDict[eventUpId] = [];
      }
      upgradeEventDict[eventUpId].push(Number(evId));
    }
  }
}
/**
 * A dictionary of {@link Upgrade} ids to event ids that correspond to an event which contains an upgrade requirement involving the given Upgrade.
 */
export const upgradeEventIdsByUpgradeId: {
  [resId: number]: number[];
} = upgradeEventDict;
