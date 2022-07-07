<template>
  <ul>
    <li v-if="getUnlockData().resources.length">
      Resource{{ getUnlockData().resources.length > 1 ? "s" : "" }}:
      <span v-for="(res, index) in getUnlockData().resources" :key="res"
        ><colored-resource :resData="getResourceData(res)"></colored-resource
        ><span v-if="index != getUnlockData().resources.length - 1">, </span></span
      >
    </li>
    <li v-if="getUnlockData().structures.length">
      Structure{{ getUnlockData().structures.length > 1 ? "s" : "" }}:
      <span v-for="(struc, index) in getUnlockData().structures" :key="struc"
        >{{ getStructureData(struc).name }}
        <span v-if="index != getUnlockData().structures.length - 1">, </span></span
      >
    </li>
    <li v-if="getUnlockData().expansions.length">
      Expansion{{ getUnlockData().expansions.length > 1 ? "s" : "" }}:
      <span v-for="(exp, index) in getUnlockData().expansions" :key="exp"
        >{{ getExpansionData(exp).name }}
        <span v-if="index != getUnlockData().expansions.length - 1">, </span></span
      >
    </li>
    <li v-if="getUnlockData().upgrades.length">
      Upgrade{{ getUnlockData().upgrades.length > 1 ? "s" : "" }}:
      <span v-for="(upg, index) in getUnlockData().upgrades" :key="upg"
        >{{ getUpgradeData(upg).name
        }}<span v-if="index != getUnlockData().upgrades.length - 1">, </span></span
      >
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatNumber } from "@/components/format";
import ColoredResource from "@/components/ColoredResource.vue";
import { resourceDataDict } from "@/content/resource-data";
import { structureDataDict } from "@/content/structure-data";
import { expansionDataDict } from "@/content/expansion-data";
import { unlockDataDict, upgradeDataDict } from "@/content/upgrade-unlock-data";
export default defineComponent({
  name: "UnlockEffect",
  props: {
    effect: Object,
    detailedDesc: String,
  },
  components: { ColoredResource },
  methods: {
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    getResourceData(id: number) {
      return resourceDataDict[id];
    },
    getUnlockData() {
      if (this.effect) {
        return unlockDataDict[this.effect.params[0]];
      }
    },
    getUpgradeData(id: number) {
      return upgradeDataDict[id];
    },
    getStructureData(id: number) {
      return structureDataDict[id];
    },
    getExpansionData(id: number) {
      return expansionDataDict[id];
    },
  },
});
</script>
<style scoped></style>
