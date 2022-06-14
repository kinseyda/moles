<template>
  <div>
    <h4>Production:</h4>
    <ul>
      <li v-for="id in Object.keys(structure.dataObject.production)" :key="id">
        <p>
          {{ getResource(id).dataObject.name }}:
          <span class="good-text"
            >+{{ formatNumber(structure.dataObject.production[id]) }}
            <small class="good-text"> Mo/s</small></span
          >
        </p>
      </li>
      <li v-for="id in Object.keys(structure.dataObject.consumption)" :key="id">
        <p>
          {{ getResource(id).dataObject.name }}:
          <span class="bad-text"
            >-{{ formatNumber(structure.dataObject.consumption[id]) }}
            <small class="bad-text"> Mo/s</small></span
          >
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { game } from "@/model/game";
import { defineComponent } from "vue";
import { formatNumber } from "@/components/format";
export default defineComponent({
  name: "ProduceDetails",
  props: ["structure"],
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
