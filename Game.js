// A game parent class which include every component of the game 
class Game {
  constructor(config) {
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
    let fadeIn = false; //Declare and set the fadeIn transition to false initally
    let fadeInOpacity = 0; //Declare and set opacity to 0 initally
    //Declares the game loop 
    const gameLoop = () => {
      if (!fadeIn) { //If the game is not in the fadeIn transition process
        // Clears the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Check if the dialogue container exists
        const dialogueContainer = document.querySelector('.dialogue-container');
        const nameContainer = document.querySelector('.name-container');
        if (dialogueContainer && nameContainer) {
          // If it exists, remove both elements from the DOM
          dialogueContainer.remove();
          nameContainer.remove();
        }


        // Create a list of entities from the values of the entities in the map object
        const entities = Object.values(this.map.entities);
        entities.push(player); //Add the player to the list

        // Iterate through each entity in the list
        entities.forEach(entity => {
          // Initial state variable with the map instance
          const state = { map: this.map };

          // add the player's direction and speedBoost to the state
          if (entity.isPlayer) {
            state.direction = this.keyInput.direction;
            state.speedBoost = this.keyInput.speedBoost;
          }
          // passing in the state for every other entity
          entity.update(state);
        });

        //Draw lower and collision layers
        this.map.drawLower(this.context, player);
        this.map.drawCollision(this.context, player);


       //For every entity available in the current map...
        Object.values(entities).forEach(entity => {
          //Draw each entity by calling its method
          entity.sprite.drawObj(this.context, player);
        })

        //For every effect available...
        Object.values(player.fx).forEach(effect => {
          //Draw the effect by calling its method
          effect.drawFX(this.context, player)
        })

        //Draw Upper Layer
        this.map.drawUpper(this.context, player);
        
        //For every HUD available...
        Object.values(player.hud).forEach(hud => {
          //Draw the HUD by calling its method
          hud.drawHUD(this.context)
        })
        
        //Check if any entity is interacting with the player
        Object.values(entities).forEach(entity => {
          //If an entity is interacting...
          if (entity.interacting) {
            //Display the dialogue
            entity.drawDialogue(this.context, this.element);
          }
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
        //When opacity reaches a certain value...
        if (fadeInOpacity >= 0.6) {
          // Then If opacity has reached the opacity limit, stop the fadeIn
          fadeIn = false;
          //Fully change to black screen
          this.context.globalAlpha = 1; //Last step of the transition process
        }
      }
      //Move on to the next frame
      requestAnimationFrame(gameLoop);
    };
    //Call the game loop method again
    gameLoop();
  }

  //This method initialises the neccessary methods, instances and the game loop
  init() {
    //Select the starting map
    this.map = mapDict.StartingTown ;
    //Initialise the collisions first then...
    this.map.fetchCoordinates().then(() => {
      this.keyInput = new keyInput();  //Create a keyInput instance
      this.keyInput.init(); //Intialise the keyInput instance
      this.Loop(); // Initialise the game loop
    });
  }
}