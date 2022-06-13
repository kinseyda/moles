<template>
  <div id="outer">
    <h2
      @mouseover="hoverDescString(uiDescriptions['upgrades'])"
      @mouseleave="resetDesc()"
    >
      {{ showPrev ? "Previous" : "" }} Upgrades:
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
    <button @click="showPrev = !showPrev">
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
  computed: {
    visibleUpgrades() {
      let lst: Upgrade[] = [];
      for (const id in this.upgradeDict) {
        if (this.showPrev == this.upgradeDict[id].bought) {
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
  display: flex;
  flex-direction: column;
}
#upgrades {
  height: calc(100% - 2em);
  overflow-y: auto;
}
</style>
