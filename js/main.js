var app = new Vue({
  el: "#app",
  data: {
    resourceList: startingResources,
    lastUpdate: performance.now(),
  },
  methods: {
    toggleTheme: function () {
      const htmlTag = document.getElementsByTagName("html")[0];
      if (htmlTag.hasAttribute("theme")) {
        htmlTag.removeAttribute("theme");
        return;
      }
      htmlTag.setAttribute("theme", "dark");
    },
    gameLoop() {
      gameLoop(this);
    },
  },
  mounted() {
    setInterval(this.gameLoop, 50);
  },
});

function gameLoop(app) {
  let updateTime = performance.now();
  let diff = (updateTime - app.lastUpdate) / 1000;

  for (let i = 0; i < app.resourceList.length; i++) {
    app.resourceList[i].amount += app.resourceList[i].rate * diff;
    if (app.resourceList[i].amount > app.resourceList[i].cap) {
      app.resourceList[i].amount = app.resourceList[i].cap;
    }
  }

  app.lastUpdate = updateTime;
}
