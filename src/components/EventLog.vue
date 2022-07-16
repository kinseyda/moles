<template>
  <div id="outer">
    <h2
      id="label"
      @mouseover="hoverDescString(uiDescriptions['log'])"
      @mouseleave="resetDesc()"
    >
      Log:
    </h2>
    <button @click="resetList()" id="see-button">Mark all seen</button>
    <div id="log-container">
      <transition-group name="list" tag="ol">
        <li
          v-for="ev in eventList"
          :key="ev.id"
          @mouseover="
            hoverDescIdentifiable(ev);
            ev.see();
          "
          @mouseleave="resetDesc()"
          :class="{ unseen: !ev.seen }"
        >
          [{{ formatTime(timeSince(ev.timeSeconds)) }}<small> ago</small>]
          {{ ev.dataObject.eventText }}
        </li>
      </transition-group>
      <particle-producer ref="eventLogDirtProd"></particle-producer>
    </div>
  </div>
</template>
<script lang="ts">
import { eventDataDict } from "@/content/event-data";
import { defineComponent } from "vue";
import { formatTimeConcise } from "@/components/format";
import { game } from "@/model/game";
import { mapMutations } from "vuex";
import { uiDescriptions } from "@/components/ui-descriptions";
import ParticleProducer from "@/components/Particles/ParticleProducer.vue";

class TextLogEvent {
  id: number;
  timeSeconds: number;
  eventId: number;
  seen: boolean;
  constructor(id: number, eventId: number, seen?: boolean) {
    this.id = id;
    this.timeSeconds = game.eventsDict[eventId] / 1000;
    this.eventId = eventId;
    this.seen = seen || false;
  }
  get dataObject() {
    return eventDataDict[this.eventId];
  }
  see() {
    this.seen = true;
  }
}

export default defineComponent({
  name: "EventLog",
  props: ["eventsDict"],
  data() {
    return {
      currentTime: 0,
      uiDescriptions: uiDescriptions,
      eventList: [] as TextLogEvent[],
      resetNextUp: false,
      adjustTimeID: -1,
    };
  },
  components: {
    ParticleProducer,
  },
  watch: {
    eventsDict: {
      deep: true,
      handler: function () {
        if (this.resetNextUp) {
          this.resetList();
          this.resetNextUp = false;
        } else {
          const newList = this.makeList(this.eventList);
          if (this.eventList != newList) {
            this.eventList = newList;
            const prod = this.$refs["eventLogDirtProd"] as typeof ParticleProducer;
            if (prod) {
              prod.updateParticles(32);
            }
          }
        }
      },
    },
  },
  methods: {
    ...mapMutations(["hoverDescIdentifiable", "hoverDescString", "resetDesc"]),
    changeInterval(newInterval: number) {
      if (this.adjustTimeID != -1) {
        clearInterval(this.adjustTimeID);
      }
      this.adjustTimeID = setInterval(this.adjustTime, newInterval);
    },
    timeSince(timeAchieved: number): number {
      return Math.max(this.currentTime - timeAchieved, 0);
    },
    formatTime(time: number) {
      return formatTimeConcise(time);
    },
    makeList(lst: TextLogEvent[], newSeen?: boolean) {
      let currentLogEvId = lst.length;
      for (const evId in this.eventsDict) {
        if (!lst.find((element) => element.eventId == Number(evId))) {
          lst.push(new TextLogEvent(currentLogEvId++, Number(evId), newSeen));
        }
      }
      lst.sort(function (a, b) {
        return b.timeSeconds - a.timeSeconds;
      });

      for (let i = 0; i < lst.length; i++) {
        // Prevents weird movements when adding items
        lst[lst.length - 1 - i].id = i;
      }
      return lst;
    },
    updateList() {
      this.eventList = this.makeList(this.eventList);
    },
    resetList() {
      this.eventList = this.makeList([], true);
    },
    adjustTime() {
      this.currentTime = Date.now() / 1000;
    },
  },
  mounted() {
    this.adjustTime();
    this.updateList();
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
  padding-left: 9.5ch;
  text-indent: -9.5ch;
  transition: all 1s ease;
}
#label {
  flex: 0 0 1em;
}
#outer {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
#log-container {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1 0 0;
}
#see-button {
  margin-left: auto;
  margin-top: -1.5em;
  width: 15ch;
}
.unseen {
  font-weight: bold;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from {
  background-color: var(--text-color);
  color: var(--global-bg-color);
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
