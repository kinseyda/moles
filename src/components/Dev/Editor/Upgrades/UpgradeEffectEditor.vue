<template>
  <tr class="list-row">
    <td>
      <small>Edit Effect (parameters used)</small>
      <select v-model="upgradeEffect.func">
        <option
          v-for="item in upgradeStrings"
          :key="item"
          :value="Number(UpgradeTypes[item])"
        >
          {{ Number(UpgradeTypes[item]) }}/{{ item }}
        </option>
      </select>
    </td>
    <td>
      <small>Edit Parameters Object </small>
      <select v-model="selectedParams">
        <option
          v-for="item in upgradeStrings"
          :key="item"
          :value="Number(UpgradeTypes[item])"
        >
          {{ Number(UpgradeTypes[item]) }}/{{ item }}
        </option>
      </select>
      <button @click="deleteParameters()">Delete parameters for above effect</button>
    </td>
    <td>
      <span id="set-params" v-if="selectedParams != -1">
        <span v-if="selectedParams == UpgradeTypes.multiplier">
          <resource-to-num-selector
            v-model="upgradeEffect.params[UpgradeTypes.multiplier]"
          ></resource-to-num-selector>
        </span>
        <span v-if="selectedParams == UpgradeTypes.unlock">
          <select v-model="upgradeEffect.params[UpgradeTypes.unlock]">
            <option v-for="(id, idName) in UnlockIDs" :key="id" :value="id">
              {{ id }}/{{ idName }}
            </option>
          </select>
        </span>
        <span v-if="selectedParams == UpgradeTypes.permanentUnlock">
          <select v-model="upgradeEffect.params[UpgradeTypes.permanentUnlock]">
            <option v-for="(idName, id) in PermanentUnlockStrings" :key="id" :value="id">
              {{ id }}/{{ idName }}
            </option>
          </select>
        </span>
        <span v-if="selectedParams == UpgradeTypes.empireMultiplier">
          <input
            type="number"
            v-model="upgradeEffect.params[UpgradeTypes.empireMultiplier]"
          />
        </span>
        <span v-if="selectedParams == UpgradeTypes.digRate">
          <resource-to-num-selector
            v-model="upgradeEffect.params[UpgradeTypes.digRate]"
          ></resource-to-num-selector>
        </span>
        <span v-if="selectedParams == UpgradeTypes.none"> No params :)</span>
      </span>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UpgradeTypes } from "@/model/data-interfaces";
import {
  PermanentUnlocks,
  UnlockIDs,
  upgradeDataDict,
} from "@/content/upgrade-unlock-data";
import ResourceToNumSelector from "../ResourceToNumSelector.vue";
import { UpgradeDetails } from "@/model/data-interfaces";

export default defineComponent({
  name: "UpgradeEffectEditor",
  props: ["upgradeID", "effectIndex"],
  data() {
    return {
      upgradeEffect: upgradeDataDict[this.upgradeID].effects[this.effectIndex],
      UpgradeTypes: UpgradeTypes,
      UnlockIDs: UnlockIDs,
      PermanentUnlockStrings: Object.keys(PermanentUnlocks).filter((key) =>
        isNaN(Number(key))
      ) as (keyof typeof PermanentUnlocks)[],
      upgradeStrings: Object.keys(UpgradeTypes).filter((key) =>
        isNaN(Number(key))
      ) as (keyof typeof UpgradeTypes)[],
      selectedParams: -1,
    };
  },
  components: { ResourceToNumSelector },
  methods: {
    deleteParameters() {
      this.upgradeEffect.params[this.selectedParams as keyof UpgradeDetails] = undefined;
    },
  },
});
</script>

<style scoped>
td {
  min-width: 25ch;
  max-width: 25ch;
}
select {
  width: 20ch;
  border: 1px solid var(--text-color);
  margin: 1ch;
}
</style>
