Vue.component("resource-item", {
  props: ["resource"],
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
    getResourceData(id) {
      return resourceDict[id];
    },
  },
  template: `<tr class="list-row"><td>{{ getResourceData(resource.id).name }}:</td> <td>{{ formatNumber(resource.amount) }}</td> <td>/</td> <td>{{ formatNumber(resource.cap) }}</td> <td>{{ formatNumber(resource.rate) }} m/s</td> </tr>`,
});

Vue.component("upgrade-item", {
  props: ["upgrade"],
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
    getUpgradeData(id) {
      return upgradeDict[id];
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
  template: `<tr class="list-row upgrade-row" @mouseover="upgradeHover(upgrade)" @mouseleave="resetDescription" @click="buyUpgrade(upgrade)"><td>{{ getUpgradeData(upgrade.id).name }}</td></tr>`,
});
