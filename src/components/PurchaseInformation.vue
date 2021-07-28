<template>
    <div><div class="purchase-desc" id="cost-container"><h4>Cost</h4><ul><li v-for="id in Object.keys(purchase.dataObject.cost)" :key="id">
    <p>{{ getResource(id).dataObject.name }}: {{ formatNumber(purchase.trueCost(id)) }}, {{ formatTime(purchase.timeUntil(id)) }}</p></li></ul></div><div class="purchase-desc" id="effect-produce-container">
    <produce-details v-if="purchase._class === 'Structure'" v-bind:structure="purchase"></produce-details>
    <effect-details v-if="purchase._class === 'Upgrade'" v-bind:effect="purchase.dataObject.effect"
    v-bind:detailedDesc="getEffectDescription(purchase)" v-bind:upgradeType="getUpgradeType(purchase)"></effect-details></div></div>
</template>

<script>
import ProduceDetails from './ProduceDetails.vue'
import EffectDetails from './EffectDetails.vue'
import {formatNumber, formatTime} from '../js/utils'
import { mapState } from 'vuex'
export default {
  name: 'PurchaseInformation',
  props: ["purchase"],
  components: {
    ProduceDetails,
    EffectDetails,
  },
  computed: mapState(['gameData']),
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
    formatTime(num) {
      return formatTime(num);
    },
    getUpgradeType(upgrade) {
      return upgrade.dataObject.effect.func;
    },
    getResource(id) {
      return this.gameData.resourceById(id);
    },
    getEffectDescription(upgrade) {
      switch (this.getUpgradeType(upgrade)) {
        case "addMultiplier":
          return "Multiplies resource gains:";
        default:
          return "Does something?";
      }
    },
  },
}
</script>