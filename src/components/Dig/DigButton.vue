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
      <p
        :style="[
          area.amount < area.getUsableArea()
            ? { 'font-size': 'xxx-large', 'font-weight': 'bold' }
            : {},
        ]"
        id="dig-text"
      >
        Dig
      </p>
      <particle-producer ref="digButtonDirtProd"></particle-producer>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import ParticleProducer from "@/components/Particles/ParticleProducer.vue";
import { getColorCumulProbs } from "@/components/Particles/ParticleProducer.vue";
import { game } from "@/model/game";

export default defineComponent({
  name: "DigButton",
  props: ["dig", "area"],
  components: {
    ParticleProducer,
  },
  emits: ["setDigging"],
  methods: {
    ...mapMutations(["hoverDescDig", "resetDesc"]),
    updateParticles() {
      if (this.dig.digging) {
        const curDiggingRates: { [resId: number]: number } = {};
        for (const resIdStr in this.dig.digRates) {
          const resId = Number(resIdStr);
          if (game.resourceDict[resId].amount < game.resourceDict[resId].cap) {
            curDiggingRates[resId] = this.dig.digRates[resId];
          }
        }
        if (Object.keys(curDiggingRates).length > 0) {
          (this.$refs["digButtonDirtProd"] as typeof ParticleProducer).updateParticles(
            4,
            getColorCumulProbs(curDiggingRates)
          );
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
#dig-text {
  transition: all 1s ease;
}
</style>
