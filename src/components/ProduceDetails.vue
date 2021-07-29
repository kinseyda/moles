<template>
    <div><h4>Production:</h4><ul><li v-for="id in Object.keys(structure.dataObject.production)" :key="id">
    <p>{{ getResource(id).dataObject.name }}: {{ formatNumber(structure.dataObject.production[id]) }} m/s</p></li></ul></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {formatNumber} from "../js/utils"
import {mapState} from "vuex"
export default defineComponent({
  name: 'ProduceDetails',
  props: ["structure"],
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