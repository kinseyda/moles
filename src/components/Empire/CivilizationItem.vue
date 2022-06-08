<template>
  <li class="list-row">
    {{ civilization.name }} <br />
    <ul>
      <li>Population: {{ civilization.population }}</li>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { formatNumber } from "@/components/format";

export default defineComponent({
  name: "CivilizationItem",
  props: ["civilization"],
  methods: {
    ...mapMutations(["hoverDescCivilization", "resetDesc"]),
    formatNumber(num: number) {
      return formatNumber(num, undefined);
    },
  },
});
</script>
