<template>
  <pop-up-menu>
    <template #title>Prestige</template>
    <template #content>
      <button
        @click="
          $emit('prestige');
          togglePrestigeOpen();
        "
      >
        Prestige
      </button>
      <button @click="toggleEmpireOpen()">Cancel</button>
    </template>
  </pop-up-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uiDescriptions } from "./ui-descriptions";
import { mapMutations, mapState } from "vuex";
import PopUpMenu from "./PopUpMenu.vue";

export default defineComponent({
  name: "PrestigeMenu",
  props: [],
  data() {
    return {
      uiDescriptions: uiDescriptions,
    };
  },
  emits: ["prestige"],
  components: {
    PopUpMenu,
  },
  computed: {
    ...mapState(["settings"]),
  },
  methods: {
    ...mapMutations([
      "toggleEmpireOpen",
      "togglePrestigeOpen",
      "hoverDescString",
      "resetDesc",
    ]),
  },
});
</script>

<style scoped>
</style>