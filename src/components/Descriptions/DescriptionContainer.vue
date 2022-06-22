<template>
  <div
    id="description-container"
    :class="{
      'floating-tooltip': settings.tooltips,
      'is-empty': descriptionBoxIsEmpty,
    }"
  >
    <div id="description-box" v-html="descriptionBoxData"></div>
    <purchase-info
      v-bind:purchase="purchaseInformationData"
      v-if="purchaseInformationData"
    ></purchase-info>
    <dig-information :dig="gameData.dig" v-if="digData"></dig-information>
    <sell-info v-bind:structure="structSellData" v-if="structSellData"></sell-info>
    <civilization-info
      :civilization="civilizationInformationData"
      v-if="civilizationInformationData"
    ></civilization-info>
    <resource-rate
      :resourceRate="resourceRateData"
      v-if="resourceRateData"
    ></resource-rate>
  </div>
</template>

<script lang="ts">
import { game } from "@/model/game";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import PurchaseInfo from "@/components/Descriptions/PurchaseInfo/PurchaseInfo.vue";
import ResourceRate from "@/components/Descriptions/ResourceRate.vue";
import SellInfo from "@/components/Descriptions/PurchaseInfo/SellInfo.vue";
import DigInformation from "@/components/Descriptions/DigInformation.vue";
import CivilizationInfo from "./CivilizationInfo.vue";
export default defineComponent({
  name: "DescriptionContainer",
  computed: {
    ...mapState([
      "purchaseInformationData",
      "resourceRateData",
      "structSellData",
      "civilizationInformationData",
      "descriptionBoxData",
      "descriptionBoxIsEmpty",
      "digData",
      "settings",
    ]),
  },
  data() {
    return {
      gameData: game,
    };
  },
  components: {
    PurchaseInfo,
    SellInfo,
    DigInformation,
    CivilizationInfo,
    ResourceRate,
  },
});
</script>
<style scoped>
#description-container {
  background: var(--global-bg-color);
}
#description-container.floating-tooltip {
  border: 1px solid var(--text-color);
  width: 40ch;
  display: block;
  position: absolute;
  z-index: 1000;
  overflow: hidden;
}
#description-container.floating-tooltip.is-empty {
  display: none;
}
</style>
