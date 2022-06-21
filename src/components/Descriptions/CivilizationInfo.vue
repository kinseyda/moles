<template>
  <div>
    <p>
      <b>{{ civilization?.name }}</b> exports:
    </p>
    <ul>
      <li v-for="id in Object.keys(civilization?.resourceRates)" :key="id">
        <colored-resource :resData="getResource(Number(id))"> </colored-resource>:
        <span class="good-text">
          {{ formatNumber(civilization?.resourceRates[id])
          }}<small class="good-text"> Mo/s</small>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { formatNumber } from "@/components/format";
import { defineComponent } from "vue";
import Civilization from "@/model/civilization";
import { resourceDataDict } from "@/content/resource-data";
import ColoredResource from "@/components/ColoredResource.vue";
export default defineComponent({
  name: "CivilizationInfo",
  props: { civilization: Civilization },
  components: {
    ColoredResource,
  },
  methods: {
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    getResource(id: number) {
      return resourceDataDict[id];
    },
  },
});
</script>
<style scoped>
ul {
  columns: 2;
  list-style-type: none;
}
</style>
