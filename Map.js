//declare class Map with constructor and drawLayers method 
class Map {
  constructor(config) { 
    //Assigns a name for the map
    this.name = config.name;
    
    //assign layer sources
    this.lowerLayerSrc = "/Maps/"+this.name+"/lower layer.png"; 
    this.collisionLayerSrc = "/Maps/"+this.name+"/collision layer.png";
    this.upperLayerSrc = "/Maps/"+this.name+"/upper layer.png";
    
    //assign entities 
    this.entities = config.entities; 
  }

  drawLower(context){
    const lowerLayer = new Image(); 
    lowerLayer.src = this.lowerLayerSrc; 
    context.drawImage(lowerLayer, 0, 0); //draw lower layer image 
  }

  drawCollision(context){
    const collisionLayer = new Image(); 
    collisionLayer.src = this.collisionLayerSrc; 
    context.drawImage(collisionLayer, 0, 0); //draw lower layer image 
  }

  drawUpper(context){
    const upperLayer = new Image(); 
    upperLayer.src = this.upperLayerSrc; 
    context.drawImage(upperLayer, 0, 0); //draw lower layer image 
  }
}

//Creates global Maps object 
window.Maps = { 
  //creates StartingHouse map 
  StartingHouse: { 
    name: 'StartingHouse',
    entities: { //Collection of entities of StartingHouse map
      player: new Player({ //creates new Player instance 
        name: "RedSamurai",
        x: 5, y: 4, //sets player properties 
        }), //set player source 
      }
  },
  StartingTown: {
    name: "StartingTown",
    entities: { //Collection of entities of StartingHouse map
      player: new Player({ //creates new Player instance
        name: "RedSamurai",
        x: 5, y: 4, //sets player properties 
        }), //set player source 
      NPC1: new Obj({
        name: "Boy",
        x: 7, y: 5, //sets NPC1 properties
        }),
    
      }
  }
}