class Map {
  constructor(config){
    //Lower Layer
    this.lowerLayer = new Image();
    this.lowerLayer.src = config.lowerLayerSrc;
    
    //Collision Layer
    this.collisionLayer = new Image();
    this.collisionLayer.src = config.collisionLayerSrc;

    //Upper Layer
    this.upperLayer = new Image();
    this.upperLayer.src = config.upperLayerSrc;
    
    
    this.entities = config.entities;
  }

  drawLower(context){
    context.drawImage(this.lowerLayer, 0, 0)
  }

  drawCollision(context){
    context.drawImage(this.collisionLayer, 0, 0)
  }

  drawUpper(context){
    context.drawImage(this.upperLayer, 0, 0)
  }
}

window.Maps = {
  StartingHouse: {
    lowerLayerSrc: "/Maps/starting house/lower layer.png",
    collisionLayerSrc: "/Maps/starting house/collision layer.png",
    upperLayerSrc: "/Maps/starting house/upper layer.png",
    entities: {player: new Obj({
      x: 5, y: 4, 
      src: "Characters/RedSamurai/SpriteSheet.png"}
    )}
  }
}