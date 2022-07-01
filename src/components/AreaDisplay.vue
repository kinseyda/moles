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
        :class="{
          'bad-text': area.amount < area.getUsableArea(),
          'good-text': area.amount == area.getUsableArea(),
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
import { mapMutations } from "vuex";
import { uiDescriptions } from "@/components/ui-descriptions";
import { getAreaStatus, getAreaStatusString } from "@/content/area-statuses";
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
    getAreaString(area: number) {
      return getAreaStatusString(getAreaStatus(area));
    },
  },
});
</script>

<style scoped>
#area-text {
  font-size: x-large;
  text-align: center;
}
</style>
