<template>
  <div>
    <ul>
      <li v-for="id in Object.keys(effect.params[0])" :key="id">
        <p>
          {{ getResource(id).dataObject.name }}: +{{
            formatNumber(effect.params[0][id] * 100)
          }}%
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
  name: "MultiplyEffect",
  props: {
    effect: Object,
    detailedDesc: String,
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