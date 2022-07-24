<template>
  <span
    class="circle"
    :style="{
      'background-color': particle.color,
    }"
  >
  </span>
</template>

<script lang="ts">
import { resourceDataDict, ResourceIDs } from "@/content/resource-data";

export class Particle {
  color: string;
  constructor(color?: string) {
    if (color) {
      this.color = color;
    } else {
      this.color = resourceDataDict[ResourceIDs.dirt].color;
    }
  }
}

import { defineComponent } from "vue";

export default defineComponent({
  name: "BasicParticle",
  props: ["particle"],
  data() {
    return {};
  },
});
</script>

<style scoped>
.circle {
  height: 6px;
  width: 6px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
}
</style>
