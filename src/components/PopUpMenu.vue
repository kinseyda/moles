<template>
  <div id="pop-up-outer">
    <h2><slot name="title"></slot></h2>
    <button id="exit-button" @click="closePopUp()"><b>X</b></button>
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uiDescriptions } from "./ui-descriptions";
import { mapMutations } from "vuex";

export default defineComponent({
  name: "PopUpMenu",
  props: [],
  data() {
    return {
      uiDescriptions: uiDescriptions,
    };
  },
  methods: {
    ...mapMutations(["closePopUp", "hoverDescString", "resetDesc"]),
  },
});
</script>

<style scoped>
#pop-up-outer {
  position: absolute;
  background-color: var(--global-bg-color);
  z-index: 1;
  top: 100px;
  bottom: 100px;
  left: 100px;
  right: 100px;
  border: 1px solid var(--text-color);
}
#exit-button {
  font-size: x-large;
  width: 2.5ch;
  height: 2.5ch;
  position: absolute;
  top: 0;
  right: 0;
}
</style>