<template>
  <div>
    <h4>Dig rates:</h4>
    <ul>
      <li v-for="id in Object.keys(dig.digRates)" :key="id">
        <p>
          {{ getResource(id).dataObject.name }}:
          <span class="good-text"
            >{{ formatNumber(dig.findTrueDigRate(id)) }} m/s</span
          >
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Dig from "@/model/dig";
import { game } from "@/model/game";
import { formatNumber } from "@/components/format";
import { defineComponent } from "vue";
export default defineComponent({
  name: "DigInformation",
  props: { dig: Dig },
  methods: {
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    getResource(id: number) {
      return game.resourceDict[id];
    },
  },
});
</script>
<style scoped>
ul {
  columns: 2;
}
</style>