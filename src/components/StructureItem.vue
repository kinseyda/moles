<template>
    <tr class="list-row clickable" @mouseover="purchaseHover(structure)" @mouseleave="resetDescription" @click="buyStructure(structure)"><td 
                :class="{'purchase-available': structure.canBuy}">{{ structure.dataObject.name }}</td><td>{{ formatNumber(structure.amount) }}</td> </tr>
</template>

<script>
import {mapMutations} from  'vuex'
import {formatNumber} from "../js/utils"
export default {
  name: 'StructureItem',
  props: ["structure"],
  methods: {
    ...mapMutations(['hoverDesc']),
    formatNumber(num) {
      return formatNumber(num);
    },
    purchaseHover(structure) {
      this.hoverDesc(structure)
    },
    resetDescription() {
      this.hoverDesc(undefined)
    },
    buyStructure(structure) {
      structure.buy();
    },
  },
}
</script>