<template>
  <div id="outer" v-if="Object.keys(upgradeDict).length > 0">
    <h2
      @mouseover="hoverDescString(uiDescriptions['upgrades'])"
      @mouseleave="resetDesc()"
    >
      {{ showPrev ? "Previous" : "" }} Upgrades:
    </h2>
    <div id="upgrades">
      <table>
        <upgrade-item
          v-for="item in visibleUpgrades(showPrev)"
          v-bind:upgrade="item"
          v-bind:key="item.id"
        ></upgrade-item>
      </table>
    </div>
    <button
      @mouseover="hoverDescString(uiDescriptions['prevUpgrades'])"
      @mouseleave="resetDesc()"
      @click="showPrev = !showPrev"
      v-if="visibleUpgrades(!showPrev).length > 0 || showPrev"
    >
      {{ showPrev ? "Hide" : "Show" }} previously bought upgrades
    </button>
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
      showPrev: false,
    };
  },
  computed: {},
  methods: {
    ...mapMutations(["hoverDescString", "resetDesc"]),
    visibleUpgrades(prev: boolean) {
      let lst: Upgrade[] = [];
      for (const id in this.upgradeDict) {
        if (prev == this.upgradeDict[id].bought) {
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
  height: 25%;
  display: flex;
  flex-direction: column;
}
#upgrades {
  height: calc(100% - 2em);
  overflow-y: auto;
}
</style>
