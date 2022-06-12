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
      ></effect-details>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EffectDetails from "./EffectDetails.vue";
export default defineComponent({
  name: "EffectsContainer",
  components: {
    EffectDetails,
  },
  props: {
    effects: Object,
  },
  methods: {
    getEffectDescription(ef: String) {
      switch (ef) {
        case "multiplier":
          return "Multiplies resource gains:";
        case "unlock":
          return "Unlocks something";
        default:
          return "Does something?";
      }
    },
  },
});
</script>
