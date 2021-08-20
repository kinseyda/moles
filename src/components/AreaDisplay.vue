<template>
  <div id="outer">
    <table>
      <h2>
        {{ formatNumber(area.amount) }} / {{ formatNumber(area.cap) }} area
      </h2>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatNumber } from "./format";
export default defineComponent({
  name: "AreaDisplay",
  props: ["area"],
  methods: {
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
  },
});
</script>

<style scoped>
</style>