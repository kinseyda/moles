<template>
  <div>
    <p id="pop-text">
      <span
        @mouseover="hoverDescString(uiDescriptions['population'])"
        @mouseleave="resetDesc()"
        >{{ getPopString(population)
        }}{{
          getPopString(population).slice(-1) == "s" ? "'" : "'s"
        }}
        Population: {{ formatPop(population) }}</span
      >
      /
      <span
        @mouseover="hoverDescString(uiDescriptions['populationMax'])"
        @mouseleave="resetDesc()"
        >{{ formatPop(popCap) }} Mo</span
      >
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDown, formatNumber } from "@/components/format";
import { mapMutations } from "vuex";
import { uiDescriptions } from "@/components/ui-descriptions";
import {
  getPopulationStatus,
  getPopulationStatusString,
} from "@/content/population-statuses";
export default defineComponent({
  name: "PopulationDisplay",
  props: ["population", "popCap"],
  data() {
    return {
      uiDescriptions: uiDescriptions,
    };
  },
  methods: {
    ...mapMutations(["hoverDescString", "resetDesc"]),
    getPopString(pop: number): string {
      return getPopulationStatusString(getPopulationStatus(pop));
    },
    formatPop(num: number) {
      return formatDown(num);
    },
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
  },
});
</script>

<style scoped>
#pop-text {
  text-align: center;
}
</style>
