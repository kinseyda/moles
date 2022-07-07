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
        >{{ formatNumber(area.amount) }}
        <span class="area-purchase-cost bad-text">
          {{ getAreaCost(purchaseInformationData) }}
        </span></b
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
import Purchasable from "@/model/purchasable";
import Structure from "@/model/structure";
import { SerializableClasses } from "@/model/serializable-class";

export default defineComponent({
  name: "AreaDisplay",
  props: ["area"],
  data() {
    return {
      uiDescriptions: uiDescriptions,
    };
  },
  computed: {
    ...mapState(["settings", "purchaseInformationData"]),
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
    getAreaCost(purchase: Purchasable) {
      return purchase
        ? purchase["_class"] === SerializableClasses.Structure
          ? "-" + this.formatNumber((purchase as Structure).trueCostArea())
          : ""
        : "";
    },
  },
});
</script>

<style scoped>
#area-text {
  font-size: x-large;
  text-align: center;
}
.area-purchase-cost {
  position: absolute;
  font-size: small;
  right: -1ch;
  top: -0.25em;
}
#amount {
  background-color: var(--cb-background);
  position: relative;
}
</style>
