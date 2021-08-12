<template>
  <div id="outer">
    <p>Structures:</p>
    <table>
      <structure-item
        v-for="item in structureDict"
        v-bind:structure="item"
        v-bind:key="item.id"
      ></structure-item>
    </table>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import StructureItem from "./StructureItem.vue";
export default defineComponent({
  name: "StructureList",
  props: ["structureDict"],
  components: {
    StructureItem,
  },
});
</script>

<style scoped>
#outer {
  flex: 1 1 80%;
  overflow: auto;
  padding-top: 10px;
}
</style>