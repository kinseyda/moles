<template>
    <tr class="list-row"><td>{{ resource.dataObject.name }}:</td> <td>{{ formatNumber(resource.amount) }}</td> <td>/</td> <td>{{ formatNumber(resource.cap) }}</td> <td>{{ formatNumber(resource.trueRate) }} m/s</td> </tr>
</template>

<script>
import {formatNumber} from "../js/utils"

export default {
  name: 'ResourceItem',
  props: ["resource"],
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
  },
}
</script>
