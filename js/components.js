Vue.component("resource-item", {
  props: ["resource"],
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
  },
  template: `<tr class="list-row"><td>{{ resource.name }}:</td> <td>{{ formatNumber(resource.amount) }}</td> <td>/</td> <td>{{ formatNumber(resource.cap) }}</td> <td>{{ formatNumber(resource.rate) }} m/s</td> </tr>`,
});

Vue.component("upgrade-item", {
  props: ["upgrade"],
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
    upgradeHover(upgrade) {
      app.descriptionBoxData = upgrade.description;
    },
    resetDescription() {
      return app.resetDescription();
    },
    buyUpgrade(upgrade) {
      upgrade.buy();
    },
  },
  template: `<tr class="list-row upgrade-row" @mouseover="upgradeHover(upgrade)" @mouseleave="resetDescription" @click="buyUpgrade(upgrade)"><td>{{ upgrade.name }}</td></tr>`,
});
