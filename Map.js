class Map {
  constructor(config) {
    this.lowerLayerSrc = config.lowerLayerSrc;
    this.collisionLayerSrc = config.collisionLayerSrc;
    this.upperLayerSrc = config.upperLayerSrc;
    this.entities = config.entities;
  }

  drawLayers(context) {
    const lowerLayer = new Image();
    lowerLayer.src = this.lowerLayerSrc;

    const collisionLayer = new Image();
    collisionLayer.src = this.collisionLayerSrc;

    const upperLayer = new Image();
    upperLayer.src = this.upperLayerSrc;

    context.drawImage(lowerLayer, 0, 0);
    context.drawImage(collisionLayer, 0, 0);
    context.drawImage(upperLayer, 0, 0);
  }
}

window.Maps = {
  StartingHouse: {
    lowerLayerSrc: "/Maps/starting house/lower layer.png",
    collisionLayerSrc: "/Maps/starting house/collision layer.png",
    upperLayerSrc: "/Maps/starting house/upper layer.png",
    entities: {
      player: new Player({
        x: 5, y: 4, direction: "right",
        src: "Characters/RedSamurai/SpriteSheet.png"}),
      }
  }
}