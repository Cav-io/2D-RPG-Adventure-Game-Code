class Sprite {
  constructor(config) {

    //Obj Class
    this.Obj = config.Obj;

    this.skin = new Image(); //Creates a new image attribute for the sprite
    this.name = this.Obj.name
    this.skin.src = "Characters/" + this.Obj.name + "/SpriteSheet.png"
    if(this.Obj.type === "monster"){ 
     this.skin.src = "Monsters/" + this.Obj.name + "/SpriteSheet.png"
    }
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

  set obj(obj) {
  this._obj = obj;
  this.skin.src = "Characters/" + this._obj.name + "/SpriteSheet.png";
  if(this._obj.type === "monster"){ 
    this.skin.src = "Monsters/" + this._obj.name + "/SpriteSheet.png";
    }
  }

  get obj() {
    return this._obj;
  }
  
}


// OBJECT CLASS
class Obj { //A blueprint for an object in the game
  constructor(config) {

    this.isPlayer = false;
    this.TilesLeft = config.TilesLeft * 16 || 0*16;
    this.speed = config.speed || 1;
    this.x = config.x * 16;
    this.y = config.y * 16;
    this.name = config.name
    this.type = config.type || "character"
    this.behaviourLoop = config.behaviourLoop
    this.currentBehaviour = -1;
    this.time = 0

    this.interacting = false;
    
    if (this.TilesLeft > 0){
      this.behaviour = "walking"
    } else {  
      this.behaviour = "standing";
    }
    if(this.speed === 2){
      this.TilesLeft = this.TilesLeft *2;
    }

    //Creates an attribute for the sprite or skin of the game object   
    this.sprite = new Sprite({ Obj: this, animationSet: config.animationSet});

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

    if(this.interacting){
      return
    }
    // Check if there are tiles left to walk
    if (this.TilesLeft > 0) {
      this.behaviour = "walking"
    }
  
    // Check if the object is on a tile and there are tiles left to walk
    if (Number.isInteger(this.x / 16) && Number.isInteger(this.y / 16) && this.TilesLeft > 0) {
      // Check for collision
      if (state.map.checkCollision(this)) {
        this.behaviour = "standing"
      }
    }
  
    // Decrement the time
    if (this.time > 0) {
      this.time -= 60
    }
    this.time = Math.max(this.time, 0)
  
    // Update the position and sprite
    this.updatePos()
    this.updateSprite()
  
    // If there are no tiles left to walk and the time is 0, advance to the next behavior
    if (this.TilesLeft === 0 && this.time === 0) {
      this.currentBehaviour++
      this.startBehaviourLoop()
    }
  }

  startBehaviourLoop() {
    // Check if there is a behavior loop
    if (this.behaviourLoop) {
      // Reset the current behavior if it has exceeded the behavior loop length
      this.currentBehaviour = this.currentBehaviour % this.behaviourLoop.length
  
      // Set the behavior and direction
      const { behaviour, direction, time, tiles } = this.behaviourLoop[this.currentBehaviour]
      this.behaviour = behaviour
      this.direction = direction
  
      // Update TilesLeft and time based on the behavior
      if (behaviour === "standing") {
        this.time = time
        this.TilesLeft = 0
      } else {
        this.TilesLeft = tiles * 16
        this.time = 0
      }
    }
  }


  updatePos() {
    if (this.behaviour === "walking") { //If the player has to move  
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
}



