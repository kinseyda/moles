<template>
  <div id="app" @mouseup="setDigging(false)">
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

      <button
        @click="togglePopupOpen('settings')"
        @mouseover="hoverDescString(uiDescriptions['settings'])"
        @mouseleave="resetDesc()"
      >
        Settings
      </button>
      <button
        @click="togglePopupOpen('info')"
        @mouseover="hoverDescString(uiDescriptions['infoButton'])"
        @mouseleave="resetDesc()"
      >
        Info
      </button>
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
      <div
        id="tunneling-indicator"
        :class="{
          indicate:
            gameData.dig.digging &&
            gameData.area.amount < gameData.area.getUsableArea(),
        }"
      ></div>
      <div id="game-columns">
        <div id="left-column">
          <resource-list
            :resourceDict="gameData.resourceDict"
            :area="gameData.area"
          ></resource-list>
          <button
            id="empire-button"
            v-if="gameData.isUnlocked(PermanentUnlocks.Empire)"
            @mouseover="hoverDescString(uiDescriptions['empireButton'])"
            @mouseleave="resetDesc()"
            @click="togglePopupOpen('empire')"
          >
            Empire
          </button>
        </div>
        <div id="central-column">
          <area-display :area="gameData.area"></area-display>
          <population-display
            v-if="gameData.isUnlocked(PermanentUnlocks.Population)"
            :population="gameData.population"
            :popCap="gameData.getPopulationCap()"
          ></population-display>
          <div id="buttons-container">
            <dig-button
              :dig="gameData.dig"
              :area="gameData.area"
              v-on:setDigging="setDigging"
            ></dig-button>
            <expansion-list :expansionDict="gameData.expansionDict">
            </expansion-list>
            <div id="debug-buttons" v-if="debugMode">
              <button @click="gameLoop">Tick</button>
              <button @click="debugFillAll">Fill all resources</button>
              <button @click="setDigging(true)">Toggle digging on</button>
              <button @click="debugMultiplier *= 2">Time x2</button> Current:
              {{ debugMultiplier }}
              <button @click="debugMultiplier /= 2">Time /2</button>
            </div>
          </div>
          <div id="event-log-container">
            <event-log :eventsDict="gameData.eventsDict"></event-log>
          </div>
          <description-container></description-container>
        </div>
        <div id="purchasable-column">
          <upgrade-list :upgradeDict="gameData.upgradeDict"> </upgrade-list>
          <structure-list :structureDict="gameData.structureDict">
          </structure-list>
        </div>
      </div>

      <settings-display v-if="popUpOpen == 'settings'"></settings-display>
      <empire-display
        v-if="popUpOpen == 'empire'"
        :civilizations="gameData.civilizations"
        :empireRates="gameData.getEmpireRates()"
        :maxPotentialRates="gameData.getHighestPotentialRates()"
        :name="gameData.name"
        :population="gameData.population"
        :empireMult="gameData.empireMultiplier"
        :prestigeUnlocked="gameData.isUnlocked(PermanentUnlocks.Prestige)"
      >
      </empire-display>
      <prestige-menu
        v-if="popUpOpen == 'prestige'"
        v-on:prestige="prestigeGame"
        :maxPotentialRates="gameData.getHighestPotentialRates()"
      >
      </prestige-menu>
      <info-display
        v-if="popUpOpen == 'info'"
        :appVersion="appVersion"
        :gameSaveVersion="gameData.creationVersion"
      >
      </info-display>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapMutations, mapState } from "vuex";
import AreaDisplay from "./components/AreaDisplay.vue";
import PopulationDisplay from "./components/PopulationDisplay.vue";
import DigButton from "./components/Dig/DigButton.vue";
import SettingsDisplay from "./components/SettingsDisplay.vue";
import EmpireDisplay from "./components/Empire/EmpireDisplay.vue";
import InfoDisplay from "./components/InfoDisplay.vue";
import PrestigeMenu from "./components/Empire/PrestigeMenu.vue";
import ResourceList from "./components/Resource/ResourceList.vue";
import UpgradeList from "./components/Upgrade/UpgradeList.vue";
import StructureList from "./components/Structure/StructureList.vue";
import ExpansionList from "./components/Expansion/ExpansionList.vue";
import EventLog from "./components/EventLog.vue";
import DescriptionContainer from "./components/Descriptions/DescriptionContainer.vue";
import { PermanentUnlocks } from "./content/upgrade-data";
import { Game, game, startGame, currentVersion } from "./model/game";
import { formatNumber } from "./components/format";
import { uiDescriptions } from "./components/ui-descriptions";
import { setTooltips } from "./components/SettingsDisplay.vue";

@Options({
  name: "App",
  components: {
    AreaDisplay,
    PopulationDisplay,
    ResourceList,
    UpgradeList,
    StructureList,
    DigButton,
    ExpansionList,
    DescriptionContainer,
    EventLog,
    SettingsDisplay,
    InfoDisplay,
    EmpireDisplay,
    PrestigeMenu,
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
      PermanentUnlocks: PermanentUnlocks,
      appVersion: currentVersion,
      debugMultiplier: 1,
    };
  },
  methods: {
    ...mapMutations([
      "toggleDebug",
      "hoverDescDig",
      "hoverDescString",
      "resetDesc",
      "togglePopupOpen",
      "settingsSetTheme",
      "settingsSetTooltips",
      "settingsSetCBMode",
    ]),
    formatNumber(num: number) {
      return formatNumber(num, "");
    },
    gameLoop() {
      this.gameData.tick(this.debugMultiplier);
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
    prestigeGame(resourcesSelected: number[]) {
      game.prestige(resourcesSelected);
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
  beforeCreate() {
    startGame();
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
  top: 25px;
  height: calc(100% - 25px);
  width: 100%;
  background-size: 100% 100%;
  background-image: var(--background-image);
  background-color: var(--far-bg-color);
}
#game-columns {
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  position: absolute;
  height: 100%;
  width: 100%;
}
#tunneling-indicator {
  position: absolute;
  pointer-events: none;
  z-index: 2;
  height: 100%;
  width: 100%;
  background-image: var(--background-image);
  background: radial-gradient(transparent 50%, var(--text-color));
  background-size: 100% 100%;
  opacity: 0;
  transition: 1s;
}
#tunneling-indicator.indicate {
  transition: 5s;
  opacity: 0.75;
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
#purchasable-column {
  flex: 0 0 30ch;
  display: flex;
  flex-direction: column;
}
#empire-button {
  flex: 1 1 0;
  margin-left: 1em;
}
</style>
