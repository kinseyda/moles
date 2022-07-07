import { ResourceIDs } from "@/content/resource-data";
import { RequirementType } from "../content/data-interfaces";
import {
  eventDataDict,
  eventIdsByRequirementType,
  resAmountEventIdsByResId,
  upgradeEventIdsByUpgradeId,
} from "../content/event-data";
import { game, Game } from "./game";

/**
 * Checks whether a triggering event has successfully completed all the requirements for any applicable {@link EventData} in {@link eventDataDict}.
 * @param triggerEventType - The type of event calling this function, from {@link RequirementType}. Eg when a resource amount changes this is RequirementType.resourceAmount.
 * @param game - The {@link Game} to handle events for.
 * @param params - Optional parameters used for some event types. Eg resourceAmount uses the "resId" property, prevEvent uses the "evId" property.
 */
export function handleEvent(
  triggerEventType: RequirementType,
  game: Game,
  params?: { [x: string]: any }
) {
  // Goal of this function is to narrow down the amount of events to check
  // where possible(such as for resources)
  const idsAchieved: number[] = [];
  switch (triggerEventType) {
    case RequirementType.gameStart:
      idsAchieved.push(
        ...checkAll(
          triggerEventType,
          game,
          ...eventIdsByRequirementType[triggerEventType]
        )
      );
      break;
    case RequirementType.loadGame:
      idsAchieved.push(
        ...checkAll(
          triggerEventType,
          game,
          ...eventIdsByRequirementType[triggerEventType]
        )
      );
      break;
    case RequirementType.prevEvent:
      if (params !== undefined && params["evId"] !== undefined) {
        idsAchieved.push(
          ...checkAll(
            triggerEventType,
            game,
            ...eventIdsByRequirementType[triggerEventType]
          )
        );
      }
      break;
    case RequirementType.prestige:
      idsAchieved.push(
        ...checkAll(
          triggerEventType,
          game,
          ...eventIdsByRequirementType[triggerEventType]
        )
      );
      break;
    case RequirementType.upgrade:
      if (params !== undefined && params["upId"] !== undefined) {
        const evIds = upgradeEventIdsByUpgradeId[params["upId"]];
        if (evIds !== undefined) {
          idsAchieved.push(...checkAll(triggerEventType, game, ...evIds));
        }
      }
      break;
    case RequirementType.resourceAmount:
      if (params !== undefined && params["resId"] !== undefined) {
        // Get all event ids that may be triggered (in part or full) by a change to this resource
        const evIds = resAmountEventIdsByResId[params["resId"]];
        if (evIds !== undefined) {
          idsAchieved.push(...checkAll(triggerEventType, game, ...evIds));
        }
      }
      break;
    case RequirementType.timed:
      idsAchieved.push(
        ...checkAll(
          triggerEventType,
          game,
          ...eventIdsByRequirementType[triggerEventType]
        )
      );
      break;
    default:
      throw new Error(`Unknown event type '${triggerEventType}'`);
  }
  for (const id of idsAchieved) {
    game.eventsDict[id] = Date.now();
  }
}

function checkAll(
  triggerEventType: RequirementType,
  game: Game,
  ...evIds: number[]
): number[] {
  const idsAchieved: number[] = [];
  for (const id of evIds) {
    if (checkEventId(Number(id), triggerEventType, game)) {
      idsAchieved.push(Number(id));
    }
  }
  return idsAchieved;
}

function checkEventId(
  evId: number,
  triggerEventType: RequirementType,
  game: Game
): boolean {
  if (game.eventsDict[evId] !== undefined && !eventDataDict[evId].repeatable) {
    // Has been achieved and isn't repeatable
    return false;
  }
  for (const eventRequirement of eventDataDict[evId].eventRequirements) {
    switch (eventRequirement.requirementType) {
      case RequirementType.gameStart:
        if (triggerEventType !== RequirementType.gameStart) {
          // So that gameStart requirements only fire if gameStart is the event that triggers them.
          return false;
        }
        break;
      case RequirementType.loadGame:
        if (triggerEventType !== RequirementType.loadGame) {
          return false;
        }
        break;
      case RequirementType.prestige:
        if (triggerEventType !== RequirementType.prestige) {
          return false;
        }
        break;
      case RequirementType.upgrade:
        if (
          !checkEventUpgrade(
            eventRequirement.requirementDetails as number[],
            game
          )
        ) {
          return false;
        }
        break;
      case RequirementType.resourceAmount:
        if (
          !checkEventResourceAmount(
            eventRequirement.requirementDetails as Record<number, number>,
            game
          )
        ) {
          return false;
        }
        break;
      case RequirementType.prevEvent:
        if (
          !checkEventPrevEvent(
            eventRequirement.requirementDetails as Record<number, number>,
            game
          )
        ) {
          return false;
        }
        break;
      case RequirementType.timed:
        if (
          !checkEventTimed(eventRequirement.requirementDetails as number, game)
        ) {
          return false;
        }
        break;
      default:
        throw new Error(`Unknown event type '${eventRequirement}'`);
    }
  }

  return true;
}
function checkEventTimed(requiredEmpireAge: number, game: Game): boolean {
  return Date.now() - game.creationTime >= requiredEmpireAge;
}
function checkEventPrevEvent(
  events: { [eventId: number]: number },
  game: Game
): boolean {
  for (const prevEventId in events) {
    if (game.eventsDict[prevEventId] === undefined) {
      return false;
    }
    if (Date.now() - game.eventsDict[prevEventId] < events[prevEventId]) {
      return false;
    }
  }
  return true;
}
function checkEventUpgrade(upgradeList: number[], game: Game): boolean {
  for (const upgradeId of upgradeList) {
    if (!game.upgradeDict[upgradeId]) {
      return false;
    }
    if (!game.upgradeDict[upgradeId].bought) {
      return false;
    }
  }
  return true;
}
function checkEventResourceAmount(
  resReqs: { [resId: number]: number },
  game: Game
): boolean {
  for (const resId in resReqs) {
    if (game.resourceDict[resId] === undefined) {
      // Resource for requirement not unlocked yet
      return false;
    }
    if (game.resourceDict[resId].amount < resReqs[resId]) {
      return false;
    }
  }
  return true;
}
