<template>
  <div id="app">
    <div id="top-bar">
      <button
        @click="toggleTheme"
        @mouseover="hoverDescString(uiDescriptions['theme'])"
        @mouseleave="resetDesc()"
      >
        Theme
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
      <h3 v-if="debugMode">DEBUG MODE</h3>
    </div>
    <div id="main">
      <resource-list :resourceDict="gameData.resourceDict"></resource-list>
      <div id="central-column">
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
          <div id="debug-buttons" v-if="debugMode">
            <button @click="gameLoop">Tick</button>
            <button @click="debugFillAll">Fill all resources</button>
          </div>
        </div>
        <div
          id="description-container"
          :class="{
            'floating-tooltip': tooltips,
            'is-empty': descriptionBoxIsEmpty,
          }"
        >
          <div id="description-box" v-html="descriptionBoxData"></div>
          <purchase-information
            v-bind:purchase="purchaseInformationData"
            v-if="purchaseInformationData"
          ></purchase-information>
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
import ResourceList from "./components/ResourceList.vue";
import UpgradeList from "./components/UpgradeList.vue";
import StructureList from "./components/StructureList.vue";
import PurchaseInformation from "./components/PurchaseInformation.vue";
import DigInformation from "./components/DigInformation.vue";
import SerializableClass from "./js/classes/serializableClass";
import { game, Game, setGame } from "./js/classes/game";
import Resource from "./js/classes/resources";
import Upgrade from "./js/classes/upgrades";
import Structure from "./js/classes/structures";
import Dig from "./js/classes/dig";
import { formatNumber } from "./js/utils";
import { uiDescriptions } from "./js/uiDescriptions";

@Options({
  name: "App",
  components: {
    ResourceList,
    UpgradeList,
    StructureList,
    PurchaseInformation,
    DigInformation,
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
      if (htmlTag.getAttribute("theme") == "light") {
        htmlTag.setAttribute("theme", "dark");
        localStorage.setItem("molesTheme", "dark");
      } else if (htmlTag.getAttribute("theme") == "dark") {
        htmlTag.setAttribute("theme", "light");
        localStorage.setItem("molesTheme", "light");
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
      const recurConstruct = (obj: any) => {
        if (obj.length > 0 || Object.keys(obj).length > 0) {
          // If list or object, recurse through each thing contained to assign all the referenced items into the class they need
          for (let i in obj) {
            if (i != "_class") {
              obj[i] = recurConstruct(obj[i]);
            }
          }
        }
        if (
          obj["_class"] == "Game" ||
          obj["_class"] == "Resource" ||
          obj["_class"] == "Upgrade" ||
          obj["_class"] == "Structure" ||
          obj["_class"] == "Dig" ||
          obj["_class"] == "SerializableClass"
        ) {
          // We only need to do anything if the object we're looking at has a "_class" key, otherwise it should just be returned
          switch (obj["_class"]) {
            case "Game":
              return new Game(
                obj.lastUpdate,
                obj.dig,
                obj.resourceDict,
                obj.upgradeDict,
                obj.structureDict
              );
            case "Resource":
              return new Resource(
                obj.id,
                obj.amount,
                obj.cap,
                obj.baseRate,
                obj.multiplier,
                obj.trueRate
              );
            case "Upgrade":
              return new Upgrade(obj.id, obj.bought, obj.discount);
            case "Structure":
              return new Structure(obj.id, obj.amount, obj.discount);
            case "Dig":
              return new Dig(obj.digRates);
            default:
              //Shouldn't happen, nothing should be a SerializableClass without being one of the classes listed above, and constructed that way
              return Object.assign(
                new SerializableClass("SerializableClass"),
                obj
              );
          }
        } else if (obj["_class"] !== undefined) {
          console.error("Loading error! Invalid class");
        }
        return obj;
      };
      let sto = localStorage.getItem("molesSave");
      if (sto) {
        let save = JSON.parse(sto);
        if (this.saveGame) {
          setGame(recurConstruct(save));
          this.gameData = game;
        }
      }
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
        this.gameData.resourceDict[resId].amount =
          this.gameData.resourceDict[resId].cap;
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
    } else {
      htmlTag.setAttribute("theme", "light");
    }

    // Load description position selection
    const loadDescPos = localStorage.getItem("molesDescPos");
    if (loadDescPos == "tooltip") {
      this.tooltips = true;
      this.setTooltips(true);
    } else {
      this.tooltips = false;
      this.setTooltips(false);
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
#central-column {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
}
#dig-button {
  height: 15em;
  width: calc(100% - 40px);
  margin: 20px;
}
#buttons-container {
  flex: 1 0 0;
}
#description-container {
  margin-bottom: 1em;
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
