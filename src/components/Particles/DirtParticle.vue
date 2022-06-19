<template>
  <span
    class="circle"
    :style="{
      top: dirtParticle.baseY + 'px',
      left: dirtParticle.baseX + 'px',
    }"
  ></span>
</template>

<script lang="ts">
export interface Particle {
  baseX: number;
  baseY: number;
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
  background-color: #915a30;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
}
</style>
