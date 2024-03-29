<template>
  <transition-group name="slide-fade">
    <rendered-particle v-for="p in particles" :key="p.baseX" :posParticle="p">
    </rendered-particle>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PositionedParticle } from "./RenderedParticle.vue";
import RenderedParticle from "./RenderedParticle.vue";
import { resourceDataDict } from "@/content/resource-data";

export function getColorCumulProbs(resourceRateDict: {
  [resId: number]: number;
}): { weight: number; color: string }[] {
  let sum = 0;
  for (const resIdStr in resourceRateDict) {
    sum += resourceRateDict[Number(resIdStr)];
  }
  const cumulLst: { weight: number; color: string }[] = [];
  let cumul = 0;
  for (const resId in resourceRateDict) {
    cumul += resourceRateDict[resId] / sum;
    cumulLst.push({
      color: resourceDataDict[resId].color,
      weight: cumul,
    });
  }
  return cumulLst;
}

export default defineComponent({
  name: "ParticleProducer",
  props: [],
  data() {
    return {
      particles: [] as PositionedParticle[],
    };
  },
  components: {
    RenderedParticle,
  },
  methods: {
    /**
     * @param colorCumulProbs - Cumulative weights of every color that could be selected.
     * For example, if red were to have 50% chance, blue 30% and green 20% it should be:
     * [{weight: 0.5, color: red}, {weight: 0.8, color: blue}, {weight: 1, color: green}]
     */
    updateParticles(
      intensity?: number,
      colorCumulProbs?: { weight: number; color: string }[]
    ) {
      if (!intensity) {
        intensity = 1;
      }
      this.scatter(intensity, colorCumulProbs);
      // Vue will only render changes if the particles are onscreen for a non-zero amount of time
      setTimeout(() => this.fall(), 16);
    },
    scatter(intensity: number, colorCumulProbs?: { weight: number; color: string }[]) {
      for (let i = 0; i < intensity; i++) {
        const newPX = Math.random() * 100;
        const newPY = Math.random() * 100;
        if (colorCumulProbs) {
          const chosenProb = Math.random();
          let chosenColor = "";
          for (const prob of colorCumulProbs) {
            if (chosenProb < prob["weight"]) {
              chosenColor = prob["color"];
              break;
            }
          }
          this.particles.push(new PositionedParticle(newPX, newPY, chosenColor));
        } else {
          this.particles.push(new PositionedParticle(newPX, newPY));
        }
      }
    },
    fall() {
      this.particles = [];
    },
  },
  mounted() {},
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
