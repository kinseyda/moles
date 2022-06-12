<template>
  <div id="outer">
    <h2
      id="label"
      @mouseover="hoverDescString(uiDescriptions['log'])"
      @mouseleave="resetDesc()"
    >
      Log:
    </h2>
    <ol>
      <li
        v-for="ev in eventList"
        :key="ev.id"
        @mouseover="hoverDescIdentifiable(ev)"
        @mouseleave="resetDesc()"
      >
        [{{ formatTime(timeSince(ev.timeSeconds)) }} ago]
        {{ ev.dataObject.eventText }}
      </li>
    </ol>
  </div>
</template>
<script lang="ts">
import { eventDataDict } from "@/content/event-data";
import { defineComponent } from "vue";
import { formatTimeConcise } from "@/components/format";
import { game } from "@/model/game";
import { mapMutations } from "vuex";
import { uiDescriptions } from "@/components/ui-descriptions";

class TextLogEvent {
  id: number;
  timeSeconds: number;
  eventId: number;
  constructor(id: number, eventId: number) {
    this.id = id;
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
      uiDescriptions: uiDescriptions,
    };
  },
  computed: {
    eventList(): TextLogEvent[] {
      let lst = [];
      let currentEvId = 0;
      for (const evId in this.eventsDict) {
        lst.push(new TextLogEvent(currentEvId++, Number(evId)));
      }
      lst.sort(function (a, b) {
        return b.timeSeconds - a.timeSeconds;
      });
      return lst;
    },
  },
  methods: {
    ...mapMutations(["hoverDescIdentifiable", "hoverDescString", "resetDesc"]),
    timeSince(timeAchieved: number): number {
      return Math.max(this.currentTime - timeAchieved, 0);
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
  background-color: var(--global-bg-color);
  border: 1px solid var(--text-color);
  list-style: none;
  overflow-y: scroll;
  flex: 1 0 0;
}
li {
  padding-left: 10ch;
  text-indent: -10ch;
}
#label {
  flex: 0 0 1em;
}
#outer {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
</style>