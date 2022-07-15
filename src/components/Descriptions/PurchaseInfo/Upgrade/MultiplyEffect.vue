<template>
  <div>
    <ul>
      <li v-for="id in Object.keys(effect.params[UpgradeTypes.multiplier])" :key="id">
        <p>
          <colored-resource :resData="getResource(id).dataObject"></colored-resource>:
          <span class="good-text">+{{ formatNumber(effect.params[0][id] * 100) }}%</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { game } from "@/model/game";
import { UpgradeTypes } from "@/model/data-interfaces";
import { defineComponent } from "vue";
import { formatNumber } from "@/components/format";
import ColoredResource from "@/components/ColoredResource.vue";
export default defineComponent({
  name: "MultiplyEffect",
  data() {
    return {
      UpgradeTypes: UpgradeTypes,
    };
  },
  props: {
    effect: Object,
    detailedDesc: String,
  },
  components: { ColoredResource },
  methods: {
    formatNumber(num: number) {
      return formatNumber(num);
    },
    getResource(id: number) {
      return game.resourceDict[id];
    },
  },
});
</script>
<style scoped>
ul {
  list-style-type: none;
}
</style>
