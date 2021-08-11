<template>
  <tr
    class="list-row"
    @mouseover="hoverDescIdentifiable(resource)"
    @mouseleave="resetDesc()"
  >
    <td>{{ resource.dataObject.name }}:</td>
    <td>{{ formatNumber(resource.amount) }}</td>
    <td>/</td>
    <td>{{ formatNumber(resource.cap) }}</td>
    <td>{{ formatNumber(resource.trueRate) }} m/s</td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { formatNumber } from "../js/utils";

export default defineComponent({
  name: "ResourceItem",
  props: ["resource"],
  methods: {
    ...mapMutations(["hoverDescIdentifiable", "resetDesc"]),
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
  },
});
</script>
