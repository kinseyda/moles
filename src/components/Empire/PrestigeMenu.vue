<template>
  <pop-up-menu>
    <template #title>Prestige</template>
    <template #content>
      <div id="prestige-outer">
        <div id="resource-select">
          <p>
            Select up to 2 resources to export from this civilization when you
            leave.
          </p>
          <ul>
            <li v-for="(rate, resId) in maxPotentialRates" :key="resId">
              <label>
                <input
                  type="checkbox"
                  v-model="resourcesSelected"
                  :value="resId"
                  :disabled="
                    resourcesSelected.length >= 2 &&
                    resourcesSelected.indexOf(resId) === -1
                  "
                  number
                />
                {{ getResData(resId).name }}: {{ formatNumber(rate)
                }}<small> Mo/s</small>
              </label>
            </li>
          </ul>
        </div>
        <div id="buttons">
          <button @click="toggleEmpireOpen()">Cancel</button>
          <button
            @click="
              $emit('prestige', resourcesSelected);
              togglePrestigeOpen();
            "
          >
            <h3>Prestige</h3>
          </button>
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
import { ResourceData } from "@/content/data-interfaces";
import { resourceDataDict } from "@/content/resource-data";
import { formatNumber } from "../format";

export default defineComponent({
  name: "PrestigeMenu",
  props: ["maxPotentialRates"],
  data() {
    return {
      uiDescriptions: uiDescriptions,
      resourcesSelected: [] as number[],
    };
  },
  emits: ["prestige"],
  components: {
    PopUpMenu,
  },
  computed: {
    ...mapState(["settings"]),
  },
  methods: {
    ...mapMutations([
      "toggleEmpireOpen",
      "togglePrestigeOpen",
      "hoverDescString",
      "resetDesc",
    ]),
    getResData(resId: number): ResourceData {
      return resourceDataDict[resId];
    },
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
  },
});
</script>

<style scoped>
#prestige-outer {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
}
#resource-select {
  flex: 1 0 85%;
}
#buttons {
  flex: 1 0 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
#buttons button {
  height: 75%;
  width: 25%;
}
</style>