<template>
  <ul>
    <li v-if="getUnlockData().structures.length">
      Structure{{ getUnlockData().structures.length > 1 ? "s" : "" }}:
      <span v-for="struc in getUnlockData().structures" :key="struc">{{
        getStructureData(struc).name
      }}</span>
    </li>
    <li v-if="getUnlockData().resources.length">
      Resource{{ getUnlockData().resources.length > 1 ? "s" : "" }}:
      <span v-for="res in getUnlockData().resources" :key="res">{{
        getResourceData(res).name
      }}</span>
    </li>
    <li v-if="getUnlockData().expansions.length">
      Expansion{{ getUnlockData().expansions.length > 1 ? "s" : "" }}:
      <span v-for="exp in getUnlockData().expansions" :key="exp">{{
        getExpansionData(exp).name
      }}</span>
    </li>
    <li v-if="getUnlockData().upgrades.length">
      Upgrade{{ getUnlockData().upgrades.length > 1 ? "s" : "" }}:
      <span v-for="upg in getUnlockData().upgrades" :key="upg">{{
        getUpgradeData(upg).name
      }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatNumber } from "@/components/format";
import ColoredResource from "@/components/ColoredResource.vue";
import { resourceDataDict } from "@/content/resource-data";
import { upgradeDataDict, unlockDataDict } from "@/content/upgrade-data";
import { structureDataDict } from "@/content/structure-data";
import { expansionDataDict } from "@/content/expansion-data";
import { UnlockData } from "@/model/serializable-classes";
export default defineComponent({
  name: "UnlockEffect",
  props: {
    effect: Object,
    detailedDesc: String,
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { ColoredResource },
  methods: {
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    getResourceData(id: number) {
      return resourceDataDict[id];
    },
    getUnlockData(): UnlockData {
      return unlockDataDict[this.effect.params[0]];
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
