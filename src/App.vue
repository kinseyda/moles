<template>
  <div id="app">
      <button @click="toggleTheme">Theme</button>
      <button @click="saveGame">Save</button>
      <button @click="loadGame">Load</button>
      <div id="main">
        <div id="resource-list">
          <p>Resources:</p>
          <table>
            <tr
              is="resource-item"
              v-for="item in gameData.resourceList"
              v-bind:resource="item"
              v-bind:key="item.id"
            ></tr>
          </table>
        </div>
        <div id="central-column">
          <div id="buttons-container">
            <button
              id="dig-button"
              @mousedown="gameData.dig.digging = true"
              @mouseup="gameData.dig.digging = false"
            >
              <h1>Dig</h1>
            </button>
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
          <div id="upgrade-list">
            <p>Upgrades:</p>
            <div id="upgrades">
              <table>
                <tr
                  is="upgrade-item"
                  v-for="item in gameData.upgradeList"
                  :class="{'purchase-available': item.canBuy}"
                  v-bind:upgrade="item"
                  v-bind:key="item.id"
                ></tr>
              </table>
            </div>
          </div>
          <div id="structure-list">
            <p>Structures:</p>
            <table>
              <tr
                is="structure-item"
                v-for="item in gameData.structureList"
                v-bind:structure="item"
                v-bind:key="item.id"
              ></tr>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ResourceItem from './components/ResourceItem.vue'
import UpgradeItem from './components/UpgradeItem.vue'
import StructureItem from './components/StructureItem.vue'
import PurchaseInformation from './components/PurchaseInformation.vue'
import SerializableClass from './js/classes/serializableClass'
import { game, Game, setGame } from './js/classes/game'
import Resource from './js/classes/resources'
import Upgrade from './js/classes/upgrades'
import Structure from './js/classes/structures'
import Dig from './js/classes/dig'
import {formatNumber} from './js/utils'

function gameLoop() {
  let updateTime = Date.now();
  let diff = (updateTime - game.lastUpdate) / 1000;

  for (let i = 0; i < game.resourceList.length; i++) {
    game.resourceList[i].amount += game.resourceList[i].trueRate * diff;
    if (game.resourceList[i].amount > game.resourceList[i].cap) {
      game.resourceList[i].amount = game.resourceList[i].cap;
    }
  }

  game.lastUpdate = updateTime;
}

export default {
  name: 'App',
  components: {
    ResourceItem,
    UpgradeItem,
    StructureItem,
    PurchaseInformation
  },
  computed: mapState(['gameData', 'purchaseInformationData', 'descriptionBoxData']),
  methods: {
    toggleTheme() {
      const htmlTag = document.getElementsByTagName("html")[0];
      if (htmlTag.hasAttribute("theme")) {
        htmlTag.removeAttribute("theme");
        return;
      }
      htmlTag.setAttribute("theme", "dark");
    },
    formatNumber(num) {
      return formatNumber(num, "");
    },
    gameLoop() {
      gameLoop(this);
    },
    saveGame() {
      localStorage.setItem("molesSave", JSON.stringify(this.gameData));
    },
    loadGame() {
      const recurConstruct = (obj) => {
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
              return Object.assign(new Game(), obj);
            case "Resource":
              return Object.assign(new Resource(), obj);
            case "Upgrade":
              return Object.assign(new Upgrade(), obj);
            case "Structure":
              return Object.assign(new Structure(), obj);
            case "Dig":
              return Object.assign(new Dig(), obj);
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
      let save = JSON.parse(sto);
      if (this.saveGame) {
        setGame(recurConstruct(save));
        this.$store.commit('setGameData', game);
      }
    },
  },
  mounted() {
    setInterval(this.gameLoop, 50)
  }
}
</script>

<style>
</style>
