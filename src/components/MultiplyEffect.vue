<template>
    <div><ul><li v-for="id in Object.keys(effect.params[0])" :key="id">
    <p>{{ getResource(id).dataObject.name }}: +{{ formatNumber(effect.params[0][id]*100) }}%</p></li></ul></div>
</template>


<script>
import {mapState} from  'vuex'
import {formatNumber} from "../js/utils"
export default {
  name: 'MultiplyEffect',
  props: {
    effect: Object, detailedDesc: String
  },
  computed: mapState(['gameData']),
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
    getResource(id) {
      return this.gameData.resourceById(id);
    },
  },
}
</script>