var app = new Vue({
  el: "#app",
  data: {
    descriptionBoxData: defaultDescription,
    upgradeInformationData: undefined,
    gameData: game,
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
      const recurConstruct = (obj) => {
        if (obj.length > 0 || Object.keys(obj).length > 0) {
          // If list or object, recurse through each thing contained to assign all the referenced items into the class they need
          for (let i in obj) {
            if (i != "_class") {
              obj[i] = recurConstruct(obj[i]);
            }
          }
        }
        if (
          obj["_class"] == "Game" ||
          obj["_class"] == "Resource" ||
          obj["_class"] == "Upgrade" ||
          obj["_class"] == "SerializableClass"
        ) {
          // We only need to do anything if the object we're looking at has a "_class" key, otherwise it should just be returned
          switch (obj["_class"]) {
            case "Game":
              return Object.assign(new Game(), obj);
            case "Resource":
              return Object.assign(new Resource(), obj);
            case "Upgrade":
              return Object.assign(new Upgrade(), obj);
            default:
              //Shouldn't happen, nothing should be a SerializableClass without being one of the classes listed above, and constructed that way
              return Object.assign(new SerializableClass(), obj);
          }
        }
        return obj;
      };
      let sto = localStorage.getItem("molesSave");
      let save = JSON.parse(sto);
      if (this.saveGame) {
        game = recurConstruct(save);
        this.gameData = game;
      }
    },
    resetDescription() {
      this.descriptionBoxData = defaultDescription;
    },
  },
  mounted() {
    setInterval(this.gameLoop, 50);
  },
});

function gameLoop(app) {
  let updateTime = Date.now();
  let diff = (updateTime - game.lastUpdate) / 1000;

  for (let i = 0; i < game.resourceList.length; i++) {
    game.resourceList[i].amount += game.resourceList[i].trueRate * diff;
    if (game.resourceList[i].amount > game.resourceList[i].cap) {
      game.resourceList[i].amount = game.resourceList[i].cap;
    }
  }

  game.lastUpdate = updateTime;
}
