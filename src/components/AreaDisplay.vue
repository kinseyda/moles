<template>
  <div>
    <p
      id="area-text"
      @mouseover="hoverDescString(uiDescriptions['area'])"
      @mouseleave="resetDesc()"
    >
      Max {{ getAreaString(area.cap) }} Area: <b>{{ formatNumber(area.cap) }}</b> <br />
      Usable:
      <b
        id="amount"
        :style="{
          color: getColorScale(1 - area.amount / area.getUsableArea()),
        }"
        >{{ formatNumber(area.amount) }}</b
      >
      / <b class="good-text">{{ formatNumber(area.getUsableArea()) }}</b> Mo
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatNumber } from "@/components/format";
import { mapMutations, mapState } from "vuex";
import { uiDescriptions } from "@/components/ui-descriptions";
import { getAreaStatus, getAreaStatusString } from "@/content/area-statuses";
import { getColorScale } from "./color";

export default defineComponent({
  name: "AreaDisplay",
  props: ["area"],
  data() {
    return {
      uiDescriptions: uiDescriptions,
    };
  },
  computed: {
    ...mapState(["settings"]),
  },
  methods: {
    ...mapMutations(["hoverDescString", "resetDesc"]),
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    getAreaString(area: number) {
      return getAreaStatusString(getAreaStatus(area));
    },
    getColorScale(level: number) {
      return getColorScale(this.settings.cbMode, level);
    },
  },
});
</script>

<style scoped>
#area-text {
  font-size: x-large;
  text-align: center;
}
#amount {
  background-color: var(--cb-background);
}
</style>
