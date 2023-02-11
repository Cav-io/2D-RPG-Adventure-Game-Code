class Player extends Obj { //GameObj that can be controlled by the user
  constructor(config) {
    super(config); //Inherits methods and attributes from Obj


    //How many grids the player has left to travel
    this.isPlayer = true;
    this.fx = config.fx
    this.TilesLeft = 0
    this.x = config.x*16 || 4*16;
    this.y = config.y*16 || 4*16;

    this.originalSprite = {
      name: this.name,
      type: this.type
    }
    this.transform = config.transform

    //Assigns the HUD dictionary
    this.hud = config.hud
    this.hud.transformHUD.name = this.transform.name
    
    //Assigns the axis and the value for the correspoding direction
    this.directionDict = {
      "up": ["y", -1], "down": ["y", 1],
      "right": ["x", 1], "left": ["x", -1]
    }
  }

    
  //Updates the character in each loop
  update(state) {
    this.updateSprite(state)
    this.updatePos(state);
    
    //If there are no more tiles left to travel...
    if (this.TilesLeft === 0) {
      //if speedBoost is true and the player's speed is default
      if (state.speedBoost && this.speed === 1) {
        //...Then give the player a speed boost
        this.speed = 2;
        this.sprite.obj= this.transform //Switch to transformed entity 
        this.hud.transformHUD.opacity = 0.8 //Increase the opacity of transformHUD
        this.fx.transformFX.isFinished = false //Activate the transform effect
        console.log("Speed boost is on!")
        //Otherwise, if speedBoost is false and the player's speed is boosted 
      } else if (state.speedBoost === false && this.speed === 2) {
        //...Then return player speed to default
        this.speed = 1;
        this.sprite.obj= this.originalSprite //Return to original entity
        this.hud.transformHUD.opacity = 0.3 //Reduce the opacity of transformHUD
        this.fx.transformFX.isFinished = false //Activate the transform effect
        console.log("Speed boost is off!")
      }
    }
    
    //Updates player's direction when TilesLeft is 0
    if (this.TilesLeft === 0 && state.direction) {
      this.direction = state.direction;
      if(state.map.checkCollision(this.x/16, this.y/16, this.direction)){
        this.TilesLeft = 0;
        this.behaviour = "standing"
      } else{
        this.TilesLeft = this.speed * 16;
        this.behviour = "walking";
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

  //Updates the player's sprite
  updateSprite(state) {
    if (this.TilesLeft === 0 && !state.direction) {
      //...Then set the player's sprite animation to 'idle' + direction
      this.sprite.updateSpriteSet("idle-" + this.direction)
      this.behaviour = "standing";
    } else {
    if (this.behaviour = "walking") {
      //...Otherwise, set the player's sprite animation to 'walk' + direction
      this.sprite.updateSpriteSet("walk-" + this.direction)
      }
    }
  }
}