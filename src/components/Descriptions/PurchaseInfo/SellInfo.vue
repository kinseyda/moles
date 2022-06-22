<template>
  <b v-if="!structure.canSell()">Unavailable</b>
  <div v-if="structure.canSell()">
    <div id="refund-container" class="half-side">
      <h4>Refund:</h4>
      <ul>
        <li><b>Area:</b> {{ structure.dataObject.areaCost }}</li>
        <li
          v-for="resId in Object.keys(structure.dataObject.cost)"
          :key="resId"
        >
          {{ getResourceData(resId).name }}:
          <span class="good-text"
            >+{{ formatNumber(structure.sellFor(resId))
            }}<small class="good-text"> Mo</small></span
          >
        </li>
      </ul>
    </div>
    <div id="effect-container" class="half-side">
      <h4>Result:</h4>
      <b>{{ structure.dataObject.name }}</b
      >s <span class="bad-text">-1</span>
    </div>
  </div>
</template>

<script lang="ts">
import { formatNumber } from "@/components/format";
import { defineComponent } from "vue";
import { resourceDataDict } from "@/content/resource-data";
import { game } from "@/model/game";
import { SerializableClasses } from "@/model/serializable-class";

export default defineComponent({
  name: "SellInfo",
  props: ["structure"],
  data() {
    return {
      gameData: game,
      upgradeEnum: SerializableClasses.Upgrade,
      structureEnum: SerializableClasses.Structure,
      expansionEnum: SerializableClasses.Expansion,
    };
  },
  methods: {
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    getResourceData(resId: number) {
      return resourceDataDict[resId];
    },
  },
});
</script>
<style scoped>
.half-side {
  width: 48%;
}
#refund-container {
  float: left;
}
#effect-container {
  float: right;
}
</style>
