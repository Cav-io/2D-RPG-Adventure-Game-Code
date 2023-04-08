//Creates a global object for storing all the HUD
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
//Creates a global object for storing all the effects
const playerEffects = {
  transformFX: new FX({
    name: 'Shield',
    isFinished: true
  })
}
//Creates a global object for initialising the player instance 
window.player = new Player({
  x: 25, y: 15, //Initial position coordinates
  //Sets the name for filepath of spritesheets and faceset
  name: "GreenNinja", 
  transform: { //Creates the transform entity object
    name: "GoldRacoon", //Sets the name for filepath of spritsheet
    type: "monster" // Sets the type of the entity for initialising the monster
  },
  hud: playerHUD, //Sets the hud attribute as the global playerHUD object
  fx: playerEffects //Sets the effecs attribute as the global playerHUD object
});
//Sets the initial selectBoolean to false
window.selectBoolean = false

//Creates global Maps object 
window.Maps = {
  //creates StartingHouse map 
  StartingHouse: {
    name: 'StartingHouse',
    entities: { //Collection of entities of StartingHouse map
      //Creates new entity instances for the map 
      npc1: new Obj({
        //Sets the name for filepath of spritesheets and faceset
        name: "OldWoman",
        displayName: "Mum", //Sets the name for dialogue system
        x: 9, y: 3, //Sets the coordinates in for this entity in the StartingHouse map
        direction: "left", //Sets the direction it is facing
        //Sets the dialogue text to display
        text:"When are you going to stop playing around and get a real job?"  
      })
    },
    //Stores all the possible ways to exit and enter the map
    exits: {
      StartingTown: {
        name: "StartingTown", //Stores name of the exit map
        x: 7, y: 7, //Stores the coordinates from StartingHouse to enter StartingTown
        newX: 28, newY: 9 //Stores the coordinates from StartingTown to enter StartingHouse
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
        text:"Hey, you look like you could use a good time - I know all the best spots in this town, if you're interested."
      }),
      npc2: new Obj({
        name: "MaskFrog",
        x: 16, y: 11,
        behaviourLoop: [
          { behaviour: "standing", direction: "up", time: 8000 },
          { behaviour: "standing", direction: "right", time: 3000 },
        ],
        text: "Ribbit, ribbit, just taking a break from being a ninja, nothing to see here."
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
        name: "EskimoNinja",
        x: 33, y: 7,
        text: "Oi, bruv, you better not be stepping in my turf fam."
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
        ],
        text: "Good day to you, may your endeavors be blessed with success and prosperity."
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
        speed: 1,
        behaviourLoop: [
          { behaviour: "walking", direction: "right", tiles: 4 },
          { behaviour: "walking", direction: "down", tiles: 3 },
          { behaviour: "walking", direction: "left", tiles: 4 },
          { behaviour: "walking", direction: "up", tiles: 3 },
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
        displayName: "Master Shi Fu",
        x: 8, y: 5,
        text: "Greetings young warrior, welcome to my DOJO! Where I teach people how to fight!"
      }),
      npc1: new Obj({
        name: "BlueSamurai",
        displayName: "Samurai",
        x: 2, y: 8,
        speed: 2,
        behaviourLoop: [
          { behaviour: "walking", direction: "left", tiles: 1 }
        ],
        text: "Training like this is the only way to keep my fists sharp and ready for anything."
      }),
      npc2: new Obj({
        name: "Master",
        x: 4, y: 5,
        behaviourLoop: [
          { behaviour: "walking", direction: "up", tiles: 2 },
          { behaviour: "walking", direction: "right", tiles: 1 },
          { behaviour: "walking", direction: "left", tiles: 1 },
          { behaviour: "walking", direction: "down", tiles: 2 }
        ],
        text: "I don't have time for idle chitchat, my training demands my full attention."
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
        text: "I must train harder to sharpen my skills and become one with the shadows."
      }),
      npc4: new Obj({
        name: "Monk2",
        displayName: "Tibetan Monk",
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
        ],
        text: " the path to inner peace begins with quieting the mind and finding stillness within yourself. "
      }),
      npc5: new Obj({
        name: "Lion",
        displayName: "Lion Warrior",
        x: 12, y: 2,
        speed: 2,
        behaviourLoop: [
          { behaviour: "walking", direction: "up", tiles: 1 },
        ],
        text: "ROAR! STOP DISTRACTING ME FROM MY TRAINING!"
      }),
      npc6: new Obj({
        name: "Villager4",
        x: 3, y: 2,
        text: "I'm struggling with these techniques, but I'm determined to improve and become a skilled ninja."
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
        ],
        text: "This is a sacred temple, a place of meditation and learning the arts of combat"
      }),
      npc8: new Obj({
        name: "Knight",
        displayName: "Knight",
        x: 14, y: 4,
        direction: "left",
        speed: 2,
        text: "I may be a knight, but sometimes it takes more than a sword to defeat your foes."
      }),
    },
    exits: {
      map1: {
        name: "StartingTown",
        x: 8, y: 17,
        newX: 36, newY: 16
      },
    }
  },

  FishingHut: {
    name: 'FishingHut',
    entities: {
      npc1: new Obj({
        name: "MaskFrog",
        displayName: "Frog Ninja",
        x: 6, y: 17,
      }),
      npc2: new Obj({
        name: "Boy",
        x: 4, y: 30,
        behaviourLoop: [
          { behaviour: "walking", direction: "up", tiles: 1 },
          { behaviour: "standing", direction: "up", time: 5000 },
          { behaviour: "standing", direction: "down", time: 5000 },
          { behaviour: "standing", direction: "left", time: 5000 },
          { behaviour: "walking", direction: "down", tiles: 2 },
          { behaviour: "standing", direction: "down", time: 9000 },
          { behaviour: "standing", direction: "left", time: 5000 },
          { behaviour: "walking", direction: "up", tiles: 1 },
        ],
        text: "Welcome to our harbor, feel free to explore and enjoy the salty breeze!"
        
      }),
      npc3: new Obj({
        name: "OldMan",
        x: 11, y: 19,
        behaviourLoop: [
          { behaviour: "walking", direction: "up", tiles: 1 },
          { behaviour: "standing", direction: "up", time: 5000 },
          { behaviour: "standing", direction: "down", time: 5000 },
          { behaviour: "standing", direction: "left", time: 5000 },
          { behaviour: "walking", direction: "down", tiles: 1 },
          { behaviour: "standing", direction: "down", time: 9000 },
          { behaviour: "standing", direction: "left", time: 5000 },
        ],
      }),
      npc4: new Obj({
        name: "Villager2",
        x: 13, y: 26,
      }),
      npc5: new Obj({
        name: "Villager",
        x: 2, y: 23,
        behaviourLoop:[
          {type:"walking", direction:"up", tiles:1}
        ],
        text: "I may be small, but I work hard to earn my keep around here."
      }),
      npc6: new Obj({
        name: "Inspector",
        displayName: "???",
        x: 13, y: 18,
        direction: "right",
        text:"I'm sorry, I cannot disclose any information, I'm on a confidential mission."
      }),
      npc7: new Obj({
        name: "OldMan2",
        x: 8, y: 13,

        text: "Be careful not to step on the ropes there, mate, wouldn't want to send you for an unexpected swim in the harbor."
      }),
      
      npc8: new Obj({
        name: "Monk",
        x: 12, y: 12,
        direction: "up",
        text:"Hey there, want to help me load these crates onto the ship?"
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
  FishingHut: new Map(window.Maps.FishingHut),
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
    "Hey, stranger! Anything I can do to make your visit more pleasant?",
    "Great weather, isn't it?",
  ];
