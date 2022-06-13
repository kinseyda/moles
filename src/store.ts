import Purchaseable from "./model/purchaseable";
import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import Identifiable from "./model/identifiable";
import { uiDescriptions } from "@/components/ui-descriptions";
import Structure from "./model/structure";
import Civilization from "./model/civilization";

const defaultDescription =
  "Hover over something to see a description of it here.";

interface Settings {
  theme: string;
  tooltips: boolean;
  cbMode: string;
}

export interface State {
  descriptionBoxIsEmpty: boolean;
  descriptionBoxData: string;
  purchaseInformationData: Purchaseable | undefined;
  civilizationInformationData: Civilization | undefined;
  structSellData: Structure | undefined;
  digData: boolean;
  debugMode: boolean;
  popUpOpen: string;
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
    digData: false,
    debugMode: false,
    popUpOpen: "",
    settings: {
      theme: "light",
      tooltips: true,
      cbMode: "green red",
    },
  },
  getters: {},
  mutations: {
    settingsSetTheme(state: State, newTheme: string) {
      state.settings.theme = newTheme;
    },
    settingsSetTooltips(state: State, newTooltips: boolean) {
      state.settings.tooltips = newTooltips;
    },
    settingsSetCBMode(state: State, newCBMode: string) {
      state.settings.cbMode = newCBMode;
    },
    togglePopupOpen(state: State, popUpType: string) {
      if (state.popUpOpen == popUpType) {
        state.popUpOpen = "";
      } else {
        state.popUpOpen = popUpType;
      }
    },
    closePopUp(state: State) {
      state.popUpOpen = "";
    },
    resetDesc(state: State) {
      state.descriptionBoxIsEmpty = true;
      state.purchaseInformationData = undefined;
      state.civilizationInformationData = undefined;
      state.structSellData = undefined;
      state.descriptionBoxData = defaultDescription;
      state.digData = false;
    },
    hoverDescIdentifiable(state: State, describe: Identifiable) {
      state.descriptionBoxIsEmpty = false;
      if (describe instanceof Purchaseable) {
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
      let newStr = args.str;
      const regexp = /(\$\{\d\})/gm;
      const matches = args.str.matchAll(regexp);
      for (const match of matches) {
        const matStr = match[0].toString();
        newStr = newStr.replace(matStr, args.args[Number(matStr[2])]);
      }

      state.descriptionBoxIsEmpty = false;
      state.descriptionBoxData = newStr;
    },
    toggleDebug(state: State) {
      state.debugMode = !state.debugMode;
    },
  },
});
