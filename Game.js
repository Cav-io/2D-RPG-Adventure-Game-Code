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

  Loop() {
    let fadeIn = false;
    let fadeOut = false;
    let fadeOpacity = 0;
    
    const gameLoop = () => {
      if (!fadeIn && !fadeOut) {
        // Clears the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
         //Creates a list for entities
        const entities = Object.values(this.map.entities);
        //Adds player as an entity
        entities.push(player);

        //Update each entity in the map
        entities.forEach(entity => {
          entity.update({
            //Passed on for any keyInput for movement
            direction: this.keyInput.direction,
            //Passed on for any keyInput for speed toggle
            speedBoost: this.keyInput.speedBoost,
            //Passed on to check for any collision tiles
            map: this.map
          });
        });

        //Draw lower and collision layers
        this.map.drawLower(this.context, player);
        this.map.drawCollision(this.context, player);

        //Draws every single entity 
        Object.values(entities).forEach(entity => {
          entity.sprite.drawObj(this.context, player);
        })

        //Draw Upper Layer
        this.map.drawUpper(this.context, player);

        // Check for player exiting or entering a new map
        Object.entries(this.map.exits).forEach(([key, exit]) => {
          if (player.x / 16 === exit.x && player.y / 16 === exit.y) {
            // Start the fade out transition
            fadeOut = true;
            fadeOpacity = 0;
          }
        });
      }
      
      if (fadeOut) {
        // If fade out is true, fill the canvas with black and decrease opacity
        this.context.fillStyle = "black";
        this.context.globalAlpha = fadeOpacity;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        fadeOpacity += 0.05;
        if (fadeOpacity >= 1) {
          // If opacity has reached 1, stop the fade out
          fadeOut = false;
          fadeIn = true;
          this.map = window.mapDict[this.map.update(key, exit)];
          this.map.fetchCoordinates();
        }
      }
      
      if (fadeIn) {
        // If fade in is true, fill the canvas with black and increase opacity
        this.context.fillStyle = "black";
        this.context.globalAlpha = 1 - fadeOpacity;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        fadeOpacity -= 0.05;
        if (fadeOpacity <= 0) {
          // If opacity has reached 0, stop the fade in
          fadeIn = false;
          this.context.globalAlpha = 1;
        }
      }

      requestAnimationFrame(gameLoop);
    };
    
    gameLoop();
  }
  
  //The init method will Initiate the game
  init() {
    //Initiates Player as a global object
    window.player = new Player({
      name: "MaskedNinja",
      x: 4, y: 4
    });
    
    //Initiates the starting map 
    this.map = mapDict.StartingHouse
    //Gets map coordinates to check for collisions
    this.map.fetchCoordinates()

    //Intialises a keyInput instance
    this.keyInput = new keyInput()
    this.keyInput.init()

    //Intialises the game loop
    this.Loop();
  }
}