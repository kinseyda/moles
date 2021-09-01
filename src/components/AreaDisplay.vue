<template>
  <div id="outer">
    <h2>{{ formatNumber(area.amount) }} / {{ formatNumber(area.cap) }} area</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatNumber } from "@/components/format";
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
h2 {
  text-align: center;
}
</style>