
// A game parent class which include every component of the game 
class Game {
  constructor(config){
    this.element = config.element;
    this.canvas = this.element.querySelector(".game canvas");
    //Reference to the HTMl canvas
    this.context = this.canvas.getContext("2d");
    //Will give us access to different drawing methods
  }

  //The init method will start the game
  init() {
    console.log("test2", this); //testing if it initiates
  }
  
}