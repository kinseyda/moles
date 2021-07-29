import { createApp } from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import { game } from "./js/classes/game";

const defaultDescription =
  "Hover over something to see a description of it here.";

const store = new Vuex.Store({
  state: {
    descriptionBoxData: defaultDescription,
    purchaseInformationData: undefined,
    gameData: game,
  },
  mutations: {
    setGameData(state, ng) {
      state.gameData = ng;
    },
    hoverDesc(state, purchase) {
      if (!purchase) {
        state.purchaseInformationData = undefined;
        state.descriptionBoxData = defaultDescription;
      } else {
        state.purchaseInformationData = purchase;
        state.descriptionBoxData = purchase.dataObject.description;
      }
    },
  },
});
createApp(App)
  .use(store)
  .mount("#app");
