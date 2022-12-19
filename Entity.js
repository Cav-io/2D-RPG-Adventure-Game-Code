class Sprite{
  constructor(config){
    
    this.skin = new Image(); //Creates a new image attribute for the sprite
    this.skin.src = config.src; //Sets the source of the image
    this.skin.onload = () => {//When the skin is loaded
      this.isLoaded = true; //Mark as loaded
    }

    //Player movement animation
    this.animations = config.animations || {
      "idle-down"  : [ [0,0] ],
      "idle-up"    : [ [1,0] ],
      "idle-left"  : [ [2,0] ],
      "idle-right" : [ [3,0] ],
      "walk-down"  : [ [0,1], [0,0], [0,3], [0,0] ],
      "walk-up"    : [ [1,1], [1,0], [1,3], [1,0] ],
      "walk-left"  : [ [2,1], [2,0], [2,3], [2,0] ],
      "walk-right" : [ [3,1], [3,0], [3,3], [3,0] ]  
    }
    
    //Obj Class
    this.Obj = config.Obj;
    
    //Gives the character the sprite set based on their direction
    this.currentSpriteSet =  config.currentSpriteSet; //E.g. "idle-down"
    //Current sprite pose frame
    this.currentSpriteFrame = 0;
    //Limits the amount of frames generated in a given time bracket
    this.framesLimit = 16; //16 Frames to complete one set
    //How many frames left to generate
    this.framesLeft = this.framesLimit;

  }

  //Sprite Methods

  //updates the current sprite set if there is a change to their direction
  updateSpriteSet(walkingDir){
    this.currentSpriteSet = walkingDir;
    //Resets frames left to generate
    this.framesLeft = this.framesLimit;
  };

  updateFramesLeft(){

    //If speed boost is on...
    if(this.Obj.speed === 2){
      //...then set the frames limit to 4 (frames will generate faster)
      this.framesLimit = 4;
    } else {
      //...or else set the frames limit to default
      this.framesLimit = 16;
    }

    //If there are still frames left to generate...
    if(this.framesLeft > 0){
      //...then decrement until it is zero
      this.framesLeft -= 1;
      //Exits the if statement before this.framesLeft reaches 0
      return;
    }

    //Resets frames left to generate
    this.framesLeft = this.framesLimit;
    //Goes to the next frame 
    this.currentSpriteFrame += 1;
    
  }
  
  drawObj(context){ 
      //Gets position coordinates from the object
      const {x, y} = this.Obj;
      //Gets the frame coordinates in the spritesheet subject to direction change
      const fx = this.animations[this.currentSpriteSet][this.currentSpriteFrame][0]*16
      const fy = this.animations[this.currentSpriteSet][this.currentSpriteFrame][1]*16
      if (this.isLoaded) {  //If the sprite is loaded
        //then draw the sprite on the game canvas 
        context.drawImage(this.skin, fx, fy, 16, 16, x, y, 16, 16) 
    }
      this.updateFramesLeft();
  }
}


// OBJECT CLASS

class Obj { //A blueprint for an object in the game
  constructor(config){
    this.x = config.x*16;
    this.y = config.y*16;
    
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
    this.speed = 1
    //Assigns the axis and the value for the correspoding direction
    this.directionDict = {
      "up"   :   ["y",-1], "down" :   ["y", 1],
      "right":   ["x", 1], "left" :   ["x",-1]
    } 
  }

  //Updates the character in each loop
  update(state) {
    this.updatePos();
    this.updateSprite();
    
    if(this.TilesLeft === 0){  
      //if speedBoost is true and the player's speed is default
      if (state.speedBoost && this.speed === 1){
        //...Then give the player a speed boost
        this.speed = 2;
        console.log("%c Speed boost is on!","color:#bada55")
      //Otherwise, if speedBoost is false and the player's speed is boosted 
      } else if (state.speedBoost === false && this.speed === 2){ 
        //...Then return player speed to default
        this.speed = 1;
        console.log("%c Speed boost is off!","color:red")
      }
    }
       
    //Updates player's direction when TilesLeft is 0
    if (this.TilesLeft === 0 && state.direction){
      this.direction = state.direction;
      this.TilesLeft = this.speed*16;
    }
  }

  updatePos() {
    if (this.TilesLeft > 0) { //If the player has to move
      //Checks which direction it needs to move to
      const [axis, value] = this.directionDict[this.direction] 
      //Changes their position value on the correct axis
      this[axis] += value*this.speed
      // If this method continues to run, the method will stop when the TilesLeft is 0
      this.TilesLeft -= this.speed*this.speed;
      
    }  
  }

  //Updates the player's sprite
  updateSprite(){
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