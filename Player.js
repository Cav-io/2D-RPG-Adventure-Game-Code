class Player extends Obj { //GameObj that can be controlled by the user
  constructor(config) {
    super(config); //Inherits methods and attributes from Obj
    //Determines whether this instance is the player or not
    this.isPlayer = true; //Since this is the player class, this attribute will be true
    //Determines how many tiles it has to travel
    this.TilesLeft = 0 //Initally, its set to 0
    //Position coordinates in pixels
    this.x = config.x * 16 || 4 * 16; //If not provided, default to (4,4)
    this.y = config.y * 16 || 4 * 16;
    //Contains the sprite for default character sprite
    this.originalSprite = {
      name: this.name,
      type: this.type
    }
    //Contains the sprite for the transform entity
    this.transform = config.transform

    //SEts the player's HUD that are available to use
    this.hud = config.hud
    //Initialise the transformHUD using the transform sprite name for the filepath
    this.hud.transformHUD.name = this.transform.name
    //Sets the player's effects that are available to use
    this.fx = config.fx

    //Assigns the axis and the value for the correspoding direction
    this.directionDict = {
      "up": ["y", -1], "down": ["y", 1],
      "right": ["x", 1], "left": ["x", -1]
    }
    //Determines whether the player is able to move or not
    this.freeze = false; //Initally, don't freeze the player
  }


  //Updates the character in each loop
  update(state) {
    // If the player has pressed 'enter' key
    if (selectBoolean) {
      // ... Then check if the player is facing an entity that is not a monster
      if (!state.map.playerInteraction(state)) {
        // If not, then set selectBoolean to false
        selectBoolean = false;
      }
    }

    // Call the playerInteraction function with the state parameter
    state.map.playerInteraction(state);

    // If the player is frozen, update the sprite and return
    if (this.freeze) {
      this.sprite.updateSpriteSet("idle-" + this.direction);
      return;
    }
    //Update the sprite and position of the player by calling the following methods
    this.updateSprite(state)
    this.updatePos(state);

    //If there are no more tiles left to travel...
    if (this.TilesLeft === 0) {
      //if speedBoost is true and the player's speed is default
      if (state.speedBoost && this.speed === 1) {
        //...Then give the player a speed boost
        this.speed = 2; //Boosted running speed
        this.sprite.obj = this.transform //Switch to transformed entity 
        this.hud.transformHUD.opacity = 0.8 //Increase the opacity of transformHUD
        this.fx.transformFX.isFinished = false //Activate the transform effect
        //Otherwise, if speedBoost is false and the player's speed is boosted 
      } else if (state.speedBoost === false && this.speed === 2) {
        //...Then return player speed to default
        this.speed = 1; //Normal walking speed
        this.sprite.obj = this.originalSprite //Return to original entity
        this.hud.transformHUD.opacity = 0.3 //Reduce the opacity of transformHUD
        this.fx.transformFX.isFinished = false //Activate the transform effect
      }
    }

    //When TilesLeft is 0 and a direction key has been inputted
    if (this.TilesLeft === 0 && state.direction) {
      //Update the direction
      this.direction = state.direction;
      //If there is a collision in front of the player...
      if (state.map.checkCollision(this)) {
        //...Then prevent it from moving
        this.TilesLeft = 0; //Set tiles left to travel to 0
        this.behaviour = "standing" //Set the behaviour to standing
      } else { //Otherwise...
        this.TilesLeft = this.speed * 16; //Let it move with the desired speed
        this.behaviour = "walking"; //Set the behaviour to walking
      }
    }

  }

  updatePos(state) {
    if (this.TilesLeft > 0) { //If the player has to move  
      //Checks which direction it needs to move to
      const [axis, value] = this.directionDict[this.direction]
      //Changes their position value on the correct axis
      this[axis] += value * this.speed
      // If this method continues to run, the method will stop when the TilesLeft is 0
      this.TilesLeft -= this.speed * this.speed;
    }
  }
}


