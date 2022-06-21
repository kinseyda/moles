<template>
  <basic-particle
    :particle="posParticle.particle"
    :style="{
      top: posParticle.baseY,
      left: posParticle.baseX,
    }"
  >
  </basic-particle>
</template>

<script lang="ts">
import { Particle } from "./BasicParticle.vue";
import BasicParticle from "./BasicParticle.vue";

export class PositionedParticle {
  baseX: string;
  baseY: string;
  particle: Particle;
  constructor(baseX: number | string, baseY: number | string, color?: string) {
    if (typeof baseX === "number" && typeof baseY === "number") {
      this.baseX = baseX + "px";
      this.baseY = baseY + "px";
    } else {
      this.baseX = String(baseX);
      this.baseY = String(baseY);
    }

    this.particle = new Particle(color);
  }
}

import { defineComponent } from "vue";
export default defineComponent({
  name: "RenderedParticle",
  props: ["posParticle"],
  components: {
    BasicParticle,
  },
  data() {
    return {};
  },
});
</script>

<style scoped></style>
