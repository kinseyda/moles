<template>
  <div id="outer">
    <h2>Resources:</h2>
    <table>
      <resource-item
        v-for="item in resourceDict"
        v-bind:resource="item"
        v-bind:key="item.id"
        v-model:sliderVal="sliderVals[item.id]"
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
import { uiDescriptions } from "../uiDescriptions";
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
    setSliders(num: number) {
      for (const resIdStr in this.resourceDict) {
        // Change value behind the scenes
        this.sliderVals[Number(resIdStr)] = num;
        // Change actual slider position
        const slider = document.getElementById(
          `slider${resIdStr}`
        ) as HTMLInputElement;
        if (slider !== null) {
          slider.value = String(num);
        } else {
          console.error(`No slider called 'slider${resIdStr}'`);
        }
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
          total += Number(this.sliderVals[resId]);
        }
        for (const resIdStr in this.resourceDict) {
          const resId = Number(resIdStr);
          if (total == 0) {
            total = 1;
          }
          if (this.area === undefined) {
            throw new Error("ResourceList's area prop is undefined");
          }
          this.resourceDict[resId].setCapPriority(
            Number(this.sliderVals[resId]),
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
      this.sliderVals[resId] = 1;
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
  margin-right: 10ch;
}
</style>