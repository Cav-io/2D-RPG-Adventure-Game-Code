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
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //Clears the canvas
        const camera = this.map.entities.player; //Get the camera object

        Object.values(this.map.entities).forEach(entity => {
          entity.update({
            direction: this.keyInput.direction,
            speedBoost: this.keyInput.speedBoost,
            map: this.map
          })
        })

                                                 
        this.map.drawLower(this.context, camera);
        this.map.drawCollision(this.context, camera);

        //Draws every single entity 
        Object.values(this.map.entities).forEach(entity => {
          entity.sprite.drawObj(this.context, camera);
        })

        this.map.drawUpper(this.context, camera);
        
        Object.entries(this.map.exits).forEach(([key, exit]) => {
          if (camera.x / 16 === exit.x && camera.y / 16 === exit.y) {
            const newMap = Object.keys(window.mapDict).find(k => window.mapDict[k].name === exit.name);
            this.map = window.mapDict[newMap];
            this.map.fetchCoordinates();
          }
        });
        
        
        gameLoop(); //Re-iterates the function
      })
    }
    gameLoop(); //Initiates the game loop
  }
  
  //The init method will start the game
  init() {
    this.map = mapDict.Dojo
    this.map.fetchCoordinates()
    this.keyInput = new keyInput()
    this.keyInput.init()
    this.Loop();
  }
}