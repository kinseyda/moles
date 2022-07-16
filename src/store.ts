import Purchasable from "./model/purchasable";
import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import Identifiable from "./model/identifiable";
import { uiDescriptions } from "@/components/ui-descriptions";
import Structure from "./model/structure";
import Civilization from "./model/civilization";
import { ResourceRate } from "./model/data-interfaces";

const defaultDescription =
  "Hover over something to see a description of it here.";

export interface Settings {
  theme: string;
  tooltips: boolean;
  cbMode: string;
  gameLoopInterval: number;
  digParticleInterval: number;
  resListParticleInterval: number;
  eventLogUpdateInterval: number;
}

export const defaultSettings: Settings = {
  theme: "light",
  tooltips: true,
  cbMode: "green red",
  gameLoopInterval: 30,
  digParticleInterval: 30,
  resListParticleInterval: 30,
  eventLogUpdateInterval: 950,
};

export enum PopupTypes {
  Settings,
  Info,
  Empire,
  Prestige,
  DevUnlockTree,
  DevEditor,
}

export interface State {
  descriptionBoxIsEmpty: boolean;
  descriptionBoxData: string;
  purchaseInformationData: Purchasable | undefined;
  civilizationInformationData: Civilization | undefined;
  structSellData: Structure | undefined;
  resourceRateData: ResourceRate | undefined;
  digData: boolean;
  debugMode: boolean;
  popUpOpen: PopupTypes | undefined;
  settings: Settings;
}
export const key: InjectionKey<Store<State>> = Symbol();
export const store = createStore<State>({
  state: {
    descriptionBoxIsEmpty: true,
    descriptionBoxData: defaultDescription,
    purchaseInformationData: undefined,
    civilizationInformationData: undefined,
    structSellData: undefined,
    resourceRateData: undefined,
    digData: false,
    debugMode: false,
    popUpOpen: undefined,
    settings: defaultSettings,
  },
  getters: {},
  mutations: {
    setSettings(state: State, newSettings: Settings) {
      state.settings = newSettings;
    },
    togglePopupOpen(state: State, popUpType: PopupTypes) {
      if (state.popUpOpen == popUpType) {
        state.popUpOpen = undefined;
      } else {
        state.popUpOpen = popUpType;
      }
    },
    closePopUp(state: State) {
      state.popUpOpen = undefined;
    },
    resetDesc(state: State) {
      state.descriptionBoxIsEmpty = true;
      state.purchaseInformationData = undefined;
      state.resourceRateData = undefined;
      state.civilizationInformationData = undefined;
      state.structSellData = undefined;
      state.descriptionBoxData = defaultDescription;
      state.digData = false;
    },
    hoverDescIdentifiable(state: State, describe: Identifiable) {
      state.descriptionBoxIsEmpty = false;
      if (describe instanceof Purchasable) {
        state.purchaseInformationData = describe;
      }
      state.descriptionBoxData = describe.dataObject.description;
    },
    hoverDescCivilization(state: State, describe: Civilization) {
      state.descriptionBoxData = "";
      state.descriptionBoxIsEmpty = false;
      state.civilizationInformationData = describe;
    },
    hoverDescStructSell(state: State, describe: Structure) {
      state.descriptionBoxIsEmpty = false;
      state.structSellData = describe;
      state.descriptionBoxData = describe.dataObject.sellDescription;
    },
    hoverDescDig(state: State) {
      state.descriptionBoxIsEmpty = false;
      state.digData = true;
      state.descriptionBoxData = uiDescriptions["dig"];
    },
    hoverDescResRate(
      state: State,
      args: { resName: string; rr: ResourceRate }
    ) {
      state.descriptionBoxIsEmpty = false;
      state.resourceRateData = args.rr;
      state.descriptionBoxData = stringReg(uiDescriptions["resourceRate"], [
        args.resName,
      ]);
    },
    hoverDescString(state: State, str: string) {
      state.descriptionBoxIsEmpty = false;
      state.descriptionBoxData = str;
    },
    /**
     * Uses strings of the form "abcd${x}efg" to replace the ${x} with a string
     * from a list, where x is a number from 0-9.
     * This is only to be used for small cases, larger strings should be their
     * own custom component in the description container.
     * @param args - Object with keys str (the base string) and args (list of
     * strings to replace with)
     */
    hoverDescStringReg(state: State, args: { str: string; args: string[] }) {
      state.descriptionBoxIsEmpty = false;
      state.descriptionBoxData = stringReg(args.str, args.args);
    },
    toggleDebug(state: State) {
      state.debugMode = !state.debugMode;
    },
  },
});

function stringReg(str: string, args: string[]) {
  let newStr = str;
  const regexp = /(\$\{\d\})/gm;
  const matches = str.matchAll(regexp);
  for (const match of matches) {
    const matStr = match[0].toString();
    newStr = newStr.replace(matStr, args[Number(matStr[2])]);
  }

  return newStr;
}
