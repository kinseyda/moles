<template>
    <div><h4>Production:</h4><ul><li v-for="id in Object.keys(structure.dataObject.production)" :key="id">
    <p>{{ getResource(id).dataObject.name }}: {{ formatNumber(structure.dataObject.production[id]) }} m/s</p></li></ul></div>
</template>

<script>
import {formatNumber} from "../js/utils"
import {mapState} from "vuex"
export default {
  name: 'ProduceDetails',
  props: ["structure"],
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