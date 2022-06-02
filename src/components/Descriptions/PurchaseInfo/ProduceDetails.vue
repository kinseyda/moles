<template>
  <div>
    <h4>Production:</h4>
    <ul>
      <li v-for="id in Object.keys(structure.dataObject.production)" :key="id">
        <p class="produce">
          {{ getResource(id).dataObject.name }}: +{{
            formatNumber(structure.dataObject.production[id])
          }}
          m/s
        </p>
      </li>
      <li v-for="id in Object.keys(structure.dataObject.consumption)" :key="id">
        <p class="consume">
          {{ getResource(id).dataObject.name }}: -{{
            formatNumber(structure.dataObject.consumption[id])
          }}
          m/s
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

<style scoped>
.produce {
  color: green;
}
.consume {
  color: red;
}
</style>