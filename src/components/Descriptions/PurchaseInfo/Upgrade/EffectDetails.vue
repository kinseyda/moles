<template>
  <div>
    <li>
      <p>{{ detailedDesc }}</p>
      <multiply-effect
        v-if="upgradeType == 'multiplier'"
        v-bind:effect="effect"
      ></multiply-effect>
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MultiplyEffect from "./MultiplyEffect.vue";
export default defineComponent({
  name: "EffectDetails",
  components: {
    MultiplyEffect,
  },
  props: {
    upgradeType: String,
    effect: Object,
    detailedDesc: String,
  },
  methods: {},
});
</script>
