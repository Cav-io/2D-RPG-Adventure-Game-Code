//declare class Map with constructor and drawLayers method 
class Map {
  constructor(config) { 
    //Assigns a name for the map
    this.name = config.name;
    this.walls = config.walls || {};
    
    //assign layer sources
    this.lowerLayerSrc = "/Maps/"+this.name+"/lower layer.png"; 
    this.collisionLayerSrc = "/Maps/"+this.name+"/collision layer.png";
    this.upperLayerSrc = "/Maps/"+this.name+"/upper layer.png";
    
    //assign entities 
    this.entities = config.entities; 
  }

  drawLower(context, camera){
    const lowerLayer = new Image(); 
    lowerLayer.src = this.lowerLayerSrc; 
    context.drawImage(lowerLayer, 9*16 - camera.x, 4*16 - camera.y); //draw lower layer image 
  }

  drawCollision(context, camera){
    const collisionLayer = new Image(); 
    collisionLayer.src = this.collisionLayerSrc; 
    context.drawImage(collisionLayer, 9*16 - camera.x, 4*16 - camera.y); //draw lower layer image 
  }

  drawUpper(context, camera){
    const upperLayer = new Image(); 
    upperLayer.src = this.upperLayerSrc; 
    context.drawImage(upperLayer, 9*16 - camera.x, 4*16 - camera.y); //draw lower layer image 
  }
    
  checkCollision(x, y, direction){
    let collide = true;
    let directionDict = {
      "up": [0, -1], "down": [0, 1],
      "right": [1, 0], "left": [-1, 0]
    }
    let xValue = directionDict[direction][0];
    let yValue = directionDict[direction][1];
    x += xValue;
    y += yValue;
    if(x >= 0 && x < this.walls.width && 
       y >= 0 && y < this.walls.height){
      if (Object.keys(this.walls).length !== 0){
        if (this.walls.data[x+(y*this.walls.width)] === 0){
          collide = false
        }
      }
    Object.values(this.entities).forEach(entity => {
          if(entity.isPlayer === false){
             if(x == entity.x/16 && y ==entity.y/16){            
             collide = true
             }
          }  
      })
    }
    return collide;
  }


  fetchCoordinates(){
    fetch('/Maps/'+this.name+'/collision.json')
    .then(response => response.json())
    .then(json => {
      this.walls = json.layers[0]
    })
  }
  
}

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