<template>
  <li>
    <p>
      {{ resource.dataObject.name }}: {{ formatNumber(cost) }},
      {{ formatTime(timeUntil()) }}
    </p>
  </li>
</template>

<script lang="ts">
import Resource from "@/model/resources";
import { formatNumber, formatTime } from "@/components/format";
import { defineComponent } from "vue";
export default defineComponent({
  name: "CostBullet",
  props: {
    cost: Number,
    resource: Resource,
  },
  methods: {
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
    formatTime(num: number) {
      return formatTime(num);
    },
    timeUntil(): number {
      if (
        this.cost !== undefined &&
        this.resource?.amount !== undefined &&
        this.resource?.trueRate !== undefined
      ) {
        if (this.resource.trueRate === 0) {
          if (this.cost - this.resource.amount > 0) {
            return Infinity;
          }
          return 0;
        }
        return Math.max(
          (this.cost - this.resource.amount) / this.resource.trueRate,
          0
        );
      }
      return 0;
    },
  },
});
</script>