import { game, Game } from "./js/classes/game";
import Purchaseable from "./js/classes/purchaseable";
import Vuex, { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import Upgrade from "./js/classes/upgrades";

const defaultDescription =
  "Hover over something to see a description of it here.";

export interface State {
  descriptionBoxData: string;
  purchaseInformationData: Purchaseable | undefined;
}
export const key: InjectionKey<Store<State>> = Symbol();
export const store = createStore<State>({
  state: {
    descriptionBoxData: defaultDescription,
    purchaseInformationData: undefined,
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
  },
});
