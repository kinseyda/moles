<template>
  <pop-up-menu :tab-names="['Color', 'Performance']">
    <template #title>Settings</template>
    <template #Color>
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
            @mouseover="hoverDescString(uiDescriptions['settingsDescriptionPosition'])"
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
    <template #Performance>
      <ul>
        <li>
          <p>
            Game tick rate: {{ formatNumber(settings.gameLoopInterval) }} ms,
            {{ formatNumber(1000 / settings.gameLoopInterval) }} per second
          </p>
          <slider-input
            class="perf-slider"
            :min="1"
            :max="51"
            :startingValue="tenToThousandInverse(settings.gameLoopInterval)"
            @slider-val="(n) => updateGameTickRate(Number(n))"
          ></slider-input>
        </li>
        <li>
          <p>
            Event log time update rate:
            {{ formatNumber(settings.eventLogUpdateInterval) }} ms,
            {{ formatNumber(1000 / settings.eventLogUpdateInterval) }} per second
          </p>
          <slider-input
            class="perf-slider"
            :min="1"
            :max="51"
            :startingValue="sixtyToSixtyThousandInverse(settings.eventLogUpdateInterval)"
            @slider-val="(n) => updateEventLogUpdateRate(Number(n))"
          ></slider-input>
        </li>
        <li>
          <b>Particles:</b>
          <ul>
            <li>
              <p>
                Dig particle re-scatter rate:
                {{ formatNumber(settings.digParticleInterval) }} ms,
                {{ formatNumber(1000 / settings.digParticleInterval) }} per second
              </p>
              <slider-input
                class="perf-slider"
                :min="1"
                :max="51"
                :startingValue="tenToThousandInverse(settings.digParticleInterval)"
                @slider-val="(n) => updateDigParticleRate(Number(n))"
              ></slider-input>
            </li>
            <li>
              <p>
                Resource-list particle re-scatter rate:
                {{ formatNumber(settings.resListParticleInterval) }} ms,
                {{ formatNumber(1000 / settings.resListParticleInterval) }} per second
              </p>
              <slider-input
                class="perf-slider"
                :min="1"
                :max="51"
                :startingValue="tenToThousandInverse(settings.resListParticleInterval)"
                @slider-val="(n) => updateResListParticleRate(Number(n))"
              ></slider-input>
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
import SliderInput from "./SliderInput.vue";
import { mapMutations, mapState } from "vuex";
import { Settings } from "@/store";
import { formatNumber } from "./format";

export function setTooltips(tooltips: boolean) {
  let tooltipPos = function (e: MouseEvent) {
    const descContainer = document.getElementById("description-container");
    if (descContainer === null) {
      return;
    }
    const xDist = 20,
      yDist = 5; // Distance from mouse
    const descWidth = descContainer.offsetWidth; // Will match DescriptionContainer.vue css
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
    window.addEventListener("mousemove", tooltipPos);
  } else {
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
  emits: ["settingsChange"],
  computed: {
    ...mapState(["settings"]),
  },
  components: {
    PopUpMenu,
    SliderInput,
  },
  methods: {
    ...mapMutations(["setSettings", "hoverDescString", "resetDesc"]),
    formatNumber(n: number) {
      return formatNumber(n);
    },
    updateSettings(newSettings: Settings) {
      this.$emit("settingsChange", newSettings);
      localStorage.setItem("settings", JSON.stringify(this.settings));
    },
    toggleTheme() {
      const newSettings: Settings = { ...this.settings };
      if (this.settings.theme == "light") {
        newSettings.theme = "dark";
      } else if (this.settings.theme == "dark") {
        newSettings.theme = "true mole";
      } else if (this.settings.theme == "true mole") {
        newSettings.theme = "light";
      }
      this.updateSettings(newSettings);
    },
    toggleTooltips() {
      const newSettings: Settings = { ...this.settings };
      newSettings.tooltips = !this.settings.tooltips;
      this.updateSettings(newSettings);
    },
    toggleCBMode() {
      const newSettings: Settings = { ...this.settings };
      if (this.settings.cbMode == "green red") {
        newSettings.cbMode = "blue orange";
      } else if (this.settings.cbMode == "blue orange") {
        newSettings.cbMode = "mono";
      } else if (this.settings.cbMode == "mono") {
        newSettings.cbMode = "no color";
      } else if (this.settings.cbMode == "no color") {
        newSettings.cbMode = "green red";
      }
      this.updateSettings(newSettings);
    },
    updateGameTickRate(newInterval: number) {
      const newSettings: Settings = { ...this.settings };
      newSettings.gameLoopInterval = this.tenToThousand(newInterval);
      this.updateSettings(newSettings);
    },
    updateEventLogUpdateRate(newInterval: number) {
      const newSettings: Settings = { ...this.settings };
      newSettings.eventLogUpdateInterval = this.sixtyToSixtyThousand(newInterval);
      this.updateSettings(newSettings);
    },
    updateDigParticleRate(newInterval: number) {
      const newSettings: Settings = { ...this.settings };
      newSettings.digParticleInterval = this.tenToThousand(newInterval);
      this.updateSettings(newSettings);
    },
    updateResListParticleRate(newInterval: number) {
      const newSettings: Settings = { ...this.settings };
      newSettings.resListParticleInterval = this.tenToThousand(newInterval);
      this.updateSettings(newSettings);
    },
    sixtyToSixtyThousand(x: number): number {
      return Math.floor(10 ** ((3 * x + 47) / 50) * 6);
    },
    sixtyToSixtyThousandInverse(y: number): number {
      return Math.ceil((50 * Math.log10(y / 6) - 47) / 3);
    },
    tenToThousand(x: number): number {
      return Math.floor(10 ** ((x + 24) / 25));
    },
    tenToThousandInverse(y: number): number {
      return Math.ceil(25 * Math.log10(y) - 24);
    },
  },
});
</script>

<style scoped>
ul {
  list-style-type: none;
}
.perf-slider {
  max-width: 50ch;
}
</style>
