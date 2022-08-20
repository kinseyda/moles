<template>
  <data-editor
    :dataIdDict="UpgradeIDs"
    :dataIdList="idList"
    :deleteFunc="deleteID"
    :addFunc="addID"
    :stringifyData="upgradeDataDictToString"
    v-model:selectedDatum="upgradeSelected"
  >
    <template #dataDictName>upgradeDataDict</template>
    <template #idDictName>UpgradeIDs</template>
    <template #editArea
      ><div v-if="upgradeSelected.id != -1">
        <table id="upgrade-table">
          <tr>
            <td>Name:</td>
            <td>
              <textarea v-model="upgradeDataDict[upgradeSelected.id].name" />
            </td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>
              <textarea v-model="upgradeDataDict[upgradeSelected.id].description" />
            </td>
          </tr>
          <tr>
            <td>Effects:</td>
            <td>
              <table>
                <upgrade-effect-editor
                  v-for="(item, index) in upgradeDataDict[upgradeSelected.id].effects"
                  :key="item.func"
                  :upgradeID="upgradeSelected.id"
                  :effectIndex="index"
                ></upgrade-effect-editor>
              </table>
              <button
                @click="
                  upgradeDataDict[upgradeSelected.id].effects.push({
                    func: UpgradeTypes.none,
                    params: {},
                  })
                "
              >
                Add effect
              </button>
              <p>
                Current effects:
                {{ upgradeDataDict[upgradeSelected.id].effects }}
              </p>
            </td>
          </tr>
          <tr>
            <td>Cost:</td>
            <td>
              <resource-to-num-selector
                v-model="upgradeDataDict[upgradeSelected.id].cost"
              ></resource-to-num-selector>
              <p>Current cost: {{ upgradeDataDict[upgradeSelected.id].cost }}</p>
            </td>
          </tr>
          <tr>
            <td>Starting Parameters:</td>
            <td>
              <div id="starting-params">
                <div>
                  <button
                    @click="
                      upgradeDataDict[upgradeSelected.id].startingParams = {
                        ...defaultStartingParams,
                      }
                    "
                  >
                    Set custom starting params
                  </button>
                  <button
                    @click="
                      upgradeDataDict[upgradeSelected.id].startingParams = undefined
                    "
                  >
                    Set default starting params
                  </button>
                </div>
                <div v-if="upgradeDataDict[upgradeSelected.id].startingParams">
                  <div>
                    Bought:
                    <input
                      type="checkbox"
                      v-model="upgradeDataDict[upgradeSelected.id].startingParams!.bought"
                    />
                  </div>
                  <div>
                    Discount:
                    <resource-to-num-selector
                      v-model="upgradeDataDict[upgradeSelected.id].startingParams!.discount"
                    >
                    </resource-to-num-selector>
                  </div>
                </div>
              </div>
              <p>
                Current starting params:
                {{ upgradeDataDict[upgradeSelected.id].startingParams }}
              </p>
            </td>
          </tr>
        </table>
      </div></template
    >
  </data-editor>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  unlockDataDict,
  upgradeDataDict,
  UpgradeIDs,
  defaultUpgradeStartingParams,
  PermanentUnlocks,
  UnlockIDs,
} from "@/content/upgrade-unlock-data";
import UpgradeEffectEditor from "./UpgradeEffectEditor.vue";
import ResourceToNumSelector from "../ResourceToNumSelector.vue";
import { UpgradeData, UpgradeEffect, UpgradeTypes } from "@/model/data-interfaces";
import { ResourceIDs } from "@/content/resource-data";
import { EnumPair } from "../EnumIdSelector.vue";
import { getID } from "@/content/id-generator";
import DataEditor from "../DataEditor.vue";

