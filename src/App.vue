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
        @click="togglePopupOpen(PopupTypes.Settings)"
        @mouseover="hoverDescString(uiDescriptions['settings'])"
        @mouseleave="resetDesc()"
      >
        Settings
      </button>
      <button
        @click="togglePopupOpen(PopupTypes.Info)"
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
      <button
        v-if="mode == 'development'"
        @click="togglePopupOpen(PopupTypes.DevUnlockTree)"
      >
        Unlocks
      </button>
      <button v-if="mode == 'development'" @click="togglePopupOpen(PopupTypes.DevEditor)">
        Editor
      </button>
      <b v-if="debugMode" class="bad-text">DEBUG MODE IS ON</b>
      <b id="dev-text" class="bad-text">Dev Mode</b>
      <p id="version-text">Moles v{{ appVersion }}</p>
    </div>
    <div id="game-space">
      <div
        id="tunneling-indicator"
        :class="{
          indicate:
            gameData.dig.digging && gameData.area.amount < gameData.area.getUsableArea(),
        }"
      ></div>
      <div id="game-columns">
        <div id="left-column">
          <resource-list
            ref="resList"
            :resourceDict="gameData.resourceDict"
            :area="gameData.area"
          ></resource-list>
          <button
            id="empire-button"
            v-if="gameData.isUnlocked(PermanentUnlocks.Empire)"
            @mouseover="hoverDescString(uiDescriptions['empireButton'])"
            @mouseleave="resetDesc()"
            @click="togglePopupOpen(PopupTypes.Empire)"
          >
            Empire
          </button>
        </div>
        <div id="central-column">
          <div id="area-pop">
            <area-display
              v-if="gameData.isUnlocked(PermanentUnlocks.Digging)"
              :area="gameData.area"
            ></area-display>
            <population-display
              v-if="gameData.isUnlocked(PermanentUnlocks.Population)"
              :population="gameData.population"
              :popCap="gameData.getPopulationCap()"
            ></population-display>
          </div>
          <div id="buttons-container">
            <dig-button
              ref="digButton"
              v-show="gameData.isUnlocked(PermanentUnlocks.Digging)"
              :dig="gameData.dig"
              :area="gameData.area"
              v-on:setDigging="setDigging"
            ></dig-button>
            <expansion-list :expansionDict="gameData.expansionDict"> </expansion-list>
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
            <event-log :eventsDict="gameData.eventsDict" ref="eventLog"></event-log>
          </div>
          <description-container :gameData="gameData"></description-container>
        </div>
        <div id="purchasable-column">
          <upgrade-list :upgradeDict="gameData.upgradeDict"> </upgrade-list>
          <structure-list :structureDict="gameData.structureDict"> </structure-list>
        </div>
      </div>

      <settings-display
        v-if="popUpOpen == PopupTypes.Settings"
        @settingsChange="(newSettings: Settings) => applySettings(newSettings)"
      ></settings-display>
      <empire-display
        v-if="popUpOpen == PopupTypes.Empire"
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
        v-if="popUpOpen == PopupTypes.Prestige"
        v-on:prestige="prestigeGame"
        :maxPotentialRates="gameData.getHighestPotentialRates()"
      >
      </prestige-menu>
      <info-display
        v-if="popUpOpen == PopupTypes.Info"
        :appVersion="appVersion"
        :gameSaveVersion="gameData.creationVersion"
      >
      </info-display>
      <unlock-tree
        v-if="popUpOpen == PopupTypes.DevUnlockTree"
        :upgradeDataDict="upgradeDataDict"
        :unlockDataDict="unlockDataDict"
      ></unlock-tree>
      <editor-display v-if="popUpOpen == PopupTypes.DevEditor"></editor-display>
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
import UnlockTree from "./components/Dev/UnlockTree/UnlockTreeDisplay.vue";
import EditorDisplay from "./components/Dev/Editor/EditorDisplay.vue";
import DescriptionContainer from "./components/Descriptions/DescriptionContainer.vue";
import { Game, game, startGame, currentVersion } from "./model/game";
import { unlockDataDict, upgradeDataDict } from "./content/upgrade-unlock-data";
import { formatNumber } from "./components/format";
import { uiDescriptions } from "./components/ui-descriptions";
import { setTooltips } from "./components/SettingsDisplay.vue";
import { PermanentUnlocks } from "./content/upgrade-unlock-data";
import { PopupTypes, Settings, defaultSettings } from "./store";

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
    UnlockTree,
    EditorDisplay,
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
      PopupTypes: PopupTypes,
      appVersion: currentVersion,
      debugMultiplier: 1,
      upgradeDataDict: upgradeDataDict,
      unlockDataDict: unlockDataDict,
      gameLoopID: -1,
      mode: process.env.NODE_ENV,
    };
  },
  methods: {
    ...mapMutations([
      "toggleDebug",
      "hoverDescDig",
      "hoverDescString",
      "resetDesc",
      "togglePopupOpen",
      "setSettings",
    ]),
    formatNumber(num: number) {
      return formatNumber(num);
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
      this.$refs["eventLog"].resetNextUp = true;
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
    applySettings(newSettings: Settings) {
      // Theme selection
      const htmlTag = document.getElementsByTagName("html")[0];
      const newTheme = newSettings.theme;
      if (newTheme == "light" || newTheme == "dark" || newTheme == "true mole") {
        htmlTag.setAttribute("theme", newTheme);
      } else {
        htmlTag.setAttribute("theme", "light");
      }

      // Description position selection
      const newDescPos = newSettings.tooltips;
      if (!newDescPos) {
        setTooltips(false);
      } else {
        setTooltips(true);
      }

      // Color blindness mode
      const newCBMode = newSettings.cbMode;
      if (
        newCBMode == "green red" ||
        newCBMode == "blue orange" ||
        newCBMode == "mono" ||
        newCBMode == "no color"
      ) {
        htmlTag.setAttribute("cbMode", newCBMode);
      } else {
        htmlTag.setAttribute("cbMode", "green red");
      }

      // Gameloop rate
      const newGameloopInterval = newSettings.gameLoopInterval;
      if (this.gameLoopID != -1) {
        clearInterval(this.gameLoopID);
      }
      this.gameLoopID = setInterval(this.gameLoop, newGameloopInterval);

      // Event log time update rate
      const newEventLogUpdateInterval = newSettings.eventLogUpdateInterval;
      (this.$refs["eventLog"] as typeof EventLog).changeInterval(
        newEventLogUpdateInterval
      );

      // Dig particles
      const newDigParticlesInterval = newSettings.digParticleInterval;
      (this.$refs["digButton"] as typeof DigButton).changeInterval(
        newDigParticlesInterval
      );

      // Resoruce list particles
      const newResListParticlesInterval = newSettings.resListParticleInterval;
      (this.$refs["resList"] as typeof ResourceList).changeInterval(
        newResListParticlesInterval
      );

      this.setSettings(newSettings);
    },
  },
  beforeCreate() {
    startGame();
  },
  mounted() {
    const localSettings = localStorage.getItem("settings");
    if (localSettings != null) {
      this.applySettings(JSON.parse(localSettings));
    } else {
      this.applySettings(defaultSettings);
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
  transition: 3s;
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
#version-text {
  margin-left: auto;
}
#dev-text {
  margin-left: auto;
  text-shadow: 1px 1px var(--text-color);
}
#left-column {
  flex: 0 0 50ch;
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
#area-pop {
  width: 100%;
  flex: 0 0 12%;
}
#buttons-container {
  width: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
  flex: 0 1 50%;
  display: flex;
  flex-direction: column;
}
#event-log-container {
  flex: 0 0 35%;
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
  margin-bottom: 1.3em;
}
#dev-stuff {
  flex: 1 0 0;
  height: 25px;
}
</style>
