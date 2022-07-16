<template>
  <input
    class="slider"
    type="range"
    :min="min"
    :max="max"
    :value="startingValue"
    @input="$emit('slider-val', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uiDescriptions } from "./ui-descriptions";

export default defineComponent({
  name: "SliderInput",
  props: ["min", "max", "startingValue"],
  data() {
    return {
      uiDescriptions: uiDescriptions,
    };
  },
  methods: {},
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
input[type="range"]::-moz-range-track {
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
input[type="range"]::-moz-range-thumb {
  border: 1px solid var(--text-color);
  height: 1.25em;
  width: 1.25em;
  border-radius: 0.625em;
  background: var(--global-bg-color);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -0.45em;
}
</style>
