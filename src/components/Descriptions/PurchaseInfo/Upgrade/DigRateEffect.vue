<template>
  <div>
    <ul>
      <li v-for="id in Object.keys(effect.params[0])" :key="id">
        <p>
          <colored-resource :resData="getResourceData(id)"></colored-resource>:
          <span class="good-text"
            >+{{ formatNumber(effect.params[0][id])
            }}<small class="good-text"> Mo/s</small></span
          >
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatNumber } from "@/components/format";
import ColoredResource from "@/components/ColoredResource.vue";
import { resourceDataDict } from "@/content/resource-data";
export default defineComponent({
  name: "DigRateEffect",
  props: {
    effect: Object,
    detailedDesc: String,
  },
  components: { ColoredResource },
  methods: {
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    getResourceData(id: number) {
      return resourceDataDict[id];
    },
  },
});
</script>
<style scoped>
ul {
  list-style-type: none;
}
</style>
