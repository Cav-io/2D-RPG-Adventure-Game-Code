//declare class Map with constructor and drawLayers method 
class Map {
  constructor(config) { 
    
    //assign layer sources
    this.lowerLayerSrc = config.lowerLayerSrc; 
    this.collisionLayerSrc = config.collisionLayerSrc; 
    this.upperLayerSrc = config.upperLayerSrc;
    
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
    lowerLayerSrc: "/Maps/starting house/lower layer.png", 
    collisionLayerSrc: "/Maps/starting house/collision layer.png", 
    upperLayerSrc: "/Maps/starting house/upper layer.png", 
    entities: { //Collection of entities of StartingHouse map
      player: new Player({ //creates new Player instance 
        x: 5, y: 4, direction: "right", //sets player properties 
        src: "Characters/RedSamurai/SpriteSheet.png"}), //set player source 
      }
  }
}