UpgradeTypes
<template>
  <div>
    <h4>Effects</h4>
    <ul>
      <effect-details
        v-for="effect in effects"
        :key="effect"
        :effect="effect"
        :upgradeType="effect.func"
        :detailedDesc="getEffectDescription(effect.func)"
      >
      </effect-details>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UpgradeTypes } from "@/model/data-interfaces";
import EffectDetails from "./EffectDetails.vue";
export default defineComponent({
  name: "EffectsContainer",
  data() {
    return { UpgradeEffects: UpgradeTypes };
  },
  components: {
    EffectDetails,
  },
  props: {
    effects: Object,
  },
  methods: {
    getEffectDescription(ef: number) {
      switch (ef) {
        case UpgradeTypes.multiplier:
          return "Multiplies resource gains:";
        case UpgradeTypes.unlock:
          return "Unlocks:";
        case UpgradeTypes.permanentUnlock:
          return "Grants a new ability";
        case UpgradeTypes.digRate:
          return "Allows resources to be gathered while digging:";
        default:
          return "Does something?";
      }
    },
  },
});
</script>
