export interface UpgradeData {
    name: string;
    description: string;
    effect: { func: string, params: any[] }
    cost:  {[id: number]: number}
}
export interface ResourceData {
    name: string;
}
export interface StructureData {
    name: string;
    description: string;
    production:  {[id: number]: number}
    cost:  {[id: number]: number}
    increase:  {[id: number]: number}
}
export let upgradeDict: { [id: number]: UpgradeData } = {};
upgradeDict = {
    0: {
        name: "Shovel",
        description: "Shovel desc",
        effect: {
            func: "addMultiplier",
            params: [{1: 1 }]
        },
        cost: {
            1: 10
        }
    },
    1: {
        name: "Filler",
        description: "Filler desc",
        effect: {
            func: "none",
            params: [],
        },
        cost: {
            1: 9999
        }
    },
    2: {
        name: "Filler",
        description: "Filler desc",
        effect: {
            func: "none",
            params: [],},
        cost: {
            1: 9999
        }
    },
    3: {
        name: "Filler",
        description: "Filler desc",
        effect: {
            func: "none",
            params: [],},
        cost: {
            1: 9999
        }
    },
    4: {
        name: "Filler",
        description: "Filler desc",
        effect: {
            func: "none",
            params: [],},
        cost: {
            1: 9999
        }
    },
    5: {
        name: "Filler",
        description: "Filler desc",
        effect: {
            func: "none",
            params: [],},
        cost: {
            1: 9999
        }
    },
    6: {
        name: "Filler",
        description: "Filler desc",
        effect: {
            func: "none",
            params: [],},
        cost: {
            1: 9999
        }
    },
    7: {
        name: "Filler",
        description: "Filler desc",
        effect: {
            func: "none",
            params: [],},
        cost: {
            1: 9999
        }
    },
    8: {
        name: "Filler",
        description: "Filler desc",
        effect: {
            func: "none",
            params: [],},
        cost: {
            1: 9999
        }
    },
    9: {
        name: "Filler",
        description: "Filler desc",
        effect: {
            func: "none",
            params: [],},
        cost: {
            1: 9999
        }
    },
    10: {
        name: "Filler",
        description: "Filler desc",
        effect: {
            func: "none",
            params: [],},
        cost: {
            1: 9999
        }
    }
}

export let resourceDict: {[id: number]: ResourceData} = {};
resourceDict = {
    0: { name: "Area" },
    1: { name: "Dirt" },
    2: { name: "Iron" },
    3: { name: "Gold" },
    4: { name: "Filler" },
    5: { name: "Filler" },
    6: { name: "Filler" },
    7: { name: "Filler" },
    8: { name: "Filler" },
    9: { name: "Filler" },
    10: { name: "Filler" },
}
export let structureDict: {[id: number]: StructureData} = {};
structureDict = {
  0: {
    name: "Ball of dirt",
    description: "Compress all the dirt you have into a ball",
    production: { 1: 0.1 },
    cost: { 1: 10 },
    increase: { 1: 1.1 }
  },
  1: {
    name: "Tunnel bore",
    description: "idk",
    production: { 1: 10 },
    cost: { 1: 100 },
    increase: { 1: 1.2 }
  }
}
