<template>
  <div>
    <div class="desc-side" id="cost-container">
      <h4>Cost:</h4>
      <b
        class="good-text"
        v-if="
          Object.keys(purchase.dataObject.cost).length == 0 &&
          (purchase.dataObject.areaCost === undefined ||
            purchasase.dataObject.areaCost == 0)
        "
        >No cost!</b
      >
      <ul>
        <li v-if="purchase._class === structureEnum">
          <h4>
            Area:
            <span class="bad-text"
              >{{ purchase.dataObject.areaCost }}<small class="bad-text"> Mo</small></span
            >
          </h4>
        </li>
        <cost-bullet
          v-for="id in Object.keys(purchase.dataObject.cost)"
          :key="id"
          :resourceId="Number(id)"
          :cost="purchase.trueCost(id)"
        >
        </cost-bullet>
      </ul>
    </div>
    <div class="desc-side" id="effect-produce-container">
      <produce-details
        v-if="purchase._class === structureEnum"
        v-bind:structure="purchase"
      ></produce-details>
      <effects-container
        v-if="purchase._class === upgradeEnum"
        v-bind:effects="purchase.dataObject.effects"
      ></effects-container>
      <expansion-details
        v-if="purchase._class === expansionEnum"
        v-bind:expansion="purchase"
      ></expansion-details>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProduceDetails from "./ProduceDetails.vue";
import EffectsContainer from "./Upgrade/EffectsContainer.vue";
import CostBullet from "./CostBullet.vue";
import { formatNumber, formatTime } from "@/components/format";
import { game } from "@/model/game";
import { SerializableClasses } from "@/model/serializable-class";
import ExpansionDetails from "./ExpansionDetails.vue";

export default defineComponent({
  name: "DescPurchaseInfo",
  props: ["purchase"],
  data() {
    return {
      gameData: game,
      upgradeEnum: SerializableClasses.Upgrade,
      structureEnum: SerializableClasses.Structure,
      expansionEnum: SerializableClasses.Expansion,
    };
  },
  components: {
    ProduceDetails,
    EffectsContainer,
    CostBullet,
    ExpansionDetails,
  },
  methods: {
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    formatTime(num: number) {
      return formatTime(num);
    },
    getResource(id: number) {
      return this.gameData.resourceDict[id];
    },
  },
});
</script>
<style scoped>
.desc-side {
  width: 48%;
}
#cost-container {
  float: left;
}
#effect-produce-container {
  float: right;
}
ul {
  list-style-type: none;
}
</style>
