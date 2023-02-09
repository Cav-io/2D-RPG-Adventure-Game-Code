//Creates a new instance of the game
const game = new Game({ 
    //the game class is declared as the element where the game will run
    element: document.querySelector(".game") 
  });

game.init(); //this method will start the game instance


//Initiates Player as a global object
   