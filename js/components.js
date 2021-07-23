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
    purchaseHover(upgrade) {
      app.purchaseInformationData = upgrade;
      app.descriptionBoxData = upgrade.dataObject.description;
    },
    resetDescription() {
      app.purchaseInformationData = undefined;
      app.resetDescription();
    },
    buyUpgrade(upgrade) {
      upgrade.buy();
    },
  },
  template: `<tr class="list-row clickable" @mouseover="purchaseHover(upgrade)" @mouseleave="resetDescription" @click="buyUpgrade(upgrade)"><td>{{ upgrade.dataObject.name }}</td></tr>`,
});

Vue.component("structure-item", {
  props: ["structure"],
  methods: {
    formatNumber(num) {
      return formatNumber(num);
    },
    purchaseHover(structure) {
      app.purchaseInformationData = structure;
      app.descriptionBoxData = structure.dataObject.description;
    },
    resetDescription() {
      app.purchaseInformationData = undefined;
      app.resetDescription();
    },
    buyStructure(structure) {
      structure.buy();
    },
  },
  template: `<tr class="list-row clickable" @mouseover="purchaseHover(structure)" @mouseleave="resetDescription" @click="buyStructure(structure)"><td 
                :class="{'purchase-available': structure.canBuy}">{{ structure.dataObject.name }}</td><td>{{ formatNumber(structure.amount) }}</td> </tr>`,
});

Vue.component("purchase-information", {
  props: ["purchase"],
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
  template: `<div><div class="purchase-desc" id="cost-container"><h4>Cost</h4><ul><li v-for="id in Object.keys(purchase.dataObject.cost)">
    <p>{{ getResource(id).dataObject.name }}: {{ purchase.dataObject.cost[id] }}</p></li></ul></div><div class="purchase-desc" id="effect-produce-container">
    <produce-details v-if="purchase._class === 'Structure'" v-bind:structure="purchase"></produce-details>
    <effect-details v-if="purchase._class === 'Upgrade'" v-bind:effect="purchase.dataObject.effect"
    v-bind:detailedDesc="getEffectDescription(purchase)" v-bind:upgradeType="getUpgradeType(purchase)"></effect-details></div></div>`,
});

Vue.component("produce-details", {
  props: ["structure"],
  methods: {
    getResource(id) {
      return game.resourceById(id);
    },
  },
  template: `<div><h4>Production:</h4><ul><li v-for="id in Object.keys(structure.dataObject.production)">
    <p>{{ getResource(id).dataObject.name }}: {{ structure.dataObject.production[id] }} m/s</p></li></ul></div>`,
});

Vue.component("effect-details", {
  props: ["upgradeType", "effect", "detailedDesc"],
  methods: {},
  template: `<div><h4>Effect</h4><p>{{ detailedDesc }}</p><multiply-effect v-if="upgradeType=='addMultiplier'" 
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
