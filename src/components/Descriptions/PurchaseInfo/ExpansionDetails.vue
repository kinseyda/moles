<template>
  <div>
    <p>
      Expands area by
      <b class="good-text"
        >{{ expansion.dataObject.areaEach
        }}<small class="good-text"> Mo</small></b
      >
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