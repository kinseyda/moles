<template>
  <div>
    <p id="pop-text">
      <span
        @mouseover="hoverDescString(uiDescriptions['population'])"
        @mouseleave="resetDesc()"
        >Population: {{ formatPop(population) }}</span
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
