<template>
  <div id="id-list-outer">
    <span v-for="(_, index) in idListModel" :key="index" id="id-cont">
      <select v-model="idListModel[index]">
        <option v-for="id in idDict" :key="id" :value="id">
          {{ id }}: {{ idDictInv[id] }}
        </option>
      </select>
      <button id="del-button" @click="idListModel.splice(index, 1)">-</button>
    </span>
    <button id="add-button" @click="add">+</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IdList",
  props: ["idList", "idDict"],
  emits: ["update:idList"],
  data() {
    return { idListModel: [...(this.idList || [])] };
  },
  watch: {
    idListModel: {
      handler() {
        this.$emit("update:idList", this.idListModel);
      },
    },
    idList: {
      handler(newVal, oldVal) {
        if (JSON.stringify(oldVal) != JSON.stringify(newVal))
          this.idListModel = [...(this.idList || [])];
      },
    },
  },
  computed: {
    idDictInv() {
      const obj = {} as Record<number, string>;
      for (const idName in this.idDict) {
        obj[this.idDict[idName]] = idName;
      }
      return obj;
    },
  },
  methods: {
    add() {
      this.idListModel.push(-1);
    },
  },
});
</script>

<style scoped>
select {
  width: 25ch;
  border: 1px solid black;
  height: 5ex;
}
#id-cont {
  margin-right: 2ch;
}
#del-button,
#add-button {
  width: 5ex;
  height: 5ex;
  font-weight: bold;
}
</style>
