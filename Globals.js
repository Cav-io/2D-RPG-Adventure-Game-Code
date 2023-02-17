const playerHUD = {
  transformHUD: new HUD({
    type: "transform",
    opacity: 0.5,

  }),
  heartHUD: new HUD({
    src: "HUD/Heart.png",
    opacity: 1
  })
}

const playerEffects = {
  transformFX: new FX({
    name: 'Shield',
    isFinished: true
  })
}

window.player = new Player({
  name: "GreenNinja",
  transform: {
    name: "GoldRacoon",
    type: "monster"
  },
  x: 22, y: 12,
  hud: playerHUD,
  fx: playerEffects
});

window.selectBoolean = false

//Creates global Maps object 
window.Maps = {
  //creates StartingHouse map 
  StartingHouse: {
    name: 'StartingHouse',
    entities: { //Collection of entities of StartingHouse map
      npc1: new Obj({
        name: "OldWoman",
        x: 9, y: 3,
        direction: "left",
        text: "Good  morning  son"

      })
    },
    exits: {
      StartingTown: {
        name: "StartingTown",
        x: 7, y: 7,
        newX: 28, newY: 9
      },
    },
  },

  StartingTown: {
    name: "StartingTown",
    entities: { //Collection of entities of StartingHouse map
      npc1: new Obj({
        //sets NPC1 properties
        name: "Boy",
        x: 25, y: 10,
        speed: 1,
        behaviourLoop: [
          { behaviour: "walking", direction: "down", tiles: 1 },
          { behaviour: "standing", direction: "down", time: 1000 },
          { behaviour: "walking", direction: "down", tiles: 1 },
          { behaviour: "standing", direction: "down", time: 1000 },
          { behaviour: "walking", direction: "down", tiles: 1 },
          { behaviour: "standing", direction: "down", time: 1000 },
          { behaviour: "walking", direction: "down", tiles: 1 },
          { behaviour: "standing", direction: "down", time: 5000 },
          { behaviour: "walking", direction: "up", tiles: 4 },
        ],
        text: "Hello!"
      }),
      npc2: new Obj({
        name: "MaskFrog",
        x: 16, y: 11,
        behaviourLoop: [
          { behaviour: "standing", direction: "up", time: 8000 },
          { behaviour: "standing", direction: "right", time: 3000 },
        ],
        text: "I am just slacking about mate"
      }),
      npc3: new Obj({
        name: "OldMan",
        x: 34, y: 11.5,
        behaviourLoop: [
          { behaviour: "standing", direction: "down", time: 9000 },
          { behaviour: "standing", direction: "right", time: 9000 },
          { behaviour: "standing", direction: "up", time: 9000 },
          { behaviour: "standing", direction: "left", time: 9000 }
        ]
      }),
      npc4: new Obj({
        name: "Monk2",
        x: 39, y: 15,
      }),
      npc5: new Obj({
        name: "OldWoman",
        x: 33, y: 7,
      }),
      npc6: new Obj({
        name: "Princess",
        x: 19, y: 18,
        direction: "right",
        behaviourLoop: [
          { behaviour: "walking", direction: "up", tiles: 1 },
          { behaviour: "standing", direction: "up", time: 9000 },
          { behaviour: "standing", direction: "down", time: 5000 },
          { behaviour: "walking", direction: "down", tiles: 2 },
          { behaviour: "standing", direction: "down", time: 9000 },
          { behaviour: "standing", direction: "up", time: 5000 },
          { behaviour: "walking", direction: "up", tiles: 1 },
        ]
      }),
      npc7: new Obj({
        name: "Villager",
        x: 31, y: 8,
        speed: 2,
        behaviourLoop: [
          { behaviour: "walking", direction: "left", tiles: 1 },
        ]
      }),
      monster1: new Obj({
        name: "Racoon",
        x: 23, y: 16,
        type: "monster",
        speed: 2,
        behaviourLoop: [
          { behaviour: "walking", direction: "right", tiles: 8 },
          { behaviour: "walking", direction: "down", tiles: 6 },
          { behaviour: "walking", direction: "left", tiles: 8 },
          { behaviour: "walking", direction: "up", tiles: 6 },
        ]
      }),
      monster2: new Obj({
        name: "Dragon",
        x: 27, y: 21,
        type: "monster",
        direction: "down",
        speed: 2
      }),
    },
    exits: {
      Dojo: {
        name: "Dojo",
        x: 36, y: 15,
        newX: 8, newY: 16
      },
      StartingHouse: {
        name: 'StartingHouse',
        x: 28, y: 8,
        newX: 7, newY: 6
      },
      FishingHut: {
        name: 'FishingHut',
        x: 35, y: 6,
        newX: 3, newY: 32
      },
    }
  },

  Dojo: {
    name: 'Dojo',
    entities: {
      master: new Obj({
        name: "OldMan3",
        x: 8, y: 5,
        text: "Greetings young warrior, welcome to my DOJO! Where I teach people how to fight!"
      }),
      npc1: new Obj({
        name: "BlueSamurai",
        x: 2, y: 8,
        speed: 2,
        behaviourLoop: [
          { behaviour: "walking", direction: "left", tiles: 1 }
        ]
      }),
      npc2: new Obj({
        name: "Master",
        x: 4, y: 5,
        behaviourLoop: [
          { behaviour: "walking", direction: "up", tiles: 2 },
          { behaviour: "walking", direction: "right", tiles: 1 },
          { behaviour: "walking", direction: "left", tiles: 1 },
          { behaviour: "walking", direction: "down", tiles: 2 }
        ]
      }),
      npc3: new Obj({
        name: "Monk",
        x: 6, y: 5,
        behaviourLoop: [
          { behaviour: "walking", direction: "left", tiles: 1 },
          { behaviour: "walking", direction: "right", tiles: 1 },
          { behaviour: "walking", direction: "up", tiles: 2 },
          { behaviour: "walking", direction: "down", tiles: 2 }
        ],
      }),
      npc4: new Obj({
        name: "Monk2",
        x: 13, y: 6,
        behaviourLoop: [
          { behaviour: "walking", direction: "up", tiles: 1 },
          { behaviour: "standing", direction: "up", time: 5000 },
          { behaviour: "standing", direction: "down", time: 5000 },
          { behaviour: "standing", direction: "left", time: 5000 },
          { behaviour: "walking", direction: "down", tiles: 2 },
          { behaviour: "standing", direction: "down", time: 9000 },
          { behaviour: "standing", direction: "left", time: 5000 },
          { behaviour: "walking", direction: "up", tiles: 1 },
        ]
      }),
      npc5: new Obj({
        name: "Lion",
        x: 12, y: 2,
        speed: 2,
        behaviourLoop: [
          { behaviour: "walking", direction: "up", tiles: 1 },
        ]
      }),
      npc6: new Obj({
        name: "Villager4",
        x: 3, y: 2,
      }),
      npc7: new Obj({
        name: "Monk",
        x: 11, y: 12,
        behaviourLoop: [
          { behaviour: "walking", direction: "down", tiles: 1 },
          { behaviour: "standing", direction: "down", time: 1000 },
          { behaviour: "walking", direction: "down", tiles: 1 },
          { behaviour: "standing", direction: "down", time: 1000 },
          { behaviour: "walking", direction: "down", tiles: 1 },
          { behaviour: "standing", direction: "down", time: 1000 },
          { behaviour: "walking", direction: "down", tiles: 1 },
          { behaviour: "standing", direction: "down", time: 5000 },
          { behaviour: "walking", direction: "up", tiles: 2 },
          { behaviour: "standing", direction: "up", time: 5000 },
          { behaviour: "walking", direction: "up", tiles: 2 },
          { behaviour: "standing", direction: "up", time: 5000 },
        ]
      }),
      npc8: new Obj({
        name: "Knight",
        x: 14, y: 4,
        direction: "left",
        speed: 2
      }),
    },
    exits: {
      map1: {
        name: "StartingTown",
        x: 8, y: 17,
        newX: 36, newY: 16
      }
    }
  },

  FishingHut: {
    name: 'FishingHut',
    entities: {
      npc1: new Obj({
        name: "MaskFrog",
        x: 6, y: 17,
      }),
      npc2: new Obj({
        name: "Boy",
        x: 4, y: 30,
      }),
      npc3: new Obj({
        name: "OldMan",
        x: 11, y: 19,
        direction: "left"
      }),
      npc4: new Obj({
        name: "Villager2",
        x: 13, y: 26,
        animationSet: "walk-right",
        speed: 2
      }),
      npc5: new Obj({
        name: "Villager",
        x: 2, y: 23,
        animationSet: "walk-up",

      }),
      npc6: new Obj({
        name: "Inspector",
        x: 13, y: 18,
        direction: "right"
      }),
      npc7: new Obj({
        name: "OldMan2",
        x: 8, y: 13,
      }),
      npc8: new Obj({
        name: "Monk",
        x: 12, y: 12,
        direction: "up"
      }),

    },
    exits: {
      StartingTown: {
        name: "StartingTown",
        x: 3, y: 33,
        newX: 35, newY: 7
      }
    }
  }
}

window.mapDict = {
  StartingTown: new Map(window.Maps.StartingTown),
  Dojo: new Map(window.Maps.Dojo),
  StartingHouse: new Map(window.Maps.StartingHouse),
  FishingHut: new Map(window.Maps.FishingHut)
};

window.greetings= 
  ["Hello there! Welcome to our town!",
    "Greetings, traveler! How may I assist you today?",
    "Hi! I hope you're having a great day so far.",
    "Welcome to our humble abode! How can we make your visit more enjoyable?",
    "Hey there! Is there anything I can help you with?",
    "Good day, adventurer! Welcome to our lovely town",
    "Greetings! It's always nice to meet new people. What brings you to our town?",
    "Salutations! I hope you're finding everything you need here.",
    "Hello, hello! I hope you're enjoying your stay in our lovely town.",
    "Hey, stranger! Anything I can do to make your visit more pleasant?"
  ];
