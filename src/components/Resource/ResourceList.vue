<template>
  <div id="outer">
    <h2>Resources:</h2>
    <table>
      <resource-item
        v-for="item in resourceDict"
        v-bind:resource="item"
        v-bind:key="item.id"
        v-model:sliderVal="sliderVals[item.id]"
        v-on:slider-max="maxOne(item.id)"
      ></resource-item>
    </table>

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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import ResourceItem from "./ResourceItem.vue";
import { uiDescriptions } from "@/components/ui-descriptions";
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
  },
  methods: {
    ...mapMutations(["hoverDescString", "resetDesc"]),
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
        this.setSlider(Number(resIdStr), num)
      }
    },
    maxOne(sliderIndex: number) {
      for (const resIdStr in this.resourceDict) {
        if (Number(resIdStr) == sliderIndex) {

        this.setSlider(Number(resIdStr), 10)
        }
        else {
          this.setSlider(Number(resIdStr), 0)
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
    }
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
        }
      },
    },
  },
  mounted() {
    for (const resIdStr in this.resourceDict) {
      const resId = Number(resIdStr);
      this.sliderVals[resId] = this.resourceDict[resId].capPriority;
    }
  },
});
</script>

<style scoped>
button.slider-set {
  float: right;
  width: 2.5ch;
}
button.slider-set#set-0 {
  margin-right: 1ch;
}
button.slider-set#set-1 {
  margin-right: 13ch;
}
</style>