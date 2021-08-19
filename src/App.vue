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
import EventLog from "./components/EventLog.vue";
import PurchaseInformation from "./components/PurchaseInformation.vue";
import DigInformation from "./components/DigInformation.vue";
import SerializableClass, {
  SerializableClasses,
} from "./model/serializableClass";
import { game, Game, setGame } from "./model/game";
import Resource from "./model/resources";
import Upgrade from "./model/upgrades";
import Structure from "./model/structures";
import Dig from "./model/dig";
import { formatNumber } from "./components/format";
import { uiDescriptions } from "./uiDescriptions";

@Options({
  name: "App",
  components: {
    ResourceList,
    UpgradeList,
    StructureList,
    PurchaseInformation,
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
      const recurConstruct = (obj: any) => {
        if (obj.length > 0 || Object.keys(obj).length > 0) {
          // If list or object, recurse through each thing contained to assign all the referenced items into the class they need
          for (let i in obj) {
            if (i != "_class") {
              obj[i] = recurConstruct(obj[i]);
            }
          }
        }
        if (SerializableClasses[obj["_class"]] !== undefined) {
          // We only need to do anything if the object we're looking at has a "_class" key, otherwise it should just be returned
          switch (SerializableClasses[Number(obj["_class"])]) {
            case "Game":
              return new Game(
                obj.lastUpdate,
                obj.dig,
                obj.resourceDict,
                obj.upgradeDict,
                obj.structureDict,
                obj.eventsDict
              );
            case "Resource":
              return new Resource(
                obj.id,
                obj.amount,
                obj.cap,
                obj.capMultiplier,
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
              console.error(
                "Warning: SerializableClass loaded, this may be an error"
              );
              return Object.assign(
                new SerializableClass(SerializableClasses.SerializableClass),
                obj
              );
          }
        } else if (obj["_class"] !== undefined) {
          throw new Error(`Loading error! Invalid class '${obj["_class"]}'`);
        }
        return obj;
      };
      let sto = localStorage.getItem("molesSave");
      if (sto) {
        let save = JSON.parse(sto);
        setGame(recurConstruct(save));
        this.gameData = game;
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
#central-column {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}
#dig-button {
  height: 15em;
  width: calc(100% - 40px);
  margin: 20px;
  font-size: xx-large;
}
#buttons-container {
  flex: 0 0 16em;
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
