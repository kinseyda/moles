import Purchaseable from "./js/classes/purchaseable";
import Vuex, { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import Identifiable from "./js/classes/identifiable";
import Dig from "./js/classes/dig";
import { uiDescriptions } from "./js/uiDescriptions";

const defaultDescription =
  "Hover over something to see a description of it here.";

export interface State {
  descriptionBoxData: string;
  purchaseInformationData: Purchaseable | undefined;
  digData: boolean;
  debugMode: boolean;
}
export const key: InjectionKey<Store<State>> = Symbol();
export const store = createStore<State>({
  state: {
    descriptionBoxData: defaultDescription,
    purchaseInformationData: undefined,
    digData: false,
    debugMode: false,
  },
  getters: {},
  mutations: {
    resetDesc(state: State) {
      state.purchaseInformationData = undefined;
      state.descriptionBoxData =
        "Hover over something to see a description of it here.";
      state.digData = false;
    },
    hoverDescIdentifiable(state: State, describe: Identifiable) {
      if (describe instanceof Purchaseable) {
        state.purchaseInformationData = describe;
      }
      state.descriptionBoxData = describe.dataObject.description;
    },
    hoverDescDig(state: State) {
      state.digData = true;
      state.descriptionBoxData = uiDescriptions["dig"];
    },
    hoverDescString(state: State, str: string) {
      state.descriptionBoxData = str;
    },
    toggleDebug(state: State) {
      state.debugMode = !state.debugMode;
    },
  },
});
