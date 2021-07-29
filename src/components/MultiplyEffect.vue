<template>
    <div><ul><li v-for="id in Object.keys(effect.params[0])" :key="id">
    <p>{{ getResource(id).dataObject.name }}: +{{ formatNumber(effect.params[0][id]*100) }}%</p></li></ul></div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import {mapState} from  'vuex'
import {formatNumber} from "../js/utils"
export default defineComponent({
  name: 'MultiplyEffect',
  props: {
    effect: Object, detailedDesc: String
  },
  computed: mapState(['gameData']),
  methods: {
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    getResource(id: number) {
      return this.gameData.resourceById(id);
    },
  },
});
</script>