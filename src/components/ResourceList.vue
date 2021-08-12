<template>
  <div id="outer">
    <p>Resources:</p>
    <table>
      <resource-item
        v-for="item in resourceDict"
        v-bind:resource="item"
        v-bind:key="item.id"
      ></resource-item>
    </table>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ResourceItem from "./ResourceItem.vue";
export default defineComponent({
  name: "ResourceList",
  props: ["resourceDict"],
  components: {
    ResourceItem,
  },
});
</script>

<style scoped>
#outer {
  flex: 0 0 35ch;
  min-height: 100%;
}
</style>