<template>
    <div><h4>Effect</h4><p>{{ detailedDesc }}</p><multiply-effect v-if="upgradeType=='addMultiplier'" 
  v-bind:effect="effect"></multiply-effect></div>
</template>

<script>
import MultiplyEffect from "./MultiplyEffect.vue"
export default {
  name: 'EffectDetails',
  components: {
    MultiplyEffect
  },
  props: {
    upgradeType: String, effect: Object, detailedDesc: String
  },
  methods: {},
}
</script>