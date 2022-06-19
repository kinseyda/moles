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
    <dirt-producer ref="dirtProd"></dirt-producer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import DirtProducer from "./DirtProducer.vue";

export default defineComponent({
  name: "DigButton",
  props: ["dig", "area"],
  components: {
    DirtProducer,
  },
  emits: ["setDigging"],
  methods: {
    ...mapMutations(["hoverDescDig", "resetDesc"]),
    updateParticles() {
      if (this.dig.digging) {
        (this.$refs["dirtProd"] as typeof DirtProducer).updateParticles();
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
