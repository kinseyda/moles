Vue.component("resource-item", {
  props: ["resource"],
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
  },
  template: `<tr class="resource-row"><td>{{ resource.name }}:</td> <td>{{ formatNumber(resource.amount) }}</td> <td>/</td> <td>{{ formatNumber(resource.cap) }}</td> <td>{{ formatNumber(resource.rate) }} m/s</td> </tr>`,
});
