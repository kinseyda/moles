<template>
  <div id="app">
    <div id="top-bar">
      <button
        @click="toggleTheme"
        @mouseover="hoverDescString(uiDescriptions['theme'])"
        @mouseleave="resetDesc()"
      >
        Theme: {{ theme == "light" ? "Light" : ""
        }}{{ theme == "dark" ? "Dark" : "" }}
      </button>
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
        @click="debugToggle"
        @mouseover="hoverDescString(uiDescriptions['debug'])"
        @mouseleave="resetDesc()"
      >
        Debug
      </button>
      <button
        @click="toggleTooltips"
        @mouseover="hoverDescString(uiDescriptions['descriptionPosition'])"
        @mouseleave="resetDesc()"
      >
        Descriptions: {{ tooltips ? "Tooltips" : "Fixed" }}
      </button>
      <h4 v-if="debugMode">DEBUG MODE</h4>
    </div>
    <div id="main">
      <div id="left-column">
        <resource-list
          :resourceDict="gameData.resourceDict"
          :area="gameData.area"
        ></resource-list>
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
        <div
          id="description-container"
          :class="{
            'floating-tooltip': tooltips,
            'is-empty': descriptionBoxIsEmpty,
          }"
        >
          <div id="description-box" v-html="descriptionBoxData"></div>
          <purchase-info
            v-bind:purchase="purchaseInformationData"
            v-if="purchaseInformationData"
          ></purchase-info>
          <dig-information :dig="gameData.dig" v-if="digData"></dig-information>
        </div>
      </div>
      <div id="purchaseable-column">
        <upgrade-list :upgradeDict="gameData.upgradeDict"> </upgrade-list>
        <structure-list
          :structureDict="gameData.structureDict"
        ></structure-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapMutations, mapState } from "vuex";
import AreaDisplay from "./components/AreaDisplay.vue";
import ResourceList from "./components/Resource/ResourceList.vue";
import UpgradeList from "./components/Upgrade/UpgradeList.vue";
import StructureList from "./components/Structure/StructureList.vue";
import ExpansionList from "./components/Expansion/ExpansionList.vue";
import EventLog from "./components/EventLog.vue";
import PurchaseInfo from "./components/Descriptions/PurchaseInfo/PurchaseInfo.vue";
import DigInformation from "./components/Descriptions/DigInformation.vue";
import { Game, game } from "./model/game";
import { formatNumber } from "./components/format";
import { uiDescriptions } from "./components/ui-descriptions";

@Options({
  name: "App",
  components: {
    AreaDisplay,
    ResourceList,
    UpgradeList,
    StructureList,
    ExpansionList,
    PurchaseInfo,
    DigInformation,
    EventLog,
  },
  computed: {
    ...mapState([
      "debugMode",
      "purchaseInformationData",
      "descriptionBoxData",
      "descriptionBoxIsEmpty",
      "digData",
    ]),
  },
  data() {
    return {
      gameData: game,
      uiDescriptions: uiDescriptions,
      tooltips: false,
      theme: "light",
    };
  },
  methods: {
    ...mapMutations([
      "toggleDebug",
      "hoverDescDig",
      "hoverDescString",
      "resetDesc",
    ]),
    toggleTheme() {
      const htmlTag = document.getElementsByTagName("html")[0];
      if (this.theme == "light") {
        htmlTag.setAttribute("theme", "dark");
        localStorage.setItem("molesTheme", "dark");
        this.theme = "dark";
      } else if (this.theme == "dark") {
        htmlTag.setAttribute("theme", "light");
        localStorage.setItem("molesTheme", "light");
        this.theme = "light";
      }
    },
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
      this.gameData.calculateTrueRates();
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
    toggleTooltips() {
      this.tooltips = !this.tooltips;
      this.setTooltips(this.tooltips);
    },
    setTooltips(tooltips: boolean) {
      let tooltipPos = function (e: MouseEvent) {
        const descContainer = document.getElementById("description-container");
        if (descContainer === null) {
          return;
        }
        const x = e.clientX,
          y = e.clientY;
        if (x + 20 + 384 > window.innerWidth) {
          descContainer.style.left = "";
          descContainer.style.right = window.innerWidth - x + 20 + "px";
        } else {
          descContainer.style.right = "";
          descContainer.style.left = x + 20 + "px";
        }
        descContainer.style.top = y + 20 + "px";
      };
      if (tooltips) {
        localStorage.setItem("molesDescPos", "tooltip");
        window.addEventListener("mousemove", tooltipPos);
      } else {
        localStorage.setItem("molesDescPos", "fixed");
        window.removeEventListener("mousemove", tooltipPos);
      }
    },
  },
  mounted() {
    setInterval(this.gameLoop, 50);

    // Load theme selection
    const htmlTag = document.getElementsByTagName("html")[0];
    const loadTheme = localStorage.getItem("molesTheme");
    if (loadTheme == "light" || loadTheme == "dark") {
      htmlTag.setAttribute("theme", loadTheme);
      this.theme = loadTheme;
    } else {
      htmlTag.setAttribute("theme", "light");
    }

    // Load description position selection
    const loadDescPos = localStorage.getItem("molesDescPos");
    if (loadDescPos == "fixed") {
      this.tooltips = false;
      this.setTooltips(false);
    } else {
      this.tooltips = true;
      this.setTooltips(true);
    }
  },
})
export default class App extends Vue {}
</script>

<style scoped>
#main {
  position: absolute;
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  top: 25px;
  min-height: calc(100% - 25px);
  width: 100%;
}
#top-bar {
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
  flex: 0 0 42ch;
  min-height: 100%;
}
#central-column {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}
#dig-button {
  width: 100%;
  font-size: xx-large;
  flex: 1 1 0;
}
#buttons-container {
  width: calc(100% - 40px);
  margin: 20px;
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
}
#event-log-container {
  flex: 1 0 0;
}
#description-container.floating-tooltip {
  border: 1px solid var(--text-color);
  width: 384px;
  display: block;
  position: fixed;
  overflow: hidden;
}
#description-container.floating-tooltip.is-empty {
  display: none;
}
#purchaseable-column {
  flex: 0 0 30ch;
  display: flex;
  flex-direction: column;
}
</style>
