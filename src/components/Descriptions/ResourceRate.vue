<template>
  Rate =
  <table>
    <tr>
      <td>(((</td>
      <td class="numbers" :class="{ 'good-text': resourceRate.digRate > 0 }">
        {{ formatNumber(resourceRate.digRate) }}
      </td>
      <td>&nbsp;+&nbsp;</td>
      <td class="numbers" :class="{ 'good-text': resourceRate.structureProd > 0 }">
        {{ formatNumber(resourceRate.structureProd) }}
      </td>
      <td>)&nbsp;*&nbsp;</td>
      <td class="numbers" :class="{ 'good-text': resourceRate.resourceMult > 1 }">
        {{ formatNumber(resourceRate.resourceMult) }}
      </td>
      <td>&nbsp;*&nbsp;</td>
      <td class="numbers" :class="{ 'good-text': resourceRate.popMult > 1 }">
        {{ formatNumber(resourceRate.popMult) }}
      </td>
      <td>)&nbsp;-&nbsp;</td>
      <td class="numbers" :class="{ 'bad-text': resourceRate.structureCons > 0 }">
        {{ formatNumber(resourceRate.structureCons) }}
      </td>
      <td>)&nbsp;+&nbsp;</td>
      <td class="numbers" :class="{ 'good-text': resourceRate.empireRate > 0 }">
        {{ formatNumber(resourceRate.empireRate) }}
      </td>
      <td>&nbsp;*&nbsp;</td>
      <td
        class="numbers"
        :class="{
          'good-text': resourceRate.empireMult > 0,
          'bad-text': resourceRate.empireMult == 0,
        }"
      >
        {{ formatNumber(resourceRate.empireMult) }}
      </td>
      <td>)</td>
    </tr>
    <tr id="labels">
      <td></td>
      <td class="numbers">Digging</td>
      <td></td>
      <td class="numbers">Structures Prod.</td>
      <td></td>
      <td class="numbers">Multiplier</td>
      <td></td>
      <td class="numbers">Pop. mult.</td>
      <td></td>
      <td class="numbers">Structures Cons.</td>
      <td></td>
      <td class="numbers">Empire</td>
      <td></td>
      <td class="numbers">Empire mult.</td>
      <td></td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatNumber } from "@/components/format";

export default defineComponent({
  name: "ResourceRate",
  props: ["resourceRate"],
  data() {
    return {};
  },
  components: {},
  methods: {
    formatNumber(num: number) {
      return formatNumber(num);
    },
  },
});
</script>
<style scoped>
table {
  font-size: x-small;
  min-width: 57ch;
}
.numbers {
  width: 5ch;
}
#labels {
  /* transform: rotate(45deg); */
  writing-mode: sideways-lr;
  vertical-align: top;
}
</style>
