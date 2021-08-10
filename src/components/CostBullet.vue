<template>
  <li>
    <p>
      {{ resource.dataObject.name }}: {{ formatNumber(cost) }},
      {{ formatTime(timeUntil()) }}
    </p>
  </li>
</template>

<script lang="ts">
import Resource from "@/js/classes/resources";
import { formatNumber, formatTime } from "@/js/utils";
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
      if (this.cost && this.resource?.amount && this.resource.trueRate) {
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