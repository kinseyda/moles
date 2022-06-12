<template>
  <pop-up-menu>
    <template #title>Settings</template>
    <template #content>
      <ul>
        <li>
          <button
            @click="toggleTheme"
            @mouseover="hoverDescString(uiDescriptions['settingsTheme'])"
            @mouseleave="resetDesc()"
          >
            Theme: {{ settings.theme == "light" ? "Light" : ""
            }}{{ settings.theme == "dark" ? "Dark" : ""
            }}{{ settings.theme == "true mole" ? "True Mole" : "" }}
          </button>
        </li>
        <li>
          <button
            @click="toggleTooltips"
            @mouseover="
              hoverDescString(uiDescriptions['settingsDescriptionPosition'])
            "
            @mouseleave="resetDesc()"
          >
            Descriptions: {{ settings.tooltips ? "Tooltips" : "Fixed" }}
          </button>
        </li>
        <li>
          <button
            @click="toggleCBMode"
            @mouseover="hoverDescString(uiDescriptions['settingsCBMode'])"
            @mouseleave="resetDesc()"
          >
            Color blind mode:
            {{ settings.cbMode == "green red" ? "Green / Red" : ""
            }}{{ settings.cbMode == "blue orange" ? "Blue / Orange" : ""
            }}{{ settings.cbMode == "mono" ? "Monochrome" : ""
            }}{{ settings.cbMode == "no color" ? "No color" : "" }}
          </button>
          <ul>
            <li>
              Example: <span class="good-text">Good thing</span> /
              <span class="bad-text">Bad thing</span>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </pop-up-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uiDescriptions } from "./ui-descriptions";
import PopUpMenu from "./PopUpMenu.vue";
import { mapMutations, mapState } from "vuex";

export function setTooltips(tooltips: boolean) {
  let tooltipPos = function (e: MouseEvent) {
    const descContainer = document.getElementById("description-container");
    if (descContainer === null) {
      return;
    }
    const xDist = 20,
      yDist = 5; // Distance from mouse
    const descWidth = descContainer.offsetWidth; // Will match App.vue css
    const descHeight = descContainer.clientHeight; // Can change based on content
    const x = e.clientX,
      y = e.clientY;
    if (x + xDist + descWidth > window.innerWidth) {
      descContainer.style.left = "";
      descContainer.style.right = window.innerWidth - (x - xDist) + "px";
    } else {
      descContainer.style.right = "";
      descContainer.style.left = x + xDist + "px";
    }

    if (y + yDist + descHeight + 26 > window.innerHeight) {
      // Height is off by 26 for some reason, I think some kind of font issue
      descContainer.style.top = "";
      descContainer.style.bottom = window.innerHeight - (y - yDist) + "px";
    } else {
      descContainer.style.bottom = "";
      descContainer.style.top = y + yDist + "px";
    }
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
  components: {
    PopUpMenu,
  },
  methods: {
    ...mapMutations([
      "toggleSettingsOpen",
      "settingsSetTheme",
      "settingsSetTooltips",
      "settingsSetCBMode",
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
        htmlTag.setAttribute("theme", "true mole");
        localStorage.setItem("molesTheme", "true mole");
        this.settingsSetTheme("true mole");
      } else if (this.settings.theme == "true mole") {
        htmlTag.setAttribute("theme", "light");
        localStorage.setItem("molesTheme", "light");
        this.settingsSetTheme("light");
      }
    },
    toggleTooltips() {
      this.settingsSetTooltips(!this.settings.tooltips);
      setTooltips(this.settings.tooltips);
    },
    toggleCBMode() {
      const htmlTag = document.getElementsByTagName("html")[0];
      if (this.settings.cbMode == "green red") {
        htmlTag.setAttribute("cbMode", "blue orange");
        localStorage.setItem("cbMode", "blue orange");
        this.settingsSetCBMode("blue orange");
      } else if (this.settings.cbMode == "blue orange") {
        htmlTag.setAttribute("cbMode", "mono");
        localStorage.setItem("cbMode", "mono");
        this.settingsSetCBMode("mono");
      } else if (this.settings.cbMode == "mono") {
        htmlTag.setAttribute("cbMode", "no color");
        localStorage.setItem("cbMode", "no color");
        this.settingsSetCBMode("no color");
      } else if (this.settings.cbMode == "no color") {
        htmlTag.setAttribute("cbMode", "green red");
        localStorage.setItem("cbMode", "green red");
        this.settingsSetCBMode("green red");
      }
    },
  },
});
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>