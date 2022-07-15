<template>
  <pop-up-menu>
    <template #title>Info</template>
    <template #content>
      <div id="info-outer">
        <div id="info-top">
          <p>
            <b><i>Moles</i></b> is an open-source, text-based incremental game, built
            using Vue 3.
          </p>
        </div>
        <div id="info-bottom">
          <div
            @mouseover="hoverDescString(uiDescriptions['versions'])"
            @mouseleave="resetDesc()"
          >
            <p>
              Save creation version:
              <span
                :class="{
                  'bad-text': gameSaveVersion != appVersion,
                  'bad-version': gameSaveVersion != appVersion,
                }"
                >{{ gameSaveVersion }}</span
              >
            </p>
            <p>Application's version: {{ appVersion }}</p>
          </div>
          <p>
            Created by Daniel Kinsey. View the source code on
            <a href="https://github.com/kinseyda/moles">Github</a>
          </p>
        </div>
      </div>
    </template>
  </pop-up-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uiDescriptions } from "@/components/ui-descriptions";
import { mapMutations } from "vuex";
import PopUpMenu from "@/components/PopUpMenu.vue";
import { ResourceData } from "@/model/data-interfaces";
import { resourceDataDict } from "@/content/resource-data";
import { formatNumber } from "@/components/format";

export default defineComponent({
  name: "InfoDisplay",
  props: ["appVersion", "gameSaveVersion"],
  data() {
    return {
      uiDescriptions: uiDescriptions,
    };
  },
  components: {
    PopUpMenu,
  },
  computed: {},
  methods: {
    ...mapMutations(["toggleInfoOpen", "hoverDescString", "resetDesc"]),
    getResData(resId: number): ResourceData {
      return resourceDataDict[resId];
    },
    formatNumber(num: number) {
      return formatNumber(num);
    },
  },
});
</script>

<style scoped>
#info-outer {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
}
#info-bottom {
  flex: 0 0 0;
}
#info-top {
  flex: 1 0 0;
}
.bad-version {
  font-weight: bolder;
}
</style>
