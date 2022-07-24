<template>
  <pop-up-menu>
    <template #title>Unlock Tree</template>
    <template #content>
      <div id="content-outer">
        <unlock-item :unlockTreeItem="getUpgradeUnlockTree()"></unlock-item>
      </div>
    </template>
  </pop-up-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import PopUpMenu from "@/components/PopUpMenu.vue";
import UnlockItem from "./UnlockItem.vue";
import {
  UpgradeIDs,
  upgradeDataDict,
  unlockDataDict,
} from "../../../content/upgrade-unlock-data";
import { UpgradeTypes } from "../../../model/data-interfaces";

export interface UnlockTreeItem {
  name: string;
  children: UnlockTreeItem[];
}

export default defineComponent({
  name: "UnlockTree",
  props: ["upgradeDataDict", "unlockDataDict"],
  data() {
    return {};
  },
  components: {
    PopUpMenu,
    UnlockItem,
  },
  methods: {
    ...mapMutations(["togglePopupOpen"]),
    getUpgradeUnlockTree(curId?: number): UnlockTreeItem {
      if (curId === undefined) {
        curId = UpgradeIDs.ExamineDirt;
      }
      const ret: UnlockTreeItem = {
        name: upgradeDataDict[curId].name,
        children: [],
      };
      const unlockEffect = upgradeDataDict[curId].effects.find(
        (a) => a.func == UpgradeTypes.unlock
      );
      if (unlockEffect !== undefined) {
        unlockDataDict[
          unlockEffect.params[UpgradeTypes.unlock]!
        ].upgrades.forEach((curr) => ret.children.push(this.getUpgradeUnlockTree(curr)));
      }
      return ret;
    },
  },
});
</script>

<style scoped>
#content-outer {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}
</style>
