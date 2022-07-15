<template>
  <li>
    <p>
      <colored-resource :resData="getResourceData()"></colored-resource>:
      <span class="bad-text"
        >{{ formatNumber(cost) }} <small class="bad-text"> Mo</small></span
      >,
      <span
        :class="{
          'bad-text': timeUntil() > 0,
          'good-text': timeUntil() == 0,
        }"
        >{{ formatTime(timeUntil()) }}</span
      >
    </p>
  </li>
</template>

<script lang="ts">
import { formatNumber, formatTime } from "@/components/format";
import { game } from "@/model/game";
import { resourceDataDict } from "@/content/resource-data";
import { defineComponent } from "vue";
import ColoredResource from "@/components/ColoredResource.vue";
export default defineComponent({
  name: "CostBullet",
  props: {
    cost: Number,
    resourceId: Number,
  },
  components: { ColoredResource },
  methods: {
    formatNumber(num: number) {
      return formatNumber(num);
    },
    formatTime(num: number) {
      return formatTime(num);
    },
    getResourceData() {
      if (this.resourceId === undefined) {
        throw new Error("Cost bullet's resource id not assigned");
      }
      return resourceDataDict[this.resourceId];
    },
    timeUntil(): number {
      if (this.resourceId === undefined) {
        throw new Error("Cost bullet's resource id not assigned");
      }
      if (game.resourceDict[this.resourceId] !== undefined) {
        const res = game.resourceDict[this.resourceId];
        if (this.cost !== undefined) {
          if (res.attemptedRateLastTick === 0) {
            if (this.cost - res.amount > 0) {
              return Infinity;
            }
            return 0;
          }
          return Math.max((this.cost - res.amount) / res.attemptedRateLastTick, 0);
        }
        return 0;
      } else {
        return Infinity;
      }
    },
  },
});
</script>
<style scoped></style>
