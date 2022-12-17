// A game parent class which include every component of the game 
class Game {
  constructor(config){
    this.element = config.element;
    //HTML tag where it will display the game
    this.canvas = this.element.querySelector(".game canvas");
    //Reference to the HTMl canvas
    this.context = this.canvas.getContext("2d");
    //Will give us access to different drawing methods
    this.map = null;
    //The current map that the user is playing on
  }

  //Game Loop
  Loop() { //Loop method for the game
    const gameLoop = () => { //Declares a game loop  function  
      //Calls a function before going repainting the next frame
      requestAnimationFrame(() => { 

        //Drawing Layers
        this.map.drawLower(this.context);
        this.map.drawCollision(this.context);

        //Draws every single entity 
        Object.values(this.map.entities).forEach(entity => {
          entity.update({
            arrow: this.directions.direction
          })
          entity.sprite.drawObj(this.context);
        })

        this.map.drawUpper(this.context);
        
        gameLoop(); //Re-iterates the function
      })
    }
    gameLoop(); //Initiates the game loop
  }
  
  //The init method will start the game
  init() {
    this.map = new Map(window.Maps.StartingHouse)    
    this.directions = new keyInput()
    this.directions.init()
    this.Loop();
  
  }
}