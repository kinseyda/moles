<template>
  <tr class="list-row">
    <td
      class="struct-name"
      @mouseover="hoverDescIdentifiable(structure)"
      @mouseleave="resetDesc()"
      :class="{ 'purchase-available': structure.canBuy }"
    >
      {{ structure.dataObject.name }}
    </td>
    <td
      class="struct-amount"
      @mouseover="hoverDescIdentifiable(structure)"
      @mouseleave="resetDesc()"
    >
      {{ formatNumber(structure.amount) }}
    </td>
    <td
      class="struct-buy clickable"
      @mouseover="hoverDescIdentifiable(structure)"
      @mouseleave="resetDesc()"
    >
      <button
        class="buy-sell"
        @click="buyStructure(structure)"
        :class="{ 'good-text': structure.canBuy }"
      >
        +
      </button>
    </td>
    <td
      class="struct-sell"
      @mouseover="hoverDescStructSell(structure)"
      @mouseleave="resetDesc()"
    >
      <button
        class="buy-sell"
        @click="sellStructure(structure)"
        :class="{ 'bad-text': structure.canSell() }"
      >
        -
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import Structure from "@/model/structure";
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { formatNumber } from "@/components/format";

export default defineComponent({
  name: "StructureItem",
  props: ["structure"],
  methods: {
    ...mapMutations(["hoverDescIdentifiable", "hoverDescStructSell", "resetDesc"]),
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    buyStructure(structure: Structure) {
      structure.buy();
    },
    sellStructure(structure: Structure) {
      structure.sell();
    },
  },
});
</script>
<style scoped>
button.buy-sell {
  float: right;
  width: 2.5ch;
  margin-right: 5px;
}
td.struct-name {
  width: 23ch;
}
td.struct-amount {
  width: 3ch;
}
</style>
