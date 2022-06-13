<template>
  <tr
    class="list-row clickable"
    @mouseover="hoverDescIdentifiable(upgrade)"
    @mouseleave="resetDesc()"
    @click="buyUpgrade(upgrade)"
  >
    <td :class="{ 'purchase-available': upgrade.canBuy }">
      {{ upgrade.dataObject.name }}
    </td>
  </tr>
</template>

<script lang="ts">
import Upgrade from "@/model/upgrade";
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { formatNumber } from "@/components/format";

export default defineComponent({
  name: "UpgradeItem",
  props: ["upgrade"],
  methods: {
    ...mapMutations(["hoverDescIdentifiable", "resetDesc"]),
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    buyUpgrade(upgrade: Upgrade) {
      if (upgrade.buy()) {
        this.resetDesc();
      }
    },
  },
});
</script>
