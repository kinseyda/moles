<template>
  <li>
    <p>
      {{ getResourceData().name }}: {{ formatNumber(cost) }},
      {{ formatTime(timeUntil()) }}
    </p>
  </li>
</template>

<script lang="ts">
import { formatNumber, formatTime } from "@/components/format";
import { game } from "@/model/game";
import { resourceDataDict } from "@/model/staticData/resource-data";
import { defineComponent } from "vue";
export default defineComponent({
  name: "CostBullet",
  props: {
    cost: Number,
    resourceId: Number,
  },
  methods: {
    formatNumber(num: number) {
      return formatNumber(num, undefined);
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
          if (res.trueRate === 0) {
            if (this.cost - res.amount > 0) {
              return Infinity;
            }
            return 0;
          }
          return Math.max((this.cost - res.amount) / res.trueRate, 0);
        }
        return 0;
      } else {
        return Infinity;
      }
    },
  },
});
</script>