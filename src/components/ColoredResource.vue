<template>
  <span id="container">
    <basic-particle id="particle" :particle="particle"> </basic-particle>
    <span id="text">
      {{ resData.name }}
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BasicParticle from "@/components/Particles/BasicParticle.vue";
import { Particle } from "@/components/Particles/BasicParticle.vue";

export default defineComponent({
  name: "ColoredResource",
  props: ["resData"],
  components: {
    BasicParticle,
  },
  data() {
    return {
      particle: new Particle(this.resData.color),
    };
  },
});
</script>

<style scoped>
#container {
  position: relative;
}
#particle {
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}
#text {
  margin-left: 1.5ch;
}
</style>
