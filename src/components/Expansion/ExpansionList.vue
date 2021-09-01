<template>
  <div v-if="Object.keys(expansionDict).length !== 0" id="outer">
    <expansion-item
      v-for="item in expansionDict"
      :expansion="item"
      :key="item.id"
    ></expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ExpansionItem from "./ExpansionItem.vue";
export default defineComponent({
  name: "ExpansionList",
  props: ["expansionDict"],
  components: {
    ExpansionItem,
  },
  methods: {},
});
</script>

<style scoped>
#outer {
  flex: 0 1 25%;
  display: flex;
  flex-direction: row;
}
</style>