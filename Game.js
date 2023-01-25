// A game parent class which include every component of the game 
class Game {
  constructor(config){
    //HTML tag where it will display the game
    this.element = config.element;
    //Reference to the HTMl canvas
    this.canvas = this.element.querySelector(".game canvas");
    //Will give us access to different drawing methods
    this.context = this.canvas.getContext("2d");
    //The current map that the user is playing on
    this.map = null;
  }

  //Game Loop
  Loop() { //Loop method for the game
    const gameLoop = () => { //Declares a game loop  function  
      //Calls a function before going repainting the next frame
      requestAnimationFrame(() => { 

        const camera = this.map.entities.player; //Get the camera object

        //Drawing Layers
        this.map.drawLower(this.context, camera);
        this.map.drawCollision(this.context, camera);

        //Draws every single entity 
        Object.values(this.map.entities).forEach(entity => {
          entity.update({
            direction: this.keyInput.direction,
            speedBoost: this.keyInput.speedBoost,
          })
          entity.sprite.drawObj(this.context, camera);
        })
      
        this.map.drawUpper(this.context, camera);
        
        gameLoop(); //Re-iterates the function
      })
    }
    gameLoop(); //Initiates the game loop
  }
  
  //The init method will start the game
  init() {
    this.map = new Map(window.Maps.StartingTown)    
    this.keyInput = new keyInput()
    this.keyInput.init()
    this.Loop();
  }
}