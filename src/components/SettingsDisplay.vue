<template>
  <div id="outer">
    <h2>Settings</h2>
    <button id="exit-button" @click="toggleSettingsOpen()">X</button>
    <ul>
      <li>
        <button
          @click="toggleTheme"
          @mouseover="hoverDescString(uiDescriptions['theme'])"
          @mouseleave="resetDesc()"
        >
          Theme: {{ settings.theme == "light" ? "Light" : ""
          }}{{ settings.theme == "dark" ? "Dark" : "" }}
        </button>
      </li>
      <li>
        <button
          @click="toggleTooltips"
          @mouseover="hoverDescString(uiDescriptions['descriptionPosition'])"
          @mouseleave="resetDesc()"
        >
          Descriptions: {{ settings.tooltips ? "Tooltips" : "Fixed" }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uiDescriptions } from "./ui-descriptions";
import { mapMutations, mapState } from "vuex";

export function setTooltips(tooltips: boolean) {
  let tooltipPos = function (e: MouseEvent) {
    const descContainer = document.getElementById("description-container");
    if (descContainer === null) {
      return;
    }
    const x = e.clientX,
      y = e.clientY;
    if (x + 20 + 384 > window.innerWidth) {
      descContainer.style.left = "";
      descContainer.style.right = window.innerWidth - x + 20 + "px";
    } else {
      descContainer.style.right = "";
      descContainer.style.left = x + 20 + "px";
    }
    descContainer.style.top = y + 20 + "px";
  };
  if (tooltips) {
    localStorage.setItem("molesDescPos", "tooltip");
    window.addEventListener("mousemove", tooltipPos);
  } else {
    localStorage.setItem("molesDescPos", "fixed");
    window.removeEventListener("mousemove", tooltipPos);
  }
}

export default defineComponent({
  name: "SettingsDisplay",
  props: [],
  data() {
    return {
      uiDescriptions: uiDescriptions,
    };
  },
  computed: {
    ...mapState(["settings"]),
  },
  methods: {
    ...mapMutations([
      "toggleSettingsOpen",
      "settingsSetTheme",
      "settingsSetTooltips",
      "hoverDescString",
      "resetDesc",
    ]),
    toggleTheme() {
      const htmlTag = document.getElementsByTagName("html")[0];
      if (this.settings.theme == "light") {
        htmlTag.setAttribute("theme", "dark");
        localStorage.setItem("molesTheme", "dark");
        this.settingsSetTheme("dark");
      } else if (this.settings.theme == "dark") {
        htmlTag.setAttribute("theme", "light");
        localStorage.setItem("molesTheme", "light");
        this.settingsSetTheme("light");
      }
    },
    toggleTooltips() {
      this.settingsSetTooltips(!this.settings.tooltips);
      setTooltips(this.settings.tooltips);
    },
  },
});
</script>

<style scoped>
ul {
  list-style-type: none;
}
#exit-button {
  font-size: x-large;
  width: 2ch;
  position: absolute;
  top: 0;
  right: 0;
}
</style>