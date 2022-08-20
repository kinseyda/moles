<template>
  <data-editor
    :dataIdDict="UnlockIDs"
    :dataIdList="idList"
    :deleteFunc="deleteID"
    :addFunc="addID"
    :stringifyData="unlockDataToString"
    v-model:selectedDatum="unlockSelected"
  >
    <template #dataDictName>unlockDataDict</template>
    <template #idDictName>UnlockIDs</template>
    <template #editArea>
      <table>
        <colgroup>
          <col class="id-type" />
        </colgroup>
        <tr class="list-row">
          <td>Resources</td>
          <td>
            <id-list
              v-model:idList="unlockDataDict[unlockSelected.id].resources"
              :idDict="ResourceIDs"
            >
            </id-list>
          </td>
        </tr>
        <tr class="list-row">
          <td>Upgrades</td>
          <td>
            <id-list
              v-model:idList="unlockDataDict[unlockSelected.id].upgrades"
              :idDict="UpgradeIDs"
            >
            </id-list>
          </td>
        </tr>
        <tr class="list-row">
          <td>Structures</td>
          <td>
            <id-list
              v-model:idList="unlockDataDict[unlockSelected.id].structures"
              :idDict="StructureIDs"
            >
            </id-list>
          </td>
        </tr>
        <tr class="list-row">
          <td>Expansions</td>
          <td>
            <id-list
              v-model:idList="unlockDataDict[unlockSelected.id].expansions"
              :idDict="ExpansionIDs"
            >
            </id-list>
          </td>
        </tr>
      </table>
    </template>
  </data-editor>
</template>

<script lang="ts">
import { getID } from "@/content/id-generator";
import { unlockDataDict, UnlockIDs, UpgradeIDs } from "@/content/upgrade-unlock-data";
import { defineComponent } from "vue";
import { EnumPair } from "../EnumIdSelector.vue";
import DataEditor from "../DataEditor.vue";
import IdList from "./IdList.vue";
import { ResourceIDs } from "@/content/resource-data";
import { StructureIDs } from "@/content/structure-data";
import { ExpansionIDs } from "@/content/expansion-data";
import { UnlockData } from "@/model/data-interfaces";

export default defineComponent({
  name: "UpgradeEditor",
  data() {
    return {
      ResourceIDs: ResourceIDs,
      UpgradeIDs: UpgradeIDs,
      StructureIDs: StructureIDs,
      ExpansionIDs: ExpansionIDs,
      unlockSelected: { id: -1, idName: "" },
      UnlockIDs: UnlockIDs,
      unlockDataDict: unlockDataDict,
      idList: Object.keys(UnlockIDs),
      unlockDataText: "",
      unlockIdsText: "",
    };
  },
  components: { DataEditor, IdList },
  methods: {
    deleteID(enumPair: EnumPair) {
      delete unlockDataDict[enumPair.id];
      delete UnlockIDs[enumPair.idName];
      this.unlockSelected = { id: -1, idName: "" };
      this.idList = Object.keys(UnlockIDs);
    },
    addID(enumID: string) {
      const newID = getID();
      UnlockIDs[enumID] = newID;
      unlockDataDict[newID] = {};
      this.idList = Object.keys(UnlockIDs);
    },
    unlockDataToString() {
      const findInv = function (id: number, idDict: { [idName: string]: number }) {
        return Object.keys(idDict).find((key) => {
          return idDict[key] === Number(id);
        });
      };
      const stringifyIdList = function (
        idList: number[],
        idDict: { [idName: string]: number },
        listName: string
      ) {
        let str = `[`;
        for (const id of idList) {
          str = `${str}${listName}.${findInv(id, idDict)}, `;
        }
        return `${str}]`;
      };
      const stringifyUnlockData = function (ud: UnlockData) {
        let str = `{`;
        if (ud.resources) {
          str = `${str}resources: ${stringifyIdList(
            ud.resources,
            ResourceIDs,
            "ResourceIDs"
          )}, `;
        }
        if (ud.upgrades) {
          str = `${str}upgrades: ${stringifyIdList(
            ud.upgrades,
            UpgradeIDs,
            "UpgradeIDs"
          )}, `;
        }
        if (ud.structures) {
          str = `${str}structures: ${stringifyIdList(
            ud.structures,
            StructureIDs,
            "StructureIDs"
          )}, `;
        }
        if (ud.expansions) {
          str = `${str}expansions: ${stringifyIdList(
            ud.expansions,
            ExpansionIDs,
            "ExpansionIDs"
          )}, `;
        }
        return `${str}}`;
      };
      let str = "{";
      for (const id in unlockDataDict) {
        const idName = findInv(Number(id), UnlockIDs);
        str = `${str}[UnlockIDs.${idName}]: ${stringifyUnlockData(unlockDataDict[id])}, `;
      }
      return `${str}}`;
    },
  },
});
</script>

<style scoped>
tr {
  height: 7.5ex;
}
.id-type {
  width: 12ch;
}
</style>
