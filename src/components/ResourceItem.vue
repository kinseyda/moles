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
<style>
td {
  width: 7ch;
  padding-left: 0.5ch;
}
td:nth-child(1) {
  /* Name */
  width: 8ch;
}
td:nth-child(3) {
  /* Slash */
  width: 1ch;
}
td:nth-child(5) {
  /* Rate */
  width: 11ch;
}
</style>
