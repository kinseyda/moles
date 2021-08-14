<template>
  <div>
    <p>Log:</p>
    <ol>
      <li v-for="ev in eventList" :key="ev.id">
        [{{ formatTime(timeSince(ev.timeSeconds)) }} ago]
        {{ ev.dataObject.eventText }}
      </li>
    </ol>
  </div>
</template>
<script lang="ts">
import Identifiable from "@/js/model/identifiable";
import { eventDataDict } from "@/js/staticData/eventData";
import { defineComponent } from "vue";
import { formatTimeConcise } from "@/js/utils";
import { game } from "@/js/model/game";

class TextLogEvent extends Identifiable {
  timeSeconds: number;
  eventId: number;
  constructor(id: number, eventId: number) {
    super(id, "TextLogEvent");
    this.timeSeconds = game.eventsDict[eventId] / 1000;
    this.eventId = eventId;
  }
  get dataObject() {
    return eventDataDict[this.eventId];
  }
}

export default defineComponent({
  name: "EventLog",
  props: ["eventsDict"],
  data() {
    return {
      currentTime: 0,
    };
  },
  computed: {
    eventList(): TextLogEvent[] {
      let lst = [];
      let currentEvId = 0;
      for (const evId in this.eventsDict) {
        lst.push(new TextLogEvent(currentEvId++, Number(evId)));
      }
      return lst;
    },
  },
  methods: {
    timeSince(timeAchieved: number): number {
      return this.currentTime - timeAchieved;
    },
    formatTime(time: number) {
      return formatTimeConcise(time);
    },
    adjustTime() {
      this.currentTime = Date.now() / 1000;
    },
  },
  mounted() {
    this.adjustTime();
    setInterval(this.adjustTime, 1000);
  },
});
</script>
<style scoped>
ol {
  border: 1px solid var(--text-color);
  list-style: none;
}
</style>