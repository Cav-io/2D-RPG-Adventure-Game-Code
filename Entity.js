class Sprite{
  constructor(config){
    
    this.skin = new Image(); //Creates a new image attribute for the sprite
    this.skin.src = config.src; //Sets the source of the image
    this.skin.onload = () => {//When the skin is loaded
      this.isLoaded = true; //Mark as loaded
    }

    //Movement animation
    this.animations = {
      "idle-down"  : [ [0,0] ],
      "idle-up"    : [ [1,0] ],
      "idle-left"  : [ [2,0] ],
      "idle-right" : [ [3,0] ],
      "walk-down"  : [ [0,1], [0,0], [0,3], [0,0] ],
      "walk-up"    : [ [1,1], [1,0], [1,3], [1,0] ],
      "walk-left"  : [ [2,1], [2,0], [2,3], [2,0] ],
      "walk-right" : [ [3,1], [3,0], [3,3], [3,0] ]  
    }

    //Gets access to entity's attributes and methods
    this.Obj = config.Obj;

    //Current animation set
    this.currentSpriteSet = config.currentAnimation || 'walk-left';
    //Current sprite pose frame
    this.currentPoseFrame = 0;

    //Limits the amount of frames generated in a given time bracket
    this.framesLimit = 16; //16 Frames to complete one set
    //The lower limit, the faster the animation is
    this.framesRunningLimit = 4; //4 Frames to complete one set
    this.framesLeft = this.frameLimit;
  
  }

  //returns the frame at the current sprite set and pose frame
  get frame(){
    return this.animations[this.currentSpriteSet][this.currentPoseFrame]
  }

  //Determines the animation based on the walking direction
  updateSpriteSet(walkingDir){
    //If the current sprite set is not set to the new walking animation
    if (this.currentSpriteSet !== walkingDir){
      //Restart the animation
      this.currentPoseFrame = 0;
      this.framesLeft = this.framesLimit;
      //Set the current sprite set to the new walking animation
      this.currentSpriteSet = walkingDir;
    }
  }

  
  updateFrameLeft(){

    //If speed boost is toggled on...
    if(this.Obj.speed === 2){
      //...Set frames limit to frames running limit
      this.framesLimit = this.framesRunningLimit;
    } else{
      // Otherwise, set to default
      this.framesLimit = 16;
    }

    //If there are still frames left to be generated...
    if (this.framesLeft > 0){
      //... reduce the limit
      this.framesLeft -= 1;
      return;
    }

    this.framesLeft = this.framesLimit;
    this.currentPoseFrame += 1;

    //If the sprite frame is out of range...
    if(this.frame === undefined){
      //...Then reset the current animation
      this.currentPoseFrame = 0
    }


  }

  //Sprite Methods
  drawObj(context){ 
    const {x, y} = this.Obj; //Destructuring
    const [frameX, frameY] = this.frame;
    if (this.isLoaded) {  //If the sprite is loaded
      //then draw the sprite on the game canvas 
      context.drawImage(this.skin, frameX*16, frameY*16, 16, 16, x, y, 16, 16) 
    }
  this.updateFrameLeft();
  }

}


// OBJECT CLASS

class Obj { //A blueprint for an object in the game
  constructor(config){
    this.x = config.x*16;
    this.y = config.y*16;
    this.speed = 1
    //Creates an attribute for the sprite or skin of the game object   
    this.sprite = new Sprite({Obj: this, src: config.src});

    //The direction that the object faces
    this.direction = config.direction || "down";
  }
  
  //The Update method will commit changes to the object 
  update() {} 
}



class Player extends Obj{ //GameObj that can be controlled by the user
  constructor(config) {
    super(config); //Inherits methods and attributes from Obj
    
    //How many grids the player has left to travel
    this.TilesLeft = config.TilesLeft*16 || 0; 
    
    //Assigns the axis and the value for the correspoding direction
    this.directionDict = {
      "up"   :   ["y",-1], "down" :   ["y", 1],
      "right":   ["x", 1], "left" :   ["x",-1]
    } 
  }

