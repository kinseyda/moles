import Purchaseable from "./model/purchaseable";
import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import Identifiable from "./model/identifiable";
import { uiDescriptions } from "@/components/ui-descriptions";
import Structure from "./model/structure";

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
  structSellData: Structure | undefined;
  digData: boolean;
  debugMode: boolean;
  settingsOpen: boolean;
  settings: Settings;
}
export const key: InjectionKey<Store<State>> = Symbol();
export const store = createStore<State>({
  state: {
    descriptionBoxIsEmpty: true,
    descriptionBoxData: defaultDescription,
    purchaseInformationData: undefined,
    structSellData: undefined,
    digData: false,
    debugMode: false,
    settingsOpen: false,
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
    toggleSettingsOpen(state: State) {
      state.settingsOpen = !state.settingsOpen;
    },
    resetDesc(state: State) {
      state.descriptionBoxIsEmpty = true;
      state.purchaseInformationData = undefined;
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
    toggleDebug(state: State) {
      state.debugMode = !state.debugMode;
    },
  },
});
