//Creates global Maps object 
window.Maps = { 
  //creates StartingHouse map 
  StartingHouse: { 
    name: 'StartingHouse',
    entities: { //Collection of entities of StartingHouse map
      player: new Player({ //creates new Player instance 
        name: "MaskedNinja",
        x: 5, y: 4, //sets player properties 
        }), //set player source 
      npc1: new Obj({
        name: "OldWoman",
        x: 9, y: 3,
        animationSet: "idle-left"
      })
      }
  },
  
  StartingTown: {
    name: "StartingTown",
    entities: { //Collection of entities of StartingHouse map
      player: new Player({ //creates new Player instance
        name: "Inspector",
        x: 20, y: 10, //sets player properties 
        }), //set player source 
      npc1: new Obj({
        //sets NPC1 properties
        name: "Boy",
        x: 25, y: 10,
      }),
      npc2: new Obj({
        name: "MaskFrog",
        x: 16, y: 11,
        animationSet: "idle-up"
      }),
      npc3: new Obj({
        name: "OldMan",
        x:34, y: 11.5
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
        animationSet: "idle-right"
      }),
      npc7: new Obj({
        name: "Villager",
        x: 31, y: 8,
        animationSet: "walk-left",
        speed: 2
      }),
      npc8: new Obj({
        name: "RedNinja",
        x: 26, y: 19,
        animationSet: "idle-left"
      }),
      monster1: new Obj({
        name: "Racoon",
        x: 25, y: 16,
        type: "monster",
        animationSet: "walk-down",
        speed: 2
      }),
      monster2: new Obj({
        name: "Dragon",
        x: 27, y: 21,
        type: "monster",
        animationSet: "walk-down",
        speed: 2
      }),
    }
  },
  
  Dojo: { 
    name: 'Dojo',
    entities: { 
      player: new Player({ 
        name: "MaskedNinja",
        x: 8, y: 16,  
      }),
      master: new Obj({
        name: "OldMan3",
        x: 8, y: 5
      }),
      npc1: new Obj({
        name: "BlueSamurai",
        x: 2, y: 8,
        animationSet: "walk-left",
        speed: 2
      }),
      npc2: new Obj({
        name: "Master",
        x: 5, y: 4,
        animationSet:"walk-right"
      }),
      npc3: new Obj({
        name: "Monk",
        x: 6, y: 4,
        animationSet:"walk-left",
        speed:2
      }),
      npc4: new Obj({
        name: "Monk2",
        x: 13, y: 6,
        animationSet:"idle-left",
      }),
      npc5: new Obj({
        name: "Lion",
        x: 12, y: 2,
        animationSet:"walk-up",
        speed: 2
      }),
      npc6: new Obj({
        name: "Villager4",
        x: 3, y: 2,
      }),
      npc7: new Obj({
        name: "Monk",
        x: 11, y: 12,
        animationSet:"idle-down",
      }),
      npc8: new Obj({
        name: "Knight",
        x: 14, y: 4,
        animationSet:"walk-right",
        speed: 2
      }),
      npc4: new Obj({
        name: "Monk2",
        x: 7, y: 13,
        animationSet:"idle-right",
      }),
    }
  }
}