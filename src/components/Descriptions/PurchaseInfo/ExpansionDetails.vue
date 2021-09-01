<template>
  <div>
    <p>
      Expands area by <b>{{ expansion.dataObject.areaEach }}</b>
    </p>
  </div>
</template>

<script lang="ts">
import { game } from "@/model/game";
import { defineComponent } from "vue";
import { formatNumber } from "@/components/format";
export default defineComponent({
  name: "ExpansionDetails",
  props: ["expansion"],
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