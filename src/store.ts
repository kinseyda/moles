import Purchaseable from "./js/classes/purchaseable";
import Vuex, { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import Identifiable from "./js/classes/identifiable";
import Dig from "./js/classes/dig";
import { uiDescriptions } from "./js/uiDescriptions";

const defaultDescription =
  "Hover over something to see a description of it here.";

export interface State {
  descriptionBoxIsEmpty: boolean;
  descriptionBoxData: string;
  purchaseInformationData: Purchaseable | undefined;
  digData: boolean;
  debugMode: boolean;
}
export const key: InjectionKey<Store<State>> = Symbol();
export const store = createStore<State>({
  state: {
    descriptionBoxIsEmpty: true,
    descriptionBoxData: defaultDescription,
    purchaseInformationData: undefined,
    digData: false,
    debugMode: false,
  },
  getters: {},
  mutations: {
    resetDesc(state: State) {
      state.descriptionBoxIsEmpty = true;
      state.purchaseInformationData = undefined;
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
