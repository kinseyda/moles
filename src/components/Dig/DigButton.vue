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
      <particle-producer ref="dirtProd"></particle-producer>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import ParticleProducer from "@/components/Particles/ParticleProducer.vue";
import { resourceDataDict } from "@/content/resource-data";
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
        let sum = 0;
        const diggingResources: number[] = [];
        for (const resIdStr in this.dig.digRates) {
          const resId = Number(resIdStr);
          if (game.resourceDict[resId].amount < game.resourceDict[resId].cap) {
            diggingResources.push(resId);
            sum += this.dig.digRates[resId];
          }
        }
        if (diggingResources.length > 0) {
          const cumulLst: { weight: number; color: string }[] = [];
          let cumul = 0;
          for (const resId of diggingResources) {
            cumul += this.dig.digRates[resId] / sum;
            cumulLst.push({
              color: resourceDataDict[resId].color,
              weight: cumul,
            });
          }
          (this.$refs["dirtProd"] as typeof ParticleProducer).updateParticles(
            4,
            cumulLst
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
</style>
