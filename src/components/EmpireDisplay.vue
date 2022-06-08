<template>
  <pop-up-menu>
    <template #title>Empire</template
    ><template #content
      ><button @click="$emit('prestige')">Prestige</button></template
    >
  </pop-up-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uiDescriptions } from "./ui-descriptions";
import { mapMutations, mapState } from "vuex";
import PopUpMenu from "./PopUpMenu.vue";

export default defineComponent({
  name: "EmpireDisplay",
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
    ...mapMutations(["toggleEmpireOpen", "hoverDescString", "resetDesc"]),
  },
});
</script>

<style scoped>
</style>