class Sprite {
  constructor(config) {

    //Obj Class
    this.Obj = config.Obj;

    this.skin = new Image(); //Creates a new image attribute for the sprite
    this.name = this.Obj.name //Creates a new name attribute used for filepath
    this.skin.src = "Characters/" + this.Obj.name + "/SpriteSheet.png"
    if (this.Obj.type === "monster") { //If the entity is a monster entity
      //Change the file path template
      this.skin.src = "Monsters/" + this.Obj.name + "/SpriteSheet.png"
    }
    this.skin.onload = () => {//When the skin is loaded
      this.isLoaded = true; //Mark as loaded
    }

    if (this.Obj.type !== "monster") { //If the entity is not a monster entity
      this.faceset = new Image(); // Create new image instance for the faceset
      // Fetch the filepath for the faceset
      this.faceset.src = "Characters/" + this.Obj.name + "/Faceset.png"
      this.faceset.onload = () => { //If faceset is loaded
        this.facesetIsLoaded = true; // Set the loaded flag as true
      }
    }

    this.dialogueBox = new Image(); //Create an image instance for dialogue box
    // Set the filepath for dialogue box image
    this.dialogueBox.src = "HUD/Dialog/DialogBoxFaceset.png" 

    //Player movement animation for spritesheet 
    this.animationsMap = config.animationsMap || {
       // Each value contains the coordinates of the sprite in the spritesheet
      "idle-down": [[0, 0]],
      "idle-up": [[1, 0]],
      "idle-left": [[2, 0]],
      "idle-right": [[3, 0]],
      "walk-down": [[0, 1], [0, 2], [0, 3], [0, 0]],
      "walk-up": [[1, 1], [1, 2], [1, 3], [1, 0]],
      "walk-left": [[2, 1], [2, 2], [2, 3], [2, 0]],
      "walk-right": [[3, 1], [3, 2], [3, 3], [3, 0]]
    }

    //Set the initlial animation set
    this.animationSet = config.animationSet || "idle-down";
    this.currentSpriteFrame = 0; // Set the current sprite frame to 0 initially
    this.framesLimit = 8; // Set the initial frames limit to 8
    this.framesLeft = this.framesLimit; // Frames left to draw same as frames limit intially
  }

  //updates the current sprite set if there is a change to their direction
  updateSpriteSet(walkingDir) {
    if (this.animationSet !== walkingDir) { //If it is a new direction 
      //Reset the current animation progress 
      this.framesLeft = this.framesLimit; //Reset frames left to draw
      this.currentSpriteFrame = 0; //Reset the current sprit frame back to 0
      this.animationSet = walkingDir // Set the new animation set
    }
  }

  updateFramesLeft() {

    //If speed boost is on...
    if (this.Obj.speed === 2) {
      //...then set the frames limit to 4 (frames will generate faster)
      this.framesLimit = 4;
    } else {
      //...or else set the frames limit to default
      this.framesLimit = 8;
    }

    //If player frames left to display
    if (this.framesLeft > 0) {
      //... Then decrement by one
      this.framesLeft--;
      return;
    }

    //Set the framesLeft to the framesLimit
    this.framesLeft = this.framesLimit;
    //Go to the next sprite frame
    this.currentSpriteFrame += 1;

    //Following the increment, there is no sprite frame afterwards
    if (this.animationsMap[this.animationSet][this.currentSpriteFrame] === undefined) {
      //... Then set the sprite frame back to 0.
      this.currentSpriteFrame = 0;
    }

  }

  //Sprite Methods
  drawObj(context, camera) {
    //const {x, y} = this.Obj; //Destructuring
    const x = this.Obj.x + 9 * 16 - camera.x
    const y = this.Obj.y + 4 * 16 - camera.y
    if (this.isLoaded) {  //If the sprite is loaded
      const fx = this.animationsMap[this.animationSet][this.currentSpriteFrame][0] * 16
      const fy = this.animationsMap[this.animationSet][this.currentSpriteFrame][1] * 16
      //then draw the sprite on the game canvas 
      context.drawImage(this.skin, fx, fy, 16, 16, x, y, 16, 16)
      this.updateFramesLeft();
    }
  }
  //Setter method for setting the obj entity to the sprite class
  set obj(obj) {
    this._obj = obj; //Set the new attribute for obj as the parameter
    //Set the file path using the name attribute
    this.skin.src = "Characters/" + this._obj.name + "/SpriteSheet.png";
    if (this._obj.type === "monster") { //If entity is monster
      //Overrite the filepath to fetch the monster spriteheet instead
      this.skin.src = "Monsters/" + this._obj.name + "/SpriteSheet.png";
    }
  }
  //Getter method for getting the obj entity out of the sprite class
  get obj() {
    //Return the entity object
    return this._obj;
  }

}


// OBJECT CLASS
class Obj { //A blueprint for an object in the game
  constructor(config) {
    //Whether is or not controlled by the player
    this.isPlayer = false; 
    // the distance left to travel in tiles
    this.TilesLeft = config.TilesLeft * 16 || 0 * 16;
    // the speed at which this entity moves
    this.speed = config.speed || 1; 
    //Initial coordinates in terms of pixels
    this.x = config.x * 16;
    this.y = config.y * 16;
    this.name = config.name //The name used for the filepath
    //Checks whether its an character or monster
    this.type = config.type || "character" //If not specified, default to character
    this.behaviourLoop = config.behaviourLoop //Array of behaviours
    // the index of the current behavior in the behaviour loop
    this.currentBehaviour = -1; 
    // the amount of time this entity has been in its current standing behavior
    this.time = 0

    //Checks whether its interacting or not
    this.interacting = false;
    //Dialogue Text to display
    this.text  = config.text
    //If specific text is not provided, then it will use a random greeting
    this.greetings = null //Its initally empty
    //The name used for displaying the character in the dialogue system
    this.displayName = config.displayName || "Villager"

    if (this.TilesLeft > 0) { //If it needs to travel initially
      this.behaviour = "walking" //Set behaviour to walking
    } else { //If it does not need to travel initally
      this.behaviour = "standing"; //Set behaviour to standing
    }
    
    if (this.speed === 2) {//If the speed is set to 2 initially
      this.TilesLeft = this.TilesLeft * 2; //Then multiply the tiles need to travel
    }

    //Creates an attribute for the sprite or skin of the game object   
    this.sprite = new Sprite({ Obj: this, animationSet: config.animationSet });

    //The direction that the object faces
    this.direction = config.direction || "down";

    //Assigns the axis and the value for the correspoding direction
    this.directionDict = {
      "up": ["y", -1], "down": ["y", 1],
      "right": ["x", 1], "left": ["x", -1]
    }
  }

  //The Update method will commit changes to the object 
  update(state) {
    //This dictionary allows the NPC to know which direction to face when interating
    const oppositeDirection = {
      "up": "down", "down": "up",
      "left": "right", "right": "left"
    }
    //If its interating...
    if (this.interacting) {
      //Set sprite direction to the opposite direction of the player
      this.sprite.updateSpriteSet("idle-" + oppositeDirection[player.direction])
      return //Return the method preventing the NPC to execute the rest of the update method
    }
    // Check if there are tiles left to walk
    if (this.TilesLeft > 0) {
      this.behaviour = "walking" // Set behaviour to walking
    }
    // Check if the object is on a tile and there are tiles left to walk
    if (Number.isInteger(this.x / 16) && Number.isInteger(this.y / 16) && this.TilesLeft > 0) {
      // Check for collision
      if (state.map.checkCollision(this)) { //If its colliding
        this.behaviour = "standing" //Set behaviour to standing
      }
    }

    // If the time attribute is greater than 0
    if (this.time > 0) {
      this.time -= 60 //Decrease by 60 in each iteration
    }
    this.time = Math.max(this.time, 0) //Prevents from decreasing below 0

    // Update the position and sprite
    this.updatePos()
    this.updateSprite()

    // If there are no tiles left to walk and the time is 0.... 
    if (this.TilesLeft === 0 && this.time === 0) {
      this.currentBehaviour++ //advance to the next behavior
      this.startBehaviourLoop() // Call the behaviour loop
    }
  }

