<template>
  <pop-up-menu>
    <template #title>Prestige</template>
    <template #content>
      <div id="prestige-outer">
        <div id="resource-select">
          <p>Select up to 2 resources to export from this civilization when you leave.</p>
          <ul>
            <li v-for="(rate, resId) in maxPotentialRates" :key="resId">
              <label>
                <input
                  type="checkbox"
                  v-model="resourcesSelected"
                  :value="resId"
                  :disabled="
                    (resourcesSelected.length >= 2 &&
                      resourcesSelected.indexOf(resId) === -1) ||
                    rate <= 0
                  "
                  number
                />
                <span class="res-text">
                  <colored-resource
                    :resData="getResData(Number(resId))"
                  ></colored-resource
                  >: {{ formatNumber(rate) }}<small> Mo/s</small></span
                >
              </label>
            </li>
          </ul>
        </div>
        <div id="buttons">
          <button @click="togglePopupOpen('empire')">Cancel</button>
          <button
            @click="
              $emit('prestige', resourcesSelected);
              togglePopupOpen('prestige');
            "
            @mouseover="hoverDescString(uiDescriptions['prestigeConfirm'])"
            @mouseleave="resetDesc()"
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
import { ResourceData } from "@/model/data-interfaces";
import { resourceDataDict } from "@/content/resource-data";
import { formatNumber } from "../format";
import ColoredResource from "@/components/ColoredResource.vue";

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
    ColoredResource,
  },
  computed: {
    ...mapState(["settings"]),
  },
  methods: {
    ...mapMutations(["togglePopupOpen", "hoverDescString", "resetDesc"]),
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
input {
  margin-right: -1ch;
  top: 50%;
  -webkit-transform: translate(0, -25%);
  transform: translate(0, -25%);
}
ul {
  position: relative;
  list-style-type: none;
}
.res-text {
  margin-left: 2ch;
}
</style>
