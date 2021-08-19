<template>
  <tr class="list-row">
    <td @mouseover="hoverDescIdentifiable(resource)" @mouseleave="resetDesc()">
      {{ resource.dataObject.name }}:
    </td>
    <td>{{ formatNumber(resource.amount) }}</td>
    <td>/</td>
    <td>{{ formatNumber(resource.cap) }}</td>
    <td>{{ formatNumber(resource.trueRate) }} m/s</td>
    <td v-if="resource.id !== 0">
      <input
        @mouseover="hoverDescString(capDesc)"
        @mouseleave="resetDesc()"
        type="range"
        min="0"
        max="10"
        value="1"
        @input="$emit('update:sliderVal', $event.target.value)"
      />
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { formatNumber } from "./format";
import { uiDescriptions } from "../uiDescriptions";

export default defineComponent({
  name: "ResourceItem",
  props: ["resource"],
  emits: ["update:sliderVal"],
  data() {
    return {
      capDesc: uiDescriptions["capSliders"],
      sliderVal: "1",
    };
  },
  methods: {
    ...mapMutations(["hoverDescIdentifiable", "hoverDescString", "resetDesc"]),
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    getCap() {
      return this.resource.cap;
    },
  },
});
</script>
<style scoped>
td {
  width: 7ch;
  padding-left: 0.5ch;
}
td:nth-child(1) {
  /* Name */
  width: 8ch;
}
td:nth-child(3) {
  /* Slash */
  width: 1ch;
}
td:nth-child(5) {
  /* Rate */
  width: 11ch;
}
</style>
