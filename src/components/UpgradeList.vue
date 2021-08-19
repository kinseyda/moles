<template>
  <div id="outer">
    <h4>Upgrades:</h4>
    <div id="upgrades">
      <table>
        <upgrade-item
          v-for="item in visibleUpgrades"
          v-bind:upgrade="item"
          v-bind:key="item.id"
        ></upgrade-item>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Upgrade from "@/model/upgrades";
import { defineComponent } from "vue";
import UpgradeItem from "./UpgradeItem.vue";
export default defineComponent({
  name: "UpgradeList",
  props: ["upgradeDict"],
  components: {
    UpgradeItem,
  },
  computed: {
    visibleUpgrades() {
      let lst: Upgrade[] = [];
      for (const id in this.upgradeDict) {
        if (!this.upgradeDict[id].bought) {
          lst.push(this.upgradeDict[id]);
        }
      }
      return lst;
    },
  },
});
</script>
<style scoped>
#outer {
  height: 20%;
}
#upgrades {
  height: calc(100% - 1em);
  overflow-y: auto;
}
</style>