<template>
  <div id="outer">
    <p>{{ unlockTreeItem.name }}</p>
    <div class="child-container">
      <div class="vertical-line"></div>
      <div v-for="child in unlockTreeItem.children" :key="child.name">
        <hr v-if="unlockTreeItem.children.length > 0" />
        <unlock-item :unlockTreeItem="child" :depth="depth"></unlock-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UnlockItem",
  props: ["unlockTreeItem", "depth"],
  data() {
    return {};
  },
  components: {},
  methods: {},
});
</script>

<style scoped>
.vertical-line {
  position: absolute;
  border-left: 1px solid black;
  height: 100%;
  margin-left: 0.5ch;
}
.child-container {
  position: relative;
}
#outer {
  margin-left: 8ch;
}
hr {
  position: absolute;
  margin-left: 0.5ch;
  margin-top: 0.5em;
  height: 1px;
  border-top: 1px solid black;
  width: 7ch;
}
</style>
