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
    <sell-info
      v-bind:structure="structSellData"
      v-if="structSellData"
    ></sell-info>
  </div>
</template>

<script lang="ts">
import { game } from "@/model/game";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import PurchaseInfo from "@/components/Descriptions/PurchaseInfo/PurchaseInfo.vue";
import SellInfo from "@/components/Descriptions/PurchaseInfo/SellInfo.vue";
import DigInformation from "@/components/Descriptions/DigInformation.vue";
export default defineComponent({
  name: "DescriptionContainer",
  computed: {
    ...mapState([
      "purchaseInformationData",
      "structSellData",
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
  },
});
</script>
<style scoped>
#description-container {
  background: var(--global-bg-color);
}
#description-container.floating-tooltip {
  border: 1px solid var(--text-color);
  width: 384px;
  display: block;
  position: absolute;
  z-index: 1000;
  overflow: hidden;
}
#description-container.floating-tooltip.is-empty {
  display: none;
}
</style>