<template>
  <tr
    class="list-row clickable"
    @mouseover="hoverDescIdentifiable(upgrade)"
    @mouseleave="resetDesc()"
    :class="{ 'purchase-available': upgrade.canBuy }"
    @click="buyUpgrade(upgrade)"
  >
    <td>{{ upgrade.dataObject.name }}</td>
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
      upgrade.buy();
      this.resetDesc();
    },
  },
});
</script>
