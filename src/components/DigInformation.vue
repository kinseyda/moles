<template>
  <div>
    <h4>Dig rates:</h4>
    <ul>
      <li v-for="id in Object.keys(dig.digRates)" :key="id">
        <p>
          {{ getResource(id).dataObject.name }}:
          {{ formatNumber(dig.findTrueDigRate(id)) }} m/s
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Dig from "@/js/model/dig";
import { game } from "@/js/model/game";
import { formatNumber } from "@/js/utils";
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
