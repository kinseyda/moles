<template>
  <pop-up-menu>
    <template #title>Empire</template>
    <template #content>
      <div id="empire-outer">
        <div id="empire-info">
          <div class="empire-side" id="civilizations">
            <h3>Civilizations:</h3>
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
            <ul>
              <li v-for="(rate, resId) in empireRates" :key="resId">
                {{ getResData(resId).name }}: {{ rate }}<small> Mo/s</small>
              </li>
            </ul>
          </div>
        </div>
        <div id="prestige-button">
          <button @click="togglePrestigeOpen()">Prestige</button>
        </div>
      </div>
    </template>
  </pop-up-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uiDescriptions } from "../ui-descriptions";
import { mapMutations, mapState } from "vuex";
import PopUpMenu from "../PopUpMenu.vue";
import CivilizationItem from "./CivilizationItem.vue";
import { resourceDataDict } from "@/content/resource-data";
import { ResourceData } from "@/content/data-interfaces";

export default defineComponent({
  name: "EmpireDisplay",
  props: ["civilizations", "empireRates"],
  data() {
    return {
      uiDescriptions: uiDescriptions,
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
    ...mapMutations(["togglePrestigeOpen", "hoverDescString", "resetDesc"]),
    getResData(resId: number): ResourceData {
      return resourceDataDict[resId];
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
#empire-info {
  flex: 1 1 85%;
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
</style>