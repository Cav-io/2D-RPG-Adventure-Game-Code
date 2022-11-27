
// A game parent class which include every component of the game 
class Game {
  constructor(config){
    this.element = config.element;
    //HTML tag where it will display the game
    this.canvas = this.element.querySelector(".game canvas");
    //Reference to the HTMl canvas
    this.context = this.canvas.getContext("2d");
    //Will give us access to different drawing methods
  }

  //function that draws images on the canvas
  drawMap(imageInstance, posX, posY) { 
    //The parameters is the image object, x and y position that will be 
    imageInstance.onload = () => {
      //The onload method loads the image 
      this.context.drawImage(imageInstance,posX, posY)
    //Draws the image to the corresponding HTML tag which is the canvas.
    }
  } 
  
  //The init method will start the game
  init() {
    
    // //Lower layer
    // const lowerLayer = new Image(); //creates a a new image 
    // //The source is the attribute of the instance  
    // lowerLayer.src = "/Maps/starting house/lower layer.png"; 
    // this.drawMap(lowerLayer,0,0); //Calls the method for drawing the image
    
    // //Collision Layer
    // const collisionLayer = new Image();
    // collisionLayer.src = "/Maps/starting house/collision layer.png";
    // this.drawMap(collisionLayer,0,0);
    
    // //Upper Layer
    // const upperLayer = new Image();
    // upperLayer.src = "/Maps/starting house/upper layer.png";
    // this.drawMap(upperLayer,0,0);


    //Defining entities
    const player = new Obj({ //Creates a 'player' instance
      x: 5, y: 4, //Initial player position
      src: "Characters/RedSamurai/SpriteSheet.png" //Player image source
    })


    //Drawing entities
    setTimeout(() => {player.sprite.drawObj(this.context)}, 250)
    //Uses the sprite class draw method
    
  }

  
  
}