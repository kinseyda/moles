<template>
  <div>
    <div class="desc-side" id="cost-container">
      <h4>Cost</h4>
      <ul>
        <li>
          <h4 v-if="purchase._class === structureEnum">
            Area: {{ purchase.dataObject.areaCost }}
          </h4>
        </li>
        <CostBullet
          v-for="id in Object.keys(purchase.dataObject.cost)"
          :key="id"
          :resource="getResource(id)"
          :cost="purchase.trueCost(id)"
        >
        </CostBullet>
      </ul>
    </div>
    <div class="desc-side" id="effect-produce-container">
      <produce-details
        v-if="purchase._class === structureEnum"
        v-bind:structure="purchase"
      ></produce-details>
      <effect-details
        v-if="purchase._class === upgradeEnum"
        v-bind:effect="purchase.dataObject.effect"
        v-bind:detailedDesc="getEffectDescription(purchase)"
        v-bind:upgradeType="getUpgradeType(purchase)"
      ></effect-details>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProduceDetails from "./ProduceDetails.vue";
import EffectDetails from "./EffectDetails.vue";
import CostBullet from "./CostBullet.vue";
import { formatNumber, formatTime } from "@/components/format";
import Upgrade from "@/model/upgrades";
import { game } from "@/model/game";
import { SerializableClasses } from "@/model/serializableClass";

export default defineComponent({
  name: "PurchaseInformation",
  props: ["purchase"],
  data() {
    return {
      gameData: game,
      upgradeEnum: SerializableClasses.Upgrade,
      structureEnum: SerializableClasses.Structure,
    };
  },
  components: {
    ProduceDetails,
    EffectDetails,
    CostBullet,
  },
  methods: {
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    formatTime(num: number) {
      return formatTime(num);
    },
    getUpgradeType(upgrade: Upgrade) {
      return upgrade.dataObject.effect.func;
    },
    getResource(id: number) {
      return this.gameData.resourceDict[id];
    },
    getEffectDescription(upgrade: Upgrade) {
      switch (this.getUpgradeType(upgrade)) {
        case "addMultiplier":
          return "Multiplies resource gains:";
        default:
          return "Does something?";
      }
    },
  },
});
</script>
<style>
.desc-side {
  width: 50%;
}
#cost-container {
  float: left;
}
#effect-produce-container {
  float: right;
}
ul {
  padding-left: 1.2em;
}
</style>