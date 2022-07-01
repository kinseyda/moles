<template>
  <div>
    <li>
      <p>{{ detailedDesc }}</p>
      <multiply-effect
        v-if="upgradeType == UpgradeEffects.multiplier"
        v-bind:effect="effect"
      >
      </multiply-effect>
      <unlock-effect v-if="upgradeType == UpgradeEffects.unlock" v-bind:effect="effect">
      </unlock-effect>
      <dig-rate-effect
        v-if="upgradeType == UpgradeEffects.digRate"
        v-bind:effect="effect"
      >
      </dig-rate-effect>
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UpgradeEffects } from "@/content/data-interfaces";
import MultiplyEffect from "./MultiplyEffect.vue";
import UnlockEffect from "./UnlockEffect.vue";
import DigRateEffect from "./DigRateEffect.vue";
export default defineComponent({
  name: "EffectDetails",
  data() {
    return {
      UpgradeEffects: UpgradeEffects,
    };
  },
  components: {
    MultiplyEffect,
    UnlockEffect,
    DigRateEffect,
  },
  props: {
    upgradeType: Number,
    effect: Object,
    detailedDesc: String,
  },
  methods: {},
});
</script>