  //Updates the character in each loop
  update(state) {
    //Update player position
    this.updatePos();
    //Update player sprite animation
    this.updateSprite();

    //If there are no more tiles left to travel...
    if(this.TilesLeft === 0){
      //if speedBoost is true and the player's speed is default
      if (state.speedBoost && this.speed === 1){
        //...Then give the player a speed boost
        this.speed = 2;
      //Otherwise, if speedBoost is false and the player's speed is boosted 
      } else if (state.speedBoost === false && this.speed === 2){ 
        //...Then return player speed to default
        this.speed = 1;
      }
    }

    //Updates player's direction when TilesLeft is 0
    if (this.TilesLeft === 0 && state.direction){
      this.direction = state.direction;
      this.TilesLeft = this.speed*16;
    }
    
  }

  //Updates the position of the player
  updatePos() {
    if (this.TilesLeft > 0) { //If the player has to move
      //Checks which direction it needs to move to
      const [axis, value] = this.directionDict[this.direction] 
      //Changes their position value on the correct axis
      this[axis] += value*this.speed
      // Travel across until there are no more tiles left to travel 
      this.TilesLeft -= this.speed*this.speed;
    }  
  }

  //Updates the player's sprite
  updateSprite(state){
    //If there are no tiles left to travel...
    if(this.TilesLeft === 0){
      //...Then set the player's sprite animation to 'idle' + direction
      this.sprite.updateSpriteSet("idle-"+this.direction)
    } else {
      //...Otherwise, set the player's sprite animation to 'walk' + direction
      this.sprite.updateSpriteSet("walk-"+this.direction)
    }
  }
  
}

class keyInput{
  constructor(){

    // Initialize an empty array to track held keys
    this.keysHeld = [];
    
    //Checks whether the character is running or not
    this.speedBoolean = false;

    // Define a map that associates key codes with directions
    this.keyDirectionMap = {
      "ArrowUp": "up",
      "ArrowDown": "down",
      "ArrowLeft": "left",
      "ArrowRight": "right",

      "KeyW": "up",
      "KeyS": "down",
      "KeyA": "left",
      "KeyD": "right"
    };    
  }

  init(){
    //The function triggers when the user presses and releases a key, respectively
    document.addEventListener('keydown', this.handleKey.bind(this));
    document.addEventListener('keyup', this.handleKey.bind(this));    
  }
  
  handleKey(event){
    //Gets the direction value from input key
    const direction = this.keyDirectionMap[event.code];
    //Gets the index of the direction in the keysHeld array
    const index = this.keysHeld.indexOf(direction);
    //Checks if the user presses a key
    if(event.type === 'keydown'){
      //If the held key is not in the keysHeld array...
      if(!this.keysHeld.includes(direction) && direction){
        //...Then add the direction to the front of the keysHeld array
        this.keysHeld.unshift(direction);
      }
      //If the held key is a Shift button and the speedBoolean is false...
      if(event.code === 'ShiftLeft' && this.speedBoolean === false){
          //... Then set the speedBoolean as true
          this.speedBoolean = true;
        }
    } 
    //Checks if the user releases a key
    else if (event.type === 'keyup'){
        //If the released key is in the keysHeld array...
        if(index > -1 && direction){
          //...Then remove the direction of the corresponding key
          this.keysHeld.splice(index, 1);
        }
        //If the released key is a Shift button and the speedBoolean is true...
        if(event.code === 'ShiftLeft' && this.speedBoolean === true){
          //... Then set the speedBoolean as false
          this.speedBoolean = false;
        }
    }
}
  //This function fetches the latest pressed key
  get direction(){
    return this.keysHeld[0];
  }

  //This function fetches whether the player is running or not
  get speedBoost(){
    return this.speedBoolean;
  }
  
}