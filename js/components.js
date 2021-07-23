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
  template: `<tr class="list-row"><td>{{ getResourceData(resource.id).name }}:</td> <td>{{ formatNumber(resource.amount) }}</td> <td>/</td> <td>{{ formatNumber(resource.cap) }}</td> <td>{{ formatNumber(resource.trueRate) }} m/s</td> </tr>`,
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
      app.upgradeInformationData = upgrade;
      app.descriptionBoxData = this.getUpgradeData(upgrade.id).description;
    },
    resetDescription() {
      app.upgradeInformationData = undefined;
      app.resetDescription();
    },
    buyUpgrade(upgrade) {
      upgrade.buy();
    },
  },
  template: `<tr class="list-row clickable" @mouseover="upgradeHover(upgrade)" @mouseleave="resetDescription" @click="buyUpgrade(upgrade)"><td>{{ getUpgradeData(upgrade.id).name }}</td></tr>`,
});

Vue.component("structure-item", {
  props: ["structure"],
  methods: {
    getStructureData(id) {
      return structureDict[id];
    },
    formatNumber(num) {
      return formatNumber(num);
    },
    buyStructure(structure) {
      structure.buy();
    },
  },
  template: `<tr class="list-row clickable" @click="buyStructure(structure)"><td>{{ getStructureData(structure.id).name }}:</td><td>{{ formatNumber(structure.amount) }}</td> </tr>`,
});

Vue.component("upgrade-information", {
  props: ["upgrade"],
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
    getResourceData(id) {
      return resourceDict[id];
    },
    getUpgradeData(id) {
      return upgradeDict[id];
    },
    getUpgradeType(id) {
      return this.getUpgradeData(id).effect.func;
    },
    getEffectDescription(id) {
      switch (this.getUpgradeType(id)) {
        case "addMultiplier":
          return "Multiplies resource gains:";
        default:
          return "Does something?";
      }
    },
  },
  template: `<div><div class="upgrade-desc" id="cost-container"><h4>Cost</h4><ul><li v-for="id in Object.keys(getUpgradeData(upgrade.id).cost)">
    <p>{{ getResourceData(id).name }}: {{ getUpgradeData(upgrade.id).cost[id] }}</p></li></ul></div><div class="upgrade-desc" id="effect-container">
    <h4>Effect</h4><effect-details v-bind:effect="getUpgradeData(upgrade.id).effect"
    v-bind:detailedDesc="getEffectDescription(upgrade.id)" v-bind:upgradeType="getUpgradeType(upgrade.id)"></effect-details></div></div>`,
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
    getResourceData(id) {
      return resourceDict[id];
    },
  },
  template: `<div><ul><li v-for="id in Object.keys(effect.params[0])">
    <p>{{ getResourceData(id).name }}: +{{ effect.params[0][id]*100 }}%</p></li></ul></div>`,
});
