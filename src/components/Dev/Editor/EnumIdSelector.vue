<template>
  <div id="ids">
    <div id="id-edit">
      <input id="id-input" v-model="enteredID" placeholder="Enter an ID name" />
      <button @click="addID">Add ID</button>
    </div>
    <div>
      <select id="upgrade-selector" v-model="idSelected">
        <option
          v-for="idName in idList"
          :key="idName"
          :value="{ id: enumDict![idName], idName: idName }"
        >
          {{ enumDict![idName] }}: {{ idName }}
        </option>
      </select>
      <button @click="deleteID">Delete ID</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface EnumPair {
  id: number;
  idName: string;
}

export default defineComponent({
  name: "EnumIdSelector",
  props: ["selected", "enumDict", "idList"],
  data() {
    return {
      enteredID: "",
      idSelected: { ...this.selected } as EnumPair,
    };
  },
  computed: {},
  emits: ["update:selected", "addID", "deleteID"],
  watch: {
    idSelected: {
      handler() {
        this.$emit("update:selected", this.idSelected);
      },
    },
  },
  methods: {
    addID() {
      this.$emit("addID", this.enteredID);
    },
    deleteID() {
      this.$emit("deleteID", this.idSelected);
    },
  },
});
</script>

<style scoped>
#id-input {
  width: 25ch;
  height: 3ex;
  margin: 1ch;
  border: 1px solid var(--text-color);
}
#id-edit button {
  margin: 0;
  padding: 0.5ch;
}
#upgrade-selector {
  margin: 1ch;
  width: 25ch;
  border: 1px solid var(--text-color);
}
</style>
