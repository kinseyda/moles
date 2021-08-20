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
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ResourceItem from "./ResourceItem.vue";
export default defineComponent({
  name: "ResourceList",
  props: ["resourceDict"],
  data() {
    return {
      sliderVals: [],
    };
  },
  components: {
    ResourceItem,
  },
  watch: {
    sliderVals: {
      deep: true,
      handler: function () {
        let total = 0;
        for (const resId in this.resourceDict) {
          if (resId == 0) {
            continue;
          }
          total += Number(this.sliderVals[resId]);
        }
        for (const resId in this.resourceDict) {
          if (resId == 0) {
            continue;
          }
          if (total == 0) {
            total = 1;
          }
          this.resourceDict[resId].setCapMultiplier(
            this.sliderVals[resId] / total,
            this.resourceDict[0].amount
          );
        }
      },
    },
  },
  mounted() {
    for (const resId in this.resourceDict) {
      this.sliderVals[resId] = "1";
    }
  },
});
</script>

<style scoped>
#outer {
  flex: 0 0 42ch;
  min-height: 100%;
}
</style>