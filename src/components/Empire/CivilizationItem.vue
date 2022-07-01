<template>
  <li
    class="list-row"
    @mouseover="hoverDescCivilization(civilization)"
    @mouseleave="resetDesc()"
  >
    {{ civilization.name }} <br />
    <ul>
      <li>Population: {{ formatPop(civilization.population) }}</li>
      <li>Status: {{ getPopString(civilization.population) }}</li>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { formatNumber, formatDown } from "@/components/format";
import {
  getPopulationStatus,
  getPopulationStatusString,
} from "@/content/population-statuses";

export default defineComponent({
  name: "CivilizationItem",
  props: ["civilization"],
  methods: {
    ...mapMutations(["hoverDescCivilization", "resetDesc"]),
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    getPopString(pop: number): string {
      return getPopulationStatusString(getPopulationStatus(pop));
    },
    formatPop(num: number) {
      return formatDown(num);
    },
  },
});
</script>
