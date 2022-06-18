<template>
  <button
    @mouseover="hoverDescIdentifiable(expansion)"
    @mouseleave="resetDesc()"
    @click="expansion.buy()"
  >
    <span :class="{ 'purchase-available': expansion.canBuy }"
      >Buy {{ expansion.dataObject.name }}</span
    >
    <br />
    <p>Amount: {{ expansion.amount }}</p>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";

export default defineComponent({
  name: "ExpansionItem",
  props: ["expansion"],
  methods: {
    ...mapMutations(["hoverDescIdentifiable", "resetDesc"]),
  },
});
</script>
<style scoped>
button {
  flex: 1 0 0;
  width: 100%;
}
</style>
