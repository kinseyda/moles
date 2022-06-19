<template>
  <transition-group name="slide-fade">
    <dirt-particle v-for="p in particles" :key="p.baseX" :dirtParticle="p">
    </dirt-particle>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DirtParticle from "./DirtParticle.vue";
import { Particle } from "./DirtParticle.vue";
export default defineComponent({
  name: "DirtProducer",
  props: ["immediate"],
  data() {
    return {
      particles: [] as Particle[],
    };
  },
  components: {
    DirtParticle,
  },
  methods: {
    updateParticles(intensity?: number) {
      if (!intensity) {
        intensity = 1;
      }
      this.scatter(intensity);
      // Vue will only render changes if the particles are onscreen for a non-zero amount of time
      setTimeout(() => this.fall(), 16);
    },
    scatter(intensity: number) {
      const p = this.$parent;
      if (p) {
        const parentHeight = p.$el.offsetHeight;
        const parentWidth = p.$el.offsetWidth;
        for (let i = 0; i < intensity; i++) {
          const newPX = Math.random() * parentWidth;
          const newPY = Math.random() * parentHeight;
          this.particles.push({ baseX: newPX, baseY: newPY });
        }
      }
    },
    fall() {
      this.particles = [];
    },
  },
  mounted() {
    if (this.immediate) {
      this.updateParticles();
    }
  },
});
</script>

<style scoped>
#outer {
  width: 100%;
  flex: 1 1 0;
  position: relative;
}

.slide-fade-leave-active {
  transition: all 0.65s cubic-bezier(0.33333, 0, 0.66667, 0.33333);
}

.slide-fade-leave-to {
  transform: translateY(250px);
  opacity: 0;
}
</style>