export default defineComponent({
  name: "UpgradeEditor",
  data() {
    return {
      upgradeDataDict: upgradeDataDict,
      unlockDataDict: unlockDataDict,
      UpgradeIDs: UpgradeIDs,
      idList: Object.keys(UpgradeIDs),
      UpgradeTypes: UpgradeTypes,
      upgradeSelected: { id: -1, idName: "" },
      defaultStartingParams: defaultUpgradeStartingParams,
    };
  },
  components: {
    UpgradeEffectEditor,
    ResourceToNumSelector,
    DataEditor,
  },
  methods: {
    deleteID(enumPair: EnumPair) {
      delete upgradeDataDict[enumPair.id];
      delete UpgradeIDs[enumPair.idName];
      this.upgradeSelected = { id: -1, idName: "" };
      this.idList = Object.keys(UpgradeIDs);
    },
    addID(enumID: string) {
      const newID = getID();
      UpgradeIDs[enumID] = newID;
      upgradeDataDict[newID] = {
        name: `${enumID}NAME`,
        description: `${enumID}DESC`,
        effects: [],
        cost: {},
        startingParams: { ...defaultUpgradeStartingParams },
      };
      this.idList = Object.keys(UpgradeIDs);
    },
    upgradeDataDictToString() {
      const stringifyResourceDict = function (resDict: { [resId: number]: number }) {
        let str = "{ ";
        for (const id in resDict) {
          const idName = Object.keys(ResourceIDs).find((key) => {
            return ResourceIDs[key as keyof typeof ResourceIDs] === Number(id);
          });
          str = `${str}[ResourceIDs.${idName}]: ${resDict[id]}, `;
        }
        return `${str} }`;
      };
      const stringifyEffect = function (effect: UpgradeEffect) {
        let paramStr = "{";
        if (effect.params[UpgradeTypes.digRate] != undefined) {
          paramStr = `${paramStr}[UpgradeTypes.${
            UpgradeTypes[UpgradeTypes.digRate]
          }]: ${stringifyResourceDict(effect.params[UpgradeTypes.digRate]!)}, `;
        }
        if (effect.params[UpgradeTypes.empireMultiplier] != undefined) {
          paramStr = `${paramStr}[UpgradeTypes.${
            UpgradeTypes[UpgradeTypes.empireMultiplier]
          }]: ${effect.params[UpgradeTypes.empireMultiplier]!}, `;
        }
        if (effect.params[UpgradeTypes.multiplier] != undefined) {
          paramStr = `${paramStr}[UpgradeTypes.${
            UpgradeTypes[UpgradeTypes.multiplier]
          }]: ${stringifyResourceDict(effect.params[UpgradeTypes.multiplier]!)}, `;
        }
        if (effect.params[UpgradeTypes.permanentUnlock] != undefined) {
          paramStr = `${paramStr}[UpgradeTypes.${
            UpgradeTypes[UpgradeTypes.permanentUnlock]
          }]: PermanentUnlocks.${
            PermanentUnlocks[effect.params[UpgradeTypes.permanentUnlock]!]
          }, `;
        }
        if (effect.params[UpgradeTypes.unlock] != undefined) {
          const unlockName = Object.keys(UnlockIDs).find((key) => {
            return UnlockIDs[key] === Number(effect.params[UpgradeTypes.unlock]!);
          });
          paramStr = `${paramStr}[UpgradeTypes.${
            UpgradeTypes[UpgradeTypes.unlock]
          }]: UnlockIDs.${unlockName}, `;
        }
        paramStr = `${paramStr} }`;

        return `{ func: UpgradeTypes.${UpgradeTypes[effect.func]}, params: ${paramStr} }`;
      };
      const stringifyUpgradeData = function (upgradeData: UpgradeData) {
        let effectStr = `[`;
        for (const ef of upgradeData.effects) {
          effectStr = `${effectStr}${stringifyEffect(ef)}, `;
        }
        effectStr = `${effectStr}]`;
        return `{ name: "${upgradeData.name}", description: "${
          upgradeData.description
        }", effects: ${effectStr}, cost: ${stringifyResourceDict(upgradeData.cost)}, ${
          upgradeData.startingParams
            ? `startingParams: ${`{ bought: ${
                upgradeData.startingParams.bought
              }, discount: ${stringifyResourceDict(
                upgradeData.startingParams.discount
              )} }`}`
            : ""
        }}`;
      };

      let str = "{ ";
      for (const id in upgradeDataDict) {
        const idName = Object.keys(UpgradeIDs).find((key) => {
          return UpgradeIDs[key] === Number(id);
        });
        str = `${str}[UpgradeIDs.${idName}]: ${stringifyUpgradeData(
          upgradeDataDict[id]
        )}, `;
      }
      return `${str} }`;
    },
  },
});
</script>

<style scoped>
textarea {
  border: 1px solid var(--text-color);
  height: 7.5ex;
  resize: none;
  width: calc(100% - 2ch);
  margin: 0.5ch;
}
tr {
  border-top: 1px solid var(--text-color);
  border-bottom: 1px solid var(--text-color);
  border-style: dotted;
}
#starting-params {
  display: flex;
  flex-direction: row;
}
#starting-params > * {
  flex: 1 1 0;
}
</style>
