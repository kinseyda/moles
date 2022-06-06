<template>
  <div id="outer">
    <h2
      @mouseover="hoverDescString(uiDescriptions['upgrades'])"
      @mouseleave="resetDesc()"
    >
      Upgrades:
    </h2>
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
import Upgrade from "@/model/upgrade";
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { uiDescriptions } from "../ui-descriptions";
import UpgradeItem from "./UpgradeItem.vue";
export default defineComponent({
  name: "UpgradeList",
  props: ["upgradeDict"],
  components: {
    UpgradeItem,
  },
  data() {
    return {
      uiDescriptions: uiDescriptions,
    };
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
  methods: {
    ...mapMutations(["hoverDescString", "resetDesc"]),
  },
});
</script>
<style scoped>
#outer {
  height: 25%;
}
#upgrades {
  height: calc(100% - 1em);
  overflow-y: auto;
}
</style>