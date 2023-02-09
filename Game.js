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
    let fadeInOpacity = 0;
    
    const gameLoop = () => {
      if (!fadeIn) {
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

        //Draw player effects
        player.fx.drawFX(this.context, player)
        //Draw Upper Layer
        this.map.drawUpper(this.context, player);
        //Draw player HUD
        Object.values(player.hud).forEach(hud => {
          hud.drawHUD(this.context)
        })

        // Check for player exiting or entering a new map
        Object.entries(this.map.exits).forEach(([key, exit]) => {
          if (player.x / 16 === exit.x && player.y / 16 === exit.y) {
            // Start the fade in transition
            fadeIn = true;
            fadeInOpacity = 0;
            //Change to the respective map
            this.map = window.mapDict[this.map.update(key, exit)];
            //Traverse the collision json file for the new map
            this.map.fetchCoordinates();
          }
        });
      }
      
      // If fade in is true
      if (fadeIn) {
        //The fade-in transition colour
        this.context.fillStyle = "black"; 
        //The level of opacity
        this.context.globalAlpha = fadeInOpacity; 
        //Make sures it covers the whole canvas 
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

        //Keep increasing the opacity of the transition 
        fadeInOpacity += 0.025;
        if (fadeInOpacity >= 0.6) {
          // If opacity has reached the opacity limit, stop the fade in
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