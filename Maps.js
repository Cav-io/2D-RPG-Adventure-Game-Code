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
      },
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
        name: "OldMan3",
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
      monster1: new Obj({
        name: "Racoon",
        x: 25, y: 16,
        type: "monster",
        animationSet: "walk-down",
        speed: 2
      }),
    }
  }
}