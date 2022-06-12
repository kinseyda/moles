<template>
  <div>
    <li>
      <p>{{ detailedDesc }}</p>
      <multiply-effect
        v-if="upgradeType == UpgradeEffects.multiplier"
        v-bind:effect="effect"
      ></multiply-effect>
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UpgradeEffects } from "@/content/data-interfaces";
import MultiplyEffect from "./MultiplyEffect.vue";
export default defineComponent({
  name: "EffectDetails",
  data() {
    return {
      UpgradeEffects: UpgradeEffects,
    };
  },
  components: {
    MultiplyEffect,
  },
  props: {
    upgradeType: Number,
    effect: Object,
    detailedDesc: String,
  },
  methods: {},
});
</script>