  startBehaviourLoop() {
    // Check if there is a behavior loop
    if (this.behaviourLoop) {
      // Reset the current behavior if it has exceeded the behavior loop length
      this.currentBehaviour = this.currentBehaviour % this.behaviourLoop.length

     
      // Destructure the behaviourLoop dictionary and fetching the data from the current behaviour
      const { behaviour, direction, time, tiles } = this.behaviourLoop[this.currentBehaviour]
      // Set the behavior and direction
      this.behaviour = behaviour
      this.direction = direction

      // Update TilesLeft and time based on the behavior
      if (behaviour === "standing") {
        this.time = time //Set the time 
        this.TilesLeft = 0 //Prevent the NPC from moving
      } else { //Otherwise if the behaviour is not standing...
        this.TilesLeft = tiles * 16 //Allow the player to move 
        this.time = 0 // Set the time to 0 so there's no delay involved
      }
    }
  }


  updatePos() {
    if (this.behaviour === "walking") { //If the user has to move  
      //Checks which direction it needs to move to
      const [axis, value] = this.directionDict[this.direction]
      //Changes their position value on the correct axis
      this[axis] += value * this.speed
      // If this method continues to run, the method will stop when the TilesLeft is 0
      this.TilesLeft -= this.speed * this.speed;
    }
  }

  //Updates the player's sprite
  updateSprite() {
    if (this.TilesLeft === 0) {
      //...Then set the player's sprite animation to 'idle' + direction
      this.sprite.updateSpriteSet("idle-" + this.direction)
    } else {
      if (this.behaviour = "walking") {
        //...Otherwise, set the player's sprite animation to 'walk' + direction
        this.sprite.updateSpriteSet("walk-" + this.direction)
      }
    }
  }

  // The drawDialogue method displays text on the canvas
  drawDialogue(context, element) {
    // Check if the entity is not a monster
    if (this.type !== "monster") {
      // Draw the dialogue box and face graphic
      context.drawImage(this.sprite.dialogueBox, 0, 90);
      context.drawImage(this.sprite.faceset, 6, 103);
  
      // Create a container for the text
      const dialogueContainer = document.createElement('div');
      dialogueContainer.className = 'dialogue-container';
  
      // Create a text element for the dialogue
      const textElement = document.createElement('p');


      // Create a container for the text
      const nameContainer = document.createElement('div');
      nameContainer.className = 'name-container';
  
      // Create a text element for the dialogue
      const nameElement = document.createElement('p');
      nameElement.innerText = this.displayName;
      nameElement.className = 'name-text';
  
      // Check if there is already text to display
      if (this.text) {
        textElement.innerText = this.text;
      } else {
        // If there is no text, display a greeting
        if (this.greeting) {
          // If a greeting has already been chosen, use it again
          textElement.innerText = this.greeting;
        } else {
          // Otherwise, choose a new greeting at random and store it in the entity object
          const randomIndex = Math.floor(Math.random() * greetings.length);
          this.greeting = greetings[randomIndex];
          textElement.innerText = this.greeting;
        }
      }

      textElement.className = 'dialogue-text';
  
      // Add the text element to the dialogue container
      dialogueContainer.appendChild(textElement);
      nameContainer.appendChild(nameElement);
  
      // Use the parent element of the game canvas as the container for the dialogue
      element.appendChild(dialogueContainer);
      element.appendChild(nameContainer);
    }
  }


}



