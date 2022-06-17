<template>
  <span
    class="circle"
    :style="{
      top: digParticle.baseY + digParticle.age ** 2 + 'px',
      left: digParticle.baseX + 'px',
      opacity: (24 - digParticle.age) / 24,
    }"
  ></span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DigParticle",
  props: ["digParticle"],
  data() {
    return {};
  },
});
</script>

<style scoped>
.circle {
  height: 10px;
  width: 10px;
  background-color: #915a30;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
}
</style>
