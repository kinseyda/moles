<template>
  <div id="app">
    <div id="top-bar">
      <button
        @click="saveGame"
        @mouseover="hoverDescString(uiDescriptions['save'])"
        @mouseleave="resetDesc()"
      >
        Save
      </button>
      <button
        @click="loadGame"
        @mouseover="hoverDescString(uiDescriptions['load'])"
        @mouseleave="resetDesc()"
      >
        Load
      </button>

      <button @click="toggleSettingsOpen()">Settings</button>
      <button
        @click="debugToggle"
        @mouseover="hoverDescString(uiDescriptions['debug'])"
        @mouseleave="resetDesc()"
      >
        Debug
      </button>
      <h4 v-if="debugMode">DEBUG MODE</h4>
    </div>
    <div id="game-space">
      <div id="left-column">
        <resource-list
          :resourceDict="gameData.resourceDict"
          :area="gameData.area"
        ></resource-list>
        <button id="empire-button" @click="toggleEmpireOpen">Empire</button>
      </div>
      <div id="central-column">
        <area-display :area="gameData.area"></area-display>
        <div id="buttons-container">
          <button
            id="dig-button"
            @mouseover="hoverDescDig()"
            @mouseleave="resetDesc()"
            @mousedown="setDigging(true)"
            @mouseup="setDigging(false)"
          >
            <h1>Dig</h1>
          </button>
          <expansion-list
            :expansionDict="gameData.expansionDict"
          ></expansion-list>
          <div id="debug-buttons" v-if="debugMode">
            <button @click="gameLoop">Tick</button>
            <button @click="debugFillAll">Fill all resources</button>
          </div>
        </div>
        <div id="event-log-container">
          <event-log :eventsDict="gameData.eventsDict"></event-log>
        </div>
        <description-container></description-container>
      </div>
      <div id="purchaseable-column">
        <upgrade-list :upgradeDict="gameData.upgradeDict"> </upgrade-list>
        <structure-list
          :structureDict="gameData.structureDict"
        ></structure-list>
      </div>
    </div>

    <settings-display v-if="popUpOpen == 'settings'"></settings-display>
    <empire-display v-if="popUpOpen == 'empire'"></empire-display>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapMutations, mapState } from "vuex";
import AreaDisplay from "./components/AreaDisplay.vue";
import SettingsDisplay from "./components/SettingsDisplay.vue";
import EmpireDisplay from "./components/EmpireDisplay.vue";
import ResourceList from "./components/Resource/ResourceList.vue";
import UpgradeList from "./components/Upgrade/UpgradeList.vue";
import StructureList from "./components/Structure/StructureList.vue";
import ExpansionList from "./components/Expansion/ExpansionList.vue";
import EventLog from "./components/EventLog.vue";
import DescriptionContainer from "./components/Descriptions/DescriptionContainer.vue";
import { Game, game } from "./model/game";
import { formatNumber } from "./components/format";
import { uiDescriptions } from "./components/ui-descriptions";
import { setTooltips } from "./components/SettingsDisplay.vue";

@Options({
  name: "App",
  components: {
    AreaDisplay,
    ResourceList,
    UpgradeList,
    StructureList,
    ExpansionList,
    DescriptionContainer,
    EventLog,
    SettingsDisplay,
    EmpireDisplay,
  },
  computed: {
    ...mapState([
      "debugMode",
      "purchaseInformationData",
      "structSellData",
      "descriptionBoxData",
      "descriptionBoxIsEmpty",
      "digData",
      "popUpOpen",
      "settings",
    ]),
  },
  data() {
    return {
      gameData: game,
      uiDescriptions: uiDescriptions,
    };
  },
  methods: {
    ...mapMutations([
      "toggleDebug",
      "hoverDescDig",
      "hoverDescString",
      "resetDesc",
      "toggleEmpireOpen",
      "toggleSettingsOpen",
      "settingsSetTheme",
      "settingsSetTooltips",
      "settingsSetCBMode",
    ]),
    formatNumber(num: number) {
      return formatNumber(num, "");
    },
    gameLoop() {
      this.gameData.tick();
    },
    saveGame() {
      localStorage.setItem("molesSave", JSON.stringify(this.gameData));
    },
    loadGame() {
      const sto = localStorage.getItem("molesSave");
      if (sto !== null) {
        Game.loadGame(sto);
      }
      this.gameData = game;
    },
    setDigging(isDigging: boolean) {
      this.gameData.dig.digging = isDigging;
    },
    debugToggle() {
      this.toggleDebug();
    },
    debugFillAll() {
      for (let resId in this.gameData.resourceDict) {
        this.gameData.resourceDict[resId].setAmount(
          this.gameData.resourceDict[resId].cap
        );
      }
    },
  },
  mounted() {
    setInterval(this.gameLoop, 50);

    // Load theme selection
    const htmlTag = document.getElementsByTagName("html")[0];
    const loadTheme = localStorage.getItem("molesTheme");
    if (
      loadTheme == "light" ||
      loadTheme == "dark" ||
      loadTheme == "true mole"
    ) {
      htmlTag.setAttribute("theme", loadTheme);
      this.settingsSetTheme(loadTheme);
    } else {
      htmlTag.setAttribute("theme", "light");
    }

    // Load description position selection
    const loadDescPos = localStorage.getItem("molesDescPos");
    if (loadDescPos == "fixed") {
      this.settingsSetTooltips(false);
      setTooltips(false);
    } else {
      this.settingsSetTooltips(true);
      setTooltips(true);
    }

    // Load color blindness mode
    const loadCBMode = localStorage.getItem("cbMode");
    if (loadCBMode == "green red" || loadCBMode == "blue orange") {
      htmlTag.setAttribute("cbMode", loadCBMode);
      this.settingsSetCBMode(loadCBMode);
    } else {
      htmlTag.setAttribute("cbMode", "green red");
    }
  },
})
export default class App extends Vue {}
</script>

<style scoped>
#game-space {
  position: absolute;
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  top: 25px;
  min-height: calc(100% - 25px);
  width: 100%;
}
#top-bar {
  background-color: var(--global-bg-color);
  position: absolute;
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  top: 0;
  min-height: 25px;
  width: 100%;
}
#top-bar button {
  padding-left: 5px;
  padding-right: 5px;
}
#left-column {
  flex: 0 0 44ch;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  margin-bottom: 1em;
}
#central-column {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  margin: 1em;
}
#dig-button {
  width: 100%;
  font-size: xx-large;
  flex: 1 1 0;
}
#buttons-container {
  width: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
}
#event-log-container {
  flex: 1 0 0;
}
#settings-display {
  position: absolute;
}
#purchaseable-column {
  flex: 0 0 30ch;
  display: flex;
  flex-direction: column;
}
#empire-button {
  flex: 1 1 0;
  margin-left: 1em;
}
</style>
