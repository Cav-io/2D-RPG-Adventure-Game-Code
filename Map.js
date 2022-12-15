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

  drawLayers(context) { //draw layers on canvas context 

    //Creates images and assigns the sources for all three layers
    const lowerLayer = new Image(); 
    lowerLayer.src = this.lowerLayerSrc; 

    const collisionLayer = new Image(); 
    collisionLayer.src = this.collisionLayerSrc; 

    const upperLayer = new Image(); 
    upperLayer.src = this.upperLayerSrc; 

    context.drawImage(lowerLayer, 0, 0); //draw lower layer image 
    context.drawImage(collisionLayer, 0, 0); //draw collision layer image
    context.drawImage(upperLayer, 0, 0); //draw upper layer image 
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