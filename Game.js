
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
  Loop() {
    const gameLoop = () => {
      requestAnimationFrame(() => {
          gameLoop()
      })
    }
    gameLoop();
  }
  
  //The init method will start the game
  init() {
    this.map = new Map(window.Maps.StartingHouse)
    this.startGameLoop();
  
  }
}

