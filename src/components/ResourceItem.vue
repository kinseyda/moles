<template>
  <tr class="list-row">
    <td @mouseover="hoverDescIdentifiable(resource)" @mouseleave="resetDesc()">
      {{ resource.dataObject.name }}:
    </td>
    <td>{{ formatNumber(resource.amount) }}</td>
    <td>/</td>
    <td>{{ formatNumber(resource.cap) }}</td>
    <td>{{ formatNumber(resource.trueRate) }} m/s</td>
    <td>
      <input
        @mouseover="hoverDescString(capDesc)"
        @mouseleave="resetDesc()"
        class="slider"
        :id="'slider' + resource.id"
        type="range"
        min="0"
        max="10"
        :value="resource.capPriority"
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
      sliderVal: "0",
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
  mounted() {
    this.$emit("update:sliderVal", 0);
  },
});
</script>
<style scoped>
input[type="range"] {
  height: 1em;
  -webkit-appearance: none;
  width: 100%;
  cursor: pointer;
  background: inherit;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 0.5em;
  background: var(--global-bg-color);
  border-radius: 0.25em;
  border: 1px solid var(--text-color);
}
input[type="range"]::-webkit-slider-thumb {
  border: 1px solid var(--text-color);
  height: 1.25em;
  width: 1.25em;
  border-radius: 0.625em;
  background: var(--global-bg-color);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -0.45em;
}

td {
  min-width: 6ch;
  padding-left: 0.5ch;
}
td:nth-child(1) {
  /* Name */
  min-width: 7ch;
}
td:nth-child(3) {
  /* Slash */
  min-width: 1ch;
}
td:nth-child(5) {
  /* Rate */
  min-width: 9ch;
}
td:nth-child(6) {
  /* Slider */
  min-width: 10ch;
}
</style>
