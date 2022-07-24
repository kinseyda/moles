<template>
  <div id="outer">
    <span v-for="(_, index) in curObject" :key="index">
      <select v-model="curObject[index][0]">
        <option
          v-for="staticRes in idList"
          :key="staticRes"
          :value="ResourceIDs[staticRes]"
        >
          {{ ResourceIDs[staticRes] }}/{{ staticRes }}
        </option>
      </select>
      <input id="number-input" type="number" v-model="curObject[index][1]" />
      <button id="delete-button" @click="curObject.splice(index, 1)">Delete</button>
    </span>
    <button @click="curObject.push([Number.NaN, Number.NaN])" id="new-res-button">
      Add resource/number pair
    </button>
  </div>
</template>

<script lang="ts">
import { resourceDataDict, ResourceIDs } from "@/content/resource-data";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ResourceToNumSelector",
  props: ["modelValue"],
  data() {
    return {
      resourceDataDict: resourceDataDict,
      ResourceIDs: ResourceIDs,
      idList: Object.keys(ResourceIDs) as (keyof typeof ResourceIDs)[],
      curObject: this.setCurObject() as [number, number][],
    };
  },
  emits: ["update:modelValue"],
  watch: {
    curObject: {
      deep: true,
      handler() {
        this.emitNewObject();
      },
    },
  },
  methods: {
    emitNewObject() {
      let dict: { [resId: number]: number } = {};
      for (const res of this.curObject) {
        dict[res[0]] = res[1];
      }
      this.$emit("update:modelValue", dict);
    },
    setCurObject() {
      return this.modelValue !== undefined
        ? ((Object.keys(this.modelValue as { [resID: number]: number }).map((key) => [
            key,
            this.modelValue[key],
          ]) as unknown) as [number, number][])
        : ([] as [number, number][]);
    },
    resetCurObject() {
      return [] as [number, number][];
    },
  },
});
</script>

<style scoped>
#outer {
  display: flex;
  flex-direction: column;
}
select {
  margin: 1ch;
  border: 1px solid var(--text-color);
}
#number-input {
  width: 10ch;
  height: 2.5ex;
  border: 1px solid var(--text-color);
}
#new-res-button {
  height: 2em;
  width: 30ch;
  padding: 0.5ch;
}
#delete-button {
  width: 7ch;
  height: 2em;
  padding: 0.5ch;
}
</style>
