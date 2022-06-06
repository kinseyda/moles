<template>
  <div id="outer">
    <h2
      @mouseover="hoverDescString(uiDescriptions['structures'])"
      @mouseleave="resetDesc()"
    >
      Structures:
    </h2>
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
import { uiDescriptions } from "../ui-descriptions";
import { mapMutations } from "vuex";
export default defineComponent({
  name: "StructureList",
  props: ["structureDict"],
  methods: {
    ...mapMutations(["hoverDescString", "resetDesc"]),
  },
  components: {
    StructureItem,
  },
  data() {
    return {
      uiDescriptions: uiDescriptions,
    };
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