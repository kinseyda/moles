<template>
  <tr
    class="list-row clickable"
    @mouseover="hoverDescIdentifiable(structure)"
    @mouseleave="resetDesc()"
    @click="buyStructure(structure)"
  >
    <td :class="{ 'purchase-available': structure.canBuy }">
      {{ structure.dataObject.name }}
    </td>
    <td>{{ formatNumber(structure.amount) }}</td>
  </tr>
</template>

<script lang="ts">
import Structure from "@/js/model/structures";
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { formatNumber } from "@/js/utils";

export default defineComponent({
  name: "StructureItem",
  props: ["structure"],
  methods: {
    ...mapMutations(["hoverDescIdentifiable", "resetDesc"]),
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    buyStructure(structure: Structure) {
      structure.buy();
    },
  },
});
</script>