<template>
  <div>
    <h2
      @mouseover="hoverDescString(uiDescriptions['area'])"
      @mouseleave="resetDesc()"
    >
      Area: {{ formatNumber(area.cap) }} <br />
      Usable: {{ formatNumber(area.amount) }} /
      {{ formatNumber(area.getUsableArea()) }} Mo
    </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatNumber } from "@/components/format";
import { mapMutations } from "vuex";
import { uiDescriptions } from "@/components/ui-descriptions";
export default defineComponent({
  name: "AreaDisplay",
  props: ["area"],
  data() {
    return {
      uiDescriptions: uiDescriptions,
    };
  },
  methods: {
    ...mapMutations(["hoverDescString", "resetDesc"]),
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
  },
});
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>