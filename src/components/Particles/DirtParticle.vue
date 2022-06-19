<template>
  <span
    class="circle"
    :style="{
      top: dirtParticle.baseY + 'px',
      left: dirtParticle.baseX + 'px',
      'background-color': dirtParticle.color,
    }"
  ></span>
</template>

<script lang="ts">
import { resourceDataDict, ResourceIDs } from "@/content/resource-data";

export class Particle {
  baseX: number;
  baseY: number;
  color: string;
  constructor(baseX: number, baseY: number, color?: string) {
    this.baseX = baseX;
    this.baseY = baseY;
    if (color) {
      this.color = color;
    } else {
      this.color = resourceDataDict[ResourceIDs.Dirt].color;
    }
  }
}

import { defineComponent } from "vue";
export default defineComponent({
  name: "DirtParticle",
  props: ["dirtParticle"],
  data() {
    return {};
  },
});
</script>

<style scoped>
.circle {
  height: 7px;
  width: 7px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
}
</style>
