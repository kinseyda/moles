<template>
  <tr
    class="list-row clickable"
    @mouseover="purchaseHover(structure)"
    @mouseleave="resetDescription"
    @click="buyStructure(structure)"
  >
    <td :class="{ 'purchase-available': structure.canBuy }">
      {{ structure.dataObject.name }}
    </td>
    <td>{{ formatNumber(structure.amount) }}</td>
  </tr>
</template>

<script lang="ts">
import Structure from "@/js/classes/structures";
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { formatNumber } from "../js/utils";

export default defineComponent({
  name: "StructureItem",
  props: ["structure"],
  methods: {
    ...mapMutations(["hoverDesc"]),
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    purchaseHover(structure: Structure) {
      this.hoverDesc(structure);
    },
    resetDescription() {
      this.hoverDesc(undefined);
    },
    buyStructure(structure: Structure) {
      structure.buy();
    },
  },
});
</script>