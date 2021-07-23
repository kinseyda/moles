Vue.component("resource-item", {
  props: ["resource"],
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
  },
  template: `<tr class="list-row"><td>{{ resource.dataObject.name }}:</td> <td>{{ formatNumber(resource.amount) }}</td> <td>/</td> <td>{{ formatNumber(resource.cap) }}</td> <td>{{ formatNumber(resource.trueRate) }} m/s</td> </tr>`,
});

Vue.component("upgrade-item", {
  props: ["upgrade"],
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
    upgradeHover(upgrade) {
      app.upgradeInformationData = upgrade;
      app.descriptionBoxData = upgrade.dataObject.description;
    },
    resetDescription() {
      app.upgradeInformationData = undefined;
      app.resetDescription();
    },
    buyUpgrade(upgrade) {
      upgrade.buy();
    },
  },
  template: `<tr class="list-row clickable" @mouseover="upgradeHover(upgrade)" @mouseleave="resetDescription" @click="buyUpgrade(upgrade)"><td>{{ upgrade.dataObject.name }}</td></tr>`,
});

Vue.component("structure-item", {
  props: ["structure"],
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
    buyStructure(structure) {
      structure.buy();
    },
  },
  template: `<tr class="list-row clickable" @click="buyStructure(structure)"><td>{{ structure.dataObject.name }}:</td><td>{{ formatNumber(structure.amount) }}</td> </tr>`,
});

Vue.component("upgrade-information", {
  props: ["upgrade"],
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
    getUpgradeType(upgrade) {
      return upgrade.dataObject.effect.func;
    },
    getResource(id) {
      return game.resourceById(id);
    },
    getEffectDescription(upgrade) {
      switch (this.getUpgradeType(upgrade)) {
        case "addMultiplier":
          return "Multiplies resource gains:";
        default:
          return "Does something?";
      }
    },
  },
  template: `<div><div class="upgrade-desc" id="cost-container"><h4>Cost</h4><ul><li v-for="id in Object.keys(upgrade.dataObject.cost)">
    <p>{{ getResource(id).dataObject.name }}: {{ upgrade.dataObject.cost[id] }}</p></li></ul></div><div class="upgrade-desc" id="effect-container">
    <h4>Effect</h4><effect-details v-bind:effect="upgrade.dataObject.effect"
    v-bind:detailedDesc="getEffectDescription(upgrade)" v-bind:upgradeType="getUpgradeType(upgrade)"></effect-details></div></div>`,
});

Vue.component("effect-details", {
  props: ["upgradeType", "effect", "detailedDesc"],
  methods: {},
  template: `<div><p>{{ detailedDesc }}</p><multiply-effect v-if="upgradeType=='addMultiplier'" 
  v-bind:effect="effect"></multiply-effect></div>`,
});

Vue.component("multiply-effect", {
  props: ["effect", "detailedDesc"],
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
    getResource(id) {
      return game.resourceById(id);
    },
  },
  template: `<div><ul><li v-for="id in Object.keys(effect.params[0])">
    <p>{{ getResource(id).dataObject.name }}: +{{ effect.params[0][id]*100 }}%</p></li></ul></div>`,
});
