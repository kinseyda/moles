<template>
  <div id="outer">
    <button
      id="dig-button"
      @mouseleave="resetDesc()"
      @mouseover="hoverDescDig()"
      @mousedown="$emit('setDigging', true)"
      @mouseup="$emit('setDigging', false)"
      :style="[
        dig.digging
          ? { background: 'var(--tertiary-bg-color)' }
          : { background: 'var(--global-bg-color)' },
      ]"
    >
      <h1
        v-if="area.amount != area.getUsableArea()"
        :style="[
          dig.digging
            ? { background: 'var(--tertiary-bg-color)' }
            : { background: 'var(--global-bg-color)' },
        ]"
      >
        Dig
      </h1>
      <p v-if="area.amount == area.getUsableArea()">Dig</p>
    </button>
    <transition-group name="slide-fade">
      <dig-particle v-for="p in particles" :key="p.baseX" :digParticle="p">
      </dig-particle>
    </transition-group>
  </div>
</template>

<script lang="ts">
interface Particle {
  baseX: number;
  baseY: number;
}

import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import DigParticle from "./DigParticle.vue";
export default defineComponent({
  name: "DigButton",
  props: ["dig", "area"],
  data() {
    return {
      particles: [] as Particle[],
    };
  },
  components: {
    DigParticle,
  },
  emits: ["setDigging"],
  methods: {
    ...mapMutations(["hoverDescDig", "resetDesc"]),
    updateParticles() {
      const buttonEl = document.getElementById("dig-button");
      if (buttonEl) {
        const width = buttonEl.clientWidth;
        const height = buttonEl.clientHeight;
        if (this.particles.length > 0) {
          this.particles = [];
        } else {
          if (this.dig.digging) {
            for (let i = 0; i < 8; i++) {
              const newPX = Math.random() * width;
              const newPY = Math.random() * height;
              this.particles.push({ baseX: newPX, baseY: newPY });
            }
          }
        }
      }
    },
  },
  mounted() {
    setInterval(this.updateParticles, 50);
  },
});
</script>

<style scoped>
#outer {
  width: 100%;
  flex: 1 1 0;
  position: relative;
}
#dig-button {
  font-size: xx-large;
  width: 100%;
  height: 100%;
}

.slide-fade-leave-active {
  transition: all 0.65s cubic-bezier(0.33333, 0, 0.66667, 0.33333);
}

.slide-fade-leave-to {
  transform: translateY(250px);
  opacity: 0;
}
</style>
