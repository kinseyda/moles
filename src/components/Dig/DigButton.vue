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
    <dig-particle v-for="p in particles" :key="p.baseX" :digParticle="p">
    </dig-particle>
  </div>
</template>

<script lang="ts">
interface Particle {
  baseX: number;
  baseY: number;
  age: number;
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

        for (const p of this.particles) {
          p.age += 0.5;
        }
        this.particles = this.particles.filter((p) => p.age < 24);
        if (this.dig.digging) {
          const newPX = Math.random() * width;
          const newPY = Math.random() * height;
          this.particles.push({ baseX: newPX, baseY: newPY, age: 0 });
        }
      }
    },
  },
  mounted() {
    setInterval(this.updateParticles, 16);
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
</style>
