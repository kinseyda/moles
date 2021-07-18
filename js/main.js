var app = new Vue({
  el: "#app",
  data: {
    gameData: {
      resourceList: startingResources,
      lastUpdate: Date.now(),
    },
  },
  methods: {
    toggleTheme() {
      const htmlTag = document.getElementsByTagName("html")[0];
      if (htmlTag.hasAttribute("theme")) {
        htmlTag.removeAttribute("theme");
        return;
      }
      htmlTag.setAttribute("theme", "dark");
    },
    formatNumber(num) {
      return formatNumber(num, "");
    },
    gameLoop() {
      gameLoop(this);
    },
    saveGame() {
      localStorage.setItem("molesSave", JSON.stringify(this.gameData));
    },
    loadGame() {
      let save = JSON.parse(localStorage.getItem("molesSave"));
      if (this.saveGame) {
        this.gameData = save;
      }
    },
  },
  mounted() {
    setInterval(this.gameLoop, 50);
  },
});

function gameLoop(app) {
  let updateTime = Date.now();
  let diff = (updateTime - app.gameData.lastUpdate) / 1000;

  for (let i = 0; i < app.gameData.resourceList.length; i++) {
    app.gameData.resourceList[i].amount +=
      app.gameData.resourceList[i].rate * diff;
    if (
      app.gameData.resourceList[i].amount > app.gameData.resourceList[i].cap
    ) {
      app.gameData.resourceList[i].amount = app.gameData.resourceList[i].cap;
    }
  }

  app.gameData.lastUpdate = updateTime;
}
