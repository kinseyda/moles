<template>
  <div id="top">
    <enum-id-selector
      v-model:selected="datumSelected"
      :enumDict="dataIdDict"
      :idList="dataIdList"
      @addID="addID"
      @deleteID="deleteID"
    ></enum-id-selector>
    <div id="output">
      New values (paste over content variables to have changes be persistent)
      <button @click="setOutputText">Get new dicts</button>
      <div id="output-texts">
        <div>
          <i>
            <b> <slot name="dataDictName"></slot> </b>
          </i>
          <textarea readonly v-model="datatypeDataText"></textarea>
        </div>
        <div>
          <i>
            <b> <slot name="idDictName"></slot> </b>
          </i>
          <textarea readonly v-model="datatypeIdsText"></textarea>
        </div>
      </div>
    </div>
  </div>
  <div v-if="datumSelected.id != -1">
    <slot name="editArea"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EnumIdSelector, { EnumPair } from "./EnumIdSelector.vue";

export default defineComponent({
  name: "DataEditor",
  props: [
    "selectedDatum",
    "dataIdDict",
    "dataIdList",
    "deleteFunc",
    "addFunc",
    "stringifyData",
  ],
  data() {
    return {
      datumSelected: { id: -1, idName: "" },
      datatypeDataText: "",
      datatypeIdsText: "",
    };
  },
  watch: {
    datumSelected: {
      handler() {
        this.$emit("update:selectedDatum", this.datumSelected);
      },
    },
  },
  emits: ["update:selectedDatum"],
  components: { EnumIdSelector },
  methods: {
    deleteID(enumPair: EnumPair) {
      this.deleteFunc(enumPair);
    },
    addID(enumID: string) {
      this.addFunc(enumID);
    },
    setOutputText() {
      let idDictStr = "{ ";
      for (const idName in this.dataIdDict) {
        idDictStr = `${idDictStr}${idName}: getID(), `;
      }
      idDictStr = `${idDictStr} }`;
      this.datatypeDataText = this.stringifyData();
      this.datatypeIdsText = idDictStr;
    },
  },
});
</script>

<style scoped>
* {
  font-size: small;
}
#output-texts {
  display: flex;
  flex-direction: row;
}
#output-texts > div {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
}
#output-texts > div > textarea {
  border: 1px solid var(--text-color);
  height: 7.5ex;
  resize: none;
  width: calc(100% - 2ch);
  margin: 0.5ch;
}
#top {
  display: flex;
  flex-direction: row;
}
#output {
  margin-left: 10ch;
  flex: 1 0 0;
}
</style>
