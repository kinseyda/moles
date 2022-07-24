<template>
  <div id="pop-up-outer">
    <div id="top-container">
      <span id="title-text"><slot name="title"></slot></span>
      <div id="tab-container">
        <button
          class="tab"
          v-for="name in tabNames"
          :key="name"
          @click="curTab = name"
          :class="{ 'selected-tab': curTab == name }"
        >
          {{ name }}
        </button>
      </div>
    </div>
    <button id="exit-button" @click="closePopUp()"><b>X</b></button>
    <div id="content-outer">
      <slot :name="[curTab]"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uiDescriptions } from "./ui-descriptions";
import { mapMutations } from "vuex";

export default defineComponent({
  name: "PopUpMenu",
  props: ["tabNames"],
  data() {
    return {
      uiDescriptions: uiDescriptions,
      curTab: this.tabNames ? this.tabNames[0] : "content",
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
  top: 75px;
  bottom: 75px;
  left: 75px;
  right: 75px;
  border: 1px solid var(--text-color);
}
#content-outer {
  display: flex;
  flex-direction: column;
  height: calc(100% - 1.75em - 10px);
  overflow: scroll;
}
#exit-button {
  font-size: x-large;
  width: 2.5ch;
  height: 2.5ch;
  position: absolute;
  top: 0;
  right: 0;
}
#top-container {
  display: flex;
  flex: 1 1 0;
}
#title-text {
  font-weight: bold;
  font-size: xx-large;
}
#tab-container {
  margin-left: 1ch;
}
.tab {
  height: 3em;
  padding: 1ch;
}
.selected-tab {
  background-color: var(--tertiary-bg-color);
}
</style>
