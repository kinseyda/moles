<template>
    <div><h4>Effect</h4><p>{{ detailedDesc }}</p><multiply-effect v-if="upgradeType=='addMultiplier'" 
  v-bind:effect="effect"></multiply-effect></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MultiplyEffect from "./MultiplyEffect.vue"
export default defineComponent({
  name: 'EffectDetails',
  components: {
    MultiplyEffect
  },
  props: {
    upgradeType: String, effect: Object, detailedDesc: String
  },
  methods: {},
});
</script>