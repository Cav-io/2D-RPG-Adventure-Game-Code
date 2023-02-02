class Sprite {
  constructor(config) {

    this.skin = new Image(); //Creates a new image attribute for the sprite
    this.name = config.name
    this.skin.src = "Characters/" + config.name + "/SpriteSheet.png"
    this.skin.onload = () => {//When the skin is loaded
      this.isLoaded = true; //Mark as loaded
    }

    //Player movement animation
    this.animationsMap = config.animationsMap || {
      "idle-down": [[0, 0]],
      "idle-up": [[1, 0]],
      "idle-left": [[2, 0]],
      "idle-right": [[3, 0]],
      "walk-down": [[0, 1], [0, 2], [0, 3], [0, 0]],
      "walk-up": [[1, 1], [1, 2], [1, 3], [1, 0]],
      "walk-left": [[2, 1], [2, 2], [2, 3], [2, 0]],
      "walk-right": [[3, 1], [3, 2], [3, 3], [3, 0]]
    }

    this.animationSet = config.animationSet || "idle-down";
    this.currentSpriteFrame = 0;
    this.framesLimit = 8;
    this.framesLeft = this.framesLimit;

    //Obj Class
    this.Obj = config.Obj;

  }

  //updates the current sprite set if there is a change to their direction
  updateSpriteSet(walkingDir) {
    if (this.animationSet !== walkingDir) {
      this.framesLeft = this.framesLimit;
      this.currentSpriteFrame = 0;
      this.animationSet = walkingDir
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

    if (this.framesLeft > 0) {
      this.framesLeft--;
      return;
    }

    this.framesLeft = this.framesLimit;
    this.currentSpriteFrame += 1;

    if (this.animationsMap[this.animationSet][this.currentSpriteFrame] === undefined) {
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
}


// OBJECT CLASS
class Obj { //A blueprint for an object in the game
  constructor(config) {


    this.x = config.x * 16;
    this.y = config.y * 16;
    this.speed = config.speed || 1;

    //Creates an attribute for the sprite or skin of the game object   
    this.sprite = new Sprite({ Obj: this, name: config.name });

    //The direction that the object faces
    this.direction = config.direction || "down";
  }

  //The Update method will commit changes to the object 
  update() { }
}



class Player extends Obj { //GameObj that can be controlled by the user
  constructor(config) {
    super(config); //Inherits methods and attributes from Obj


    //How many grids the player has left to travel
    this.TilesLeft = config.TilesLeft * 16 || 0;


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
        console.log("Speed boost is on!")
        //Otherwise, if speedBoost is false and the player's speed is boosted 
      } else if (state.speedBoost === false && this.speed === 2) {
        //...Then return player speed to default
        this.speed = 1;
        console.log("Speed boost is off!")
      }
    }
    
    //Updates player's direction when TilesLeft is 0
    if (this.TilesLeft === 0 && state.direction) {
      let value = this.directionDict[this.direction][1];
      this.direction = state.direction;
    if(state.map.checkCollision(this.x/16, this.y/16, this.direction)){
      this.TilesLeft = 0;
    } else{
      
      this.TilesLeft = this.speed * 16;
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
      return;
    }

    if (this.TilesLeft > 0) {
      //...Otherwise, set the player's sprite animation to 'walk' + direction
      this.sprite.updateSpriteSet("walk-" + this.direction)
    }
  }
}