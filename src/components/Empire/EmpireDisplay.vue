<template>
  <pop-up-menu>
    <template #title>Empire</template>
    <template #content>
      <div id="empire-outer">
        <div id="current-info">
          <div id="name-container">
            <div
              @mouseover="hoverDescString(uiDescriptions['civInfo'])"
              @mouseleave="resetDesc()"
            >
              <p>Civilization name:</p>
              <h3>{{ name }}</h3>
            </div>
            <input
              v-model="newName"
              @keyup.enter="setName"
              placeholder="edit name"
              @mouseover="hoverDescString(uiDescriptions['civRename'])"
              @mouseleave="resetDesc()"
            />
          </div>
          <div
            id="population-container"
            @mouseover="hoverDescString(uiDescriptions['civInfo'])"
            @mouseleave="resetDesc()"
          >
            <p>Current population: {{ formatPop(population) }}</p>
            <p>Status: {{ getPopString(population) }}</p>
          </div>
          <div
            id="max-resources-container"
            @mouseover="hoverDescString(uiDescriptions['civInfo'])"
            @mouseleave="resetDesc()"
          >
            Current max rates:
            <div id="resource-rates">
              <ul>
                <li v-for="(rate, resId) in maxPotentialRates" :key="resId">
                  {{ getResData(resId).name }}: {{ formatNumber(rate)
                  }}<small> Mo/s</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="empire-info" :class="{ hidden: civilizations.length < 1 }">
          <div class="empire-side" id="civilizations">
            <h3
              @mouseover="hoverDescString(uiDescriptions['civList'])"
              @mouseleave="resetDesc()"
            >
              Civilizations:
            </h3>
            <ul>
              <civilization-item
                v-for="(civilization, index) in civilizations"
                :key="index"
                :civilization="civilization"
              ></civilization-item>
            </ul>
          </div>
          <div class="empire-side" id="empire-resources">
            <h3>Empire Resources:</h3>
            <table>
              <tr>
                <td><b>Resource</b></td>
                <td><b>Total</b></td>
                <td><b>Available</b></td>
              </tr>
              <tr v-for="(rate, resId) in empireRates" :key="resId">
                <td
                  @mouseover="
                    hoverDescStringReg({
                      str: uiDescriptions['empireRes'],
                      args: [getResData(resId).name],
                    })
                  "
                  @mouseleave="resetDesc()"
                >
                  {{ getResData(resId).name }}:
                </td>
                <td
                  @mouseover="
                    hoverDescStringReg({
                      str: uiDescriptions['empireRes'],
                      args: [getResData(resId).name],
                    })
                  "
                  @mouseleave="resetDesc()"
                >
                  {{ formatNumber(rate) }}<small> Mo/s</small>
                </td>
                <td
                  @mouseover="
                    hoverDescStringReg({
                      str: uiDescriptions['empireAvailable'],
                      args: [getResData(resId).name, empireMult * 100],
                    })
                  "
                  @mouseleave="resetDesc()"
                >
                  {{ formatNumber(rate * empireMult) }}<small> Mo/s</small>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div id="prestige-button" v-if="prestigeUnlocked">
          <button @click="togglePopupOpen('prestige')">Prestige</button>
        </div>
      </div>
    </template>
  </pop-up-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uiDescriptions } from "../ui-descriptions";
import { mapMutations, mapState } from "vuex";
import PopUpMenu from "@/components/PopUpMenu.vue";
import CivilizationItem from "./CivilizationItem.vue";
import { game } from "@/model/game";
import { resourceDataDict } from "@/content/resource-data";
import { ResourceData } from "@/content/data-interfaces";
import { getStatus, getStatusString } from "@/content/population-statuses";
import { formatNumber, formatDown } from "../format";

export default defineComponent({
  name: "EmpireDisplay",
  props: [
    "civilizations",
    "empireRates",
    "name",
    "population",
    "maxPotentialRates",
    "empireMult",
    "prestigeUnlocked",
  ],
  data() {
    return {
      uiDescriptions: uiDescriptions,
      newName: "",
      testStringAr: ["dan", "fillip"],
    };
  },
  emits: ["prestige"],
  components: {
    PopUpMenu,
    CivilizationItem,
  },
  computed: {
    ...mapState(["settings"]),
  },
  methods: {
    ...mapMutations([
      "togglePopupOpen",
      "hoverDescString",
      "hoverDescStringReg",
      "resetDesc",
    ]),
    getResData(resId: number): ResourceData {
      return resourceDataDict[resId];
    },
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    getPopString(pop: number): string {
      return getStatusString(getStatus(pop));
    },
    formatPop(num: number) {
      return formatDown(num);
    },
    setName() {
      game.name = this.newName;
    },
  },
});
</script>

<style scoped>
#empire-outer {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
}
#current-info {
  flex: 0 1 10%;
  display: flex;
  flex-direction: row;
  margin-bottom: 2em;
}
#name-container {
  flex: 1 1 0;
}
#population-container {
  flex: 1 1 0;
}
#max-resources-container {
  flex: 1 1 0;
}
#resource-rates {
  height: 3.5em;
  overflow: scroll;
}
#empire-info {
  flex: 1 1 65%;
}
#prestige-button {
  flex: 1 1 15%;
  display: flex;
  justify-content: center;
}
#prestige-button button {
  width: 25%;
  height: 75%;
}
.empire-side {
  width: 48%;
}
#civilizations {
  float: left;
}
#empire-resources {
  float: right;
}
input {
  border: 1px solid black;
}
.hidden {
  visibility: hidden;
}
</style>
