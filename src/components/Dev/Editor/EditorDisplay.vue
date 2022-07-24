<template>
  <pop-up-menu :tabNames="['Upgrades', 'Unlocks', 'Events', 'Resources', 'Structures']">
    <template #title>Content Editor</template>
    <template #Upgrades>
      <upgrade-editor></upgrade-editor>
    </template>
  </pop-up-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PopUpMenu from "@/components/PopUpMenu.vue";
import UpgradeEditor from "./Upgrades/UpgradeEditor.vue";

export default defineComponent({
  name: "EditorDisplay",
  data() {
    return {};
  },
  components: {
    PopUpMenu,
    UpgradeEditor,
  },
  methods: {},
});
</script>

<style scoped></style>
