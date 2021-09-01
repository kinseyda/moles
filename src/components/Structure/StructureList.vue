<template>
  <div id="outer">
    <h2>Structures:</h2>
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
import StructureItem from "../Structure/StructureItem.vue";
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
  flex: 1 1 75%;
  overflow: auto;
  padding-top: 10px;
}
</style>