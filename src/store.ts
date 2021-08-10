import Purchaseable from "./js/classes/purchaseable";
import Vuex, { createStore, Store } from "vuex";
import { InjectionKey } from "vue";

const defaultDescription =
  "Hover over something to see a description of it here.";

export interface State {
  descriptionBoxData: string;
  purchaseInformationData: Purchaseable | undefined;
  debugMode: boolean;
}
export const key: InjectionKey<Store<State>> = Symbol();
export const store = createStore<State>({
  state: {
    descriptionBoxData: defaultDescription,
    purchaseInformationData: undefined,
    debugMode: false,
  },
  getters: {},
  mutations: {
    hoverDesc(state: State, purchase: Purchaseable) {
      if (!purchase) {
        state.purchaseInformationData = undefined;
        state.descriptionBoxData =
          "Hover over something to see a description of it here.";
      } else {
        state.purchaseInformationData = purchase;
        state.descriptionBoxData = purchase.dataObject.description;
      }
    },
    toggleDebug(state: State) {
      state.debugMode = !state.debugMode;
    },
  },
});
