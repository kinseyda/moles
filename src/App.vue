<template>
  <div id="app">
      <button @click="toggleTheme">Theme</button>
      <button @click="saveGame">Save</button>
      <button @click="loadGame">Load</button>
      <div id="main">
        <div id="resource-list">
          <p>Resources:</p>
          <table>
            <resource-item
              v-for="item in gameData.resourceDict"
              v-bind:resource="item"
              v-bind:key="item.id"
            ></resource-item>
          </table>
        </div>
        <div id="central-column">
          <div id="buttons-container">
            <button
              id="dig-button"
              @mousedown="setDigging(true)"
              @mouseup="setDigging(false)"
            >
              <h1>Dig</h1>
            </button>
            <button @click="gameLoop">Tick</button>
          </div>
          <div id="description-container">
            <div id="description-box" v-html="descriptionBoxData"></div>
            <purchase-information
              id="purchase-information"
              v-bind:purchase="purchaseInformationData"
              v-if="purchaseInformationData"
            ></purchase-information>
          </div>
        </div>
        <div id="upgrade-structure-column">
          <upgrade-list :upgradeDict="gameData.upgradeDict">

          </upgrade-list>
          <div id="structure-list">
            <p>Structures:</p>
            <table>
              <structure-item
                v-for="item in gameData.structureDict"
                v-bind:structure="item"
                v-bind:key="item.id"
              ></structure-item>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex'
import ResourceItem from './components/ResourceItem.vue'
import UpgradeList from './components/UpgradeList.vue'
import StructureItem from './components/StructureItem.vue'
import PurchaseInformation from './components/PurchaseInformation.vue'
import SerializableClass from './js/classes/serializableClass'
import { game, Game, setGame } from './js/classes/game'
import Resource from './js/classes/resources'
import Upgrade from './js/classes/upgrades'
import Structure from './js/classes/structures'
import Dig from './js/classes/dig'
import {formatNumber} from './js/utils'

@Options({
  name: 'App',
  components: {
    ResourceItem,
    UpgradeList,
    StructureItem,
    PurchaseInformation,
  },
  computed: mapState(['purchaseInformationData', 'descriptionBoxData']),
  data() {
    return {
      gameData: game,
    }
  },
  methods: {
    toggleTheme() {
      const htmlTag = document.getElementsByTagName("html")[0];
      if (htmlTag.hasAttribute("theme")) {
        htmlTag.removeAttribute("theme");
        return;
      }
      htmlTag.setAttribute("theme", "dark");
    },
    formatNumber(num: number) {
      return formatNumber(num, "");
    },
    gameLoop() {
      let updateTime = Date.now();
      let diff = (updateTime - this.gameData.lastUpdate) / 1000;
      for (const resId in this.gameData.resourceDict) {
        this.gameData.resourceDict[resId].amount += this.gameData.resourceDict[resId].trueRate * diff;
        if (this.gameData.resourceDict[resId].amount > this.gameData.resourceDict[resId].cap) {
          this.gameData.resourceDict[resId].amount = this.gameData.resourceDict[resId].cap;
        }
      }
      this.gameData.lastUpdate = updateTime;
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
              return new Game(obj.lastUpdate, obj.dig, obj.resourceList, obj.upgradeList, obj.structureList);
            case "Resource":
              return new Resource(obj.id, obj.amount, obj.cap, obj.baseRate, obj.multiplier, obj.trueRate);
            case "Upgrade":
              return new Upgrade(obj.id, obj.bought, obj.discount);
            case "Structure":
              return new Structure(obj.id, obj.amount, obj.discount);
            case "Dig":
              return new Dig(obj.digRates);
            default:
              //Shouldn't happen, nothing should be a SerializableClass without being one of the classes listed above, and constructed that way
              return Object.assign(new SerializableClass(), obj);
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
  },
  mounted() {
    setInterval(this.gameLoop, 50);
  }
})
export default class App extends Vue {}
</script>

<style>
</style>
