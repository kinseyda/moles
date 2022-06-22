<template>
  <div>
    <h4>Dig rates:</h4>
    <ul>
      <li v-for="id in Object.keys(dig.digRates)" :key="id">
        <colored-resource :resData="getResource(id).dataObject"></colored-resource>:
        <span class="good-text"
          >{{ formatNumber(dig.findTrueDigRate(id))
          }}<small class="good-text"> Mo/s</small></span
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Dig from "@/model/dig";
import { game } from "@/model/game";
import { formatNumber } from "@/components/format";
import { defineComponent } from "vue";
import ColoredResource from "@/components/ColoredResource.vue";
export default defineComponent({
  name: "DigInformation",
  props: { dig: Dig },
  components: {
    ColoredResource,
  },
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
  list-style-type: none;
}
</style>
