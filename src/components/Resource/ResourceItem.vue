<template>
  <tr class="list-row">
    <td
      class="res-name"
      @mouseover="hoverDescIdentifiable(resource)"
      @mouseleave="resetDesc()"
    >
      <colored-resource :resData="resource.dataObject"></colored-resource>:
    </td>
    <td
      class="res-amount"
      @mouseover="hoverDescStringReg({ str: numDesc, args: [resource.dataObject.name] })"
      @mouseleave="resetDesc()"
    >
      <b>{{ formatNumber(resource.amount) }}</b>
      <p class="res-purchase-cost bad-text">
        {{ getResCost(purchaseInformationData) }}
      </p>
    </td>
    <td class="res-slash">/</td>
    <td
      class="res-cap"
      @mouseover="
        hoverDescStringReg({ str: denomDesc, args: [resource.dataObject.name] })
      "
      @mouseleave="resetDesc()"
    >
      <b>{{ formatNumber(resource.cap) }}</b
      ><small> Mo</small>
    </td>
    <td
      class="res-rate"
      @mouseover="
        hoverDescResRate({
          resName: resource.dataObject.name,
          rr: resource.rateBreakdown,
        })
      "
      @mouseleave="resetDesc()"
    >
      <span class="res-rate-number">
        <b
          :class="{
            'good-text': resource.attemptedRateLastTick > 0,
            'bad-text': resource.attemptedRateLastTick < 0,
          }"
          >{{ formatNumber(resource.attemptedRateLastTick) }}</b
        >
        <p
          class="res-purchase-rate"
          v-if="
            purchaseInformationData &&
            purchaseInformationData['_class'] == SerializableClasses.Structure
          "
        >
          <span class="good-text"> {{ getResRateProd(purchaseInformationData) }}</span>
          <span class="bad-text"> {{ getResRateCons(purchaseInformationData) }}</span>
        </p>
      </span>
      <small
        :class="{
          'good-text': resource.attemptedRateLastTick > 0,
          'bad-text': resource.attemptedRateLastTick < 0,
        }"
      >
        Mo/s</small
      >
    </td>
    <td class="res-slider">
      <slider-input
        @mouseover="
          hoverDescStringReg({ str: capDesc, args: [resource.dataObject.name] })
        "
        @mouseleave="resetDesc()"
        :startingValue="resource.capPriority"
        :min="0"
        :max="10"
        @slider-val="(n) => $emit('update:slider-val', n)"
      ></slider-input>
    </td>
    <td class="res-slider-set">
      <button
        class="slider-set"
        @click="$emit('slider-max', resource.id)"
        @mouseover="
          hoverDescStringReg({ str: maxDesc, args: [resource.dataObject.name] })
        "
        @mouseleave="resetDesc()"
      >
        X
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import { formatNumber } from "@/components/format";
import { uiDescriptions } from "@/components/ui-descriptions";
import { SerializableClasses } from "@/model/serializable-class";
import { Particle } from "@/components/Particles/BasicParticle.vue";
import ColoredResource from "@/components/ColoredResource.vue";
import SliderInput from "../SliderInput.vue";
import Purchasable from "@/model/purchasable";
import Structure from "@/model/structure";

export default defineComponent({
  name: "ResourceItem",
  props: ["resource"],
  emits: ["update:slider-val", "slider-max"],
  components: {
    ColoredResource,
    SliderInput,
  },
  data() {
    return {
      numDesc: uiDescriptions["resourceNumerator"],
      denomDesc: uiDescriptions["resourceDenominator"],
      rateDesc: uiDescriptions["resourceRate"],
      capDesc: uiDescriptions["capSliders"],
      maxDesc: uiDescriptions["sliderSetMax"],
      sliderVal: this.resource.capPriority,
      SerializableClasses: SerializableClasses,
      particle: new Particle(this.resource.dataObject.color),
    };
  },
  computed: {
    ...mapState(["purchaseInformationData"]),
  },
  methods: {
    ...mapMutations([
      "hoverDescIdentifiable",
      "hoverDescResRate",
      "hoverDescString",
      "hoverDescStringReg",
      "resetDesc",
    ]),
    getResCost(purchase: Purchasable) {
      return purchase
        ? !isNaN(purchase.trueCost(this.resource.id))
          ? "-" + this.formatNumber(purchase.trueCost(this.resource.id))
          : ""
        : "";
    },
    getResRateProd(structure: Structure) {
      return !isNaN(structure.dataObject.production[this.resource.id])
        ? "+" + this.formatNumber(structure.dataObject.production[this.resource.id])
        : "";
    },
    getResRateCons(structure: Structure) {
      return !isNaN(structure.dataObject.consumption[this.resource.id])
        ? "-" + this.formatNumber(structure.dataObject.consumption[this.resource.id])
        : "";
    },
    formatNumber(num: number) {
      return formatNumber(num);
    },
    getCap() {
      return this.resource.cap;
    },
  },
});
</script>
<style scoped>
.res-amount,
.res-rate-number {
  width: 100%;
  height: 100%;
  position: relative;
}
.res-purchase-cost {
  position: absolute;
  font-size: small;
  right: -1.5ch;
  top: -0.25em;
}
.res-purchase-rate {
  position: absolute;
  font-size: small;
  right: -3ch;
  top: -0.75em;
}

tr {
  height: 2em;
}

td {
  min-width: 6ch;
  padding-left: 0.5ch;
}
td.res-name {
  min-width: 7ch;
}
td.res-slash {
  min-width: 1ch;
}
td.res-cap {
  min-width: 9ch;
}
td.res-rate {
  min-width: 11ch;
}
td.res-slider {
  min-width: 10ch;
}
td.res-slider-set {
  min-width: 1ch;
}
button.slider-set {
  float: right;
  width: 2.5ch;
}
</style>
