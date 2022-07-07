<template>
  <div id="res-list-outer" v-if="Object.keys(resourceDict).length > 0">
    <h2
      @mouseover="hoverDescString(uiDescriptions['resources'])"
      @mouseleave="resetDesc()"
    >
      Resources:
    </h2>
    <div id="list">
      <div id="top-buttons" v-if="Object.keys(resourceDict).length > 1">
        <button
          class="slider-set"
          id="set-1"
          @click="setSliders(1)"
          @mouseover="hoverDescString(uiDescriptions['sliderSet1'])"
          @mouseleave="resetDesc()"
        >
          1
        </button>
        <button
          class="slider-set"
          id="set-0"
          @click="setSliders(0)"
          @mouseover="hoverDescString(uiDescriptions['sliderSet0'])"
          @mouseleave="resetDesc()"
        >
          0
        </button>
      </div>
      <table>
        <resource-item
          v-for="item in resourceDict"
          v-bind:resource="item"
          v-bind:key="item.id"
          v-model:sliderVal="sliderVals[item.id]"
          v-on:slider-max="maxOne(item.id)"
        ></resource-item>
      </table>
      <div id="prod-cont">
        <particle-producer ref="resListDirtProd"></particle-producer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import ResourceItem from "./ResourceItem.vue";
import { uiDescriptions } from "@/components/ui-descriptions";
import ParticleProducer from "@/components/Particles/ParticleProducer.vue";
import { getColorCumulProbs } from "@/components/Particles/ParticleProducer.vue";
export default defineComponent({
  name: "ResourceList",
  props: ["resourceDict", "area"],
  data() {
    return {
      sliderVals: {} as { [resId: number]: number },
      uiDescriptions: uiDescriptions,
    };
  },
  components: {
    ResourceItem,
    ParticleProducer,
  },
  methods: {
    ...mapMutations(["hoverDescString", "resetDesc"]),
    updateParticles() {
      const curRates: { [resId: number]: number } = {};
      for (const resIdStr in this.resourceDict) {
        const resId = Number(resIdStr);
        if (this.resourceDict[resId].realRateLastTick != 0) {
          curRates[resId] = this.resourceDict[resId].realRateLastTick;
        }
      }
      if (Object.keys(curRates).length > 0) {
        (
          this.$refs["resListDirtProd"] as typeof ParticleProducer
        ).updateParticles(1, getColorCumulProbs(curRates));
      }
    },
    getSlider(resId: number) {
      // When a resource is added (through unlocks) it doesnt have a key in sliderVals until the slider is moved.
      // This ensures we never get NaNs (and also string errors)
      if (this.sliderVals[resId] === undefined) {
        return this.resourceDict[resId].capPriority;
      }
      return Number(this.sliderVals[resId]);
    },
    setSliders(num: number) {
      for (const resIdStr in this.resourceDict) {
        this.setSlider(Number(resIdStr), num);
      }
    },
    maxOne(sliderIndex: number) {
      for (const resIdStr in this.resourceDict) {
        if (Number(resIdStr) == sliderIndex) {
          this.setSlider(Number(resIdStr), 10);
        } else {
          this.setSlider(Number(resIdStr), 0);
        }
      }
    },
    setSlider(sliderIndex: number, setTo: number) {
      // Change value behind the scenes
      this.sliderVals[sliderIndex] = setTo;
      // Change actual slider position
      const slider = document.getElementById(
        `slider${sliderIndex}`
      ) as HTMLInputElement;
      if (slider !== null) {
        slider.value = String(setTo);
      } else {
        console.error(`No slider called 'slider${sliderIndex}'`);
      }
    },
  },
  watch: {
    sliderVals: {
      deep: true,
      handler: function () {
        let total = 0;
        for (const resIdStr in this.resourceDict) {
          const resId = Number(resIdStr);
          total += this.getSlider(resId);
        }
        for (const resIdStr in this.resourceDict) {
          const resId = Number(resIdStr);
          if (this.area === undefined) {
            throw new Error("ResourceList's area prop is undefined");
          }
          this.resourceDict[resId].setCapPriority(
            this.getSlider(resId),
            this.area.amount,
            total
          );
          this.resourceDict[resId].checkCap();
        }
      },
    },
  },
  mounted() {
    for (const resIdStr in this.resourceDict) {
      const resId = Number(resIdStr);
      this.sliderVals[resId] = this.resourceDict[resId].capPriority;
    }

    setInterval(this.updateParticles, 50);
  },
});
</script>

<style scoped>
#res-list-outer {
  flex: 1 0 80%;
}
#prod-cont {
  position: relative;
  height: 0;
  width: 100%;
}
#top-buttons {
  margin-top: -2ch;
}
button.slider-set {
  float: right;
  width: 2.5ch;
  height: 2.5ch;
}
button.slider-set#set-0 {
  margin-right: 1ch;
}
button.slider-set#set-1 {
  margin-right: 13.25ch;
}
</style>
