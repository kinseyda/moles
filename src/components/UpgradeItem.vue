<template>
    <tr class="list-row clickable" @mouseover="purchaseHover(upgrade)" @mouseleave="resetDescription" @click="buyUpgrade(upgrade)"><td>{{ upgrade.dataObject.name }}</td></tr>
</template>

<script>
import { mapMutations } from 'vuex'
import {formatNumber} from '../js/utils'
export default {
  name: 'UpgradeItem',
  props: ["upgrade"],
  methods: {
    ...mapMutations(['hoverDesc']),
    formatNumber(num) {
      return formatNumber(num);
    },
    purchaseHover(upgrade) {
      this.hoverDesc(upgrade)
    },
    resetDescription() {
      this.hoverDesc(undefined)
    },
    buyUpgrade(upgrade) {
      upgrade.buy();
    },
  },
}
</script>
