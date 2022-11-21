
// A game parent class which include every component of the game 
class Game {
  constructor(config){
    this.element = config.element;
    this.canvas = this.element.querySelector(".game canvas");
    //Reference to the HTMl canvas
    this.context = this.canvas.getContext("2d");
    //Will give us access to different drawing methods
  }

  drawMap(imageInstance, posX, posY) { //function that draws images on the canvas
    //The parameters is the image object, x and y position that will be 
    
    imageInstance.onload = () => {
      this.context.drawImage(imageInstance,posX, posY)
    }
  } 
  
  //The init method will start the game
  init() {
    
    //Lower layer
    const lowerLayer = new Image(); //creates a a new image 
    lowerLayer.src = "/Maps/starting house/lower layer.png"; 
    //The source is the attribute of the instance  
    this.drawMap(lowerLayer,0,0); //Calls the method for drawing the image
    
    //Collision Layer
    const collisionLayer = new Image();
    collisionLayer.src = "/Maps/starting house/collision layer.png";
    this.drawMap(collisionLayer,0,0);
    
    //Upper Layer
    const upperLayer = new Image();
    upperLayer.src = "/Maps/starting house/upper layer.png";
    this.drawMap(upperLayer,0,0);
  }
  
}