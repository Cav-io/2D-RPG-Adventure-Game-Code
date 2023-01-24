class Sprite{
  constructor(config){
    
    this.skin = new Image(); //Creates a new image attribute for the sprite
    this.skin.src = config.src; //Sets the source of the image
    this.skin.onload = () => {//When the skin is loaded
      this.isLoaded = true; //Mark as loaded
    }

    //Player movement animation
    this.animationsMap = config.animationsMap || {
      "idle-down"  : [ [0,0] ],
      "idle-up"    : [ [1,0] ],
      "idle-left"  : [ [2,0] ],
      "idle-right" : [ [3,0] ],
      "walk-down"  : [ [0,1], [0,0], [0,3], [0,0] ],
      "walk-up"    : [ [1,1], [1,0], [1,3], [1,0] ],
      "walk-left"  : [ [2,1], [2,0], [2,3], [2,0] ],
      "walk-right" : [ [3,1], [3,0], [3,3], [3,0] ]  
    }
    
    this.animationSet = "walk-down";
    
    //Obj Class
    this.Obj = config.Obj;
  }

  //updates the current sprite set if there is a change to their direction
  updateSpriteSet(walkingDir){
    this.animationSet = walkingDir
  }


  //Sprite Methods
  drawObj(context){ 
    const {x, y} = this.Obj; //Destructuring
    if (this.isLoaded) {  //If the sprite is loaded
      const fx = this.animationsMap[this.animationSet][0][0]*16
      const fy = this.animationsMap[this.animationSet][0][1]*16
      //then draw the sprite on the game canvas 
      context.drawImage(this.skin, fx, fy, 16, 16, x, y, 16, 16) 
    }
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
    this.updateSprite()
    
    //If there are no more tiles left to travel...
    if(this.TilesLeft === 0){
      //if speedBoost is true and the player's speed is default
      if (state.speedBoost && this.speed === 1){
        //...Then give the player a speed boost
        this.speed = 2;
        console.log("Speed boost is on!")
      //Otherwise, if speedBoost is false and the player's speed is boosted 
      } else if (state.speedBoost === false && this.speed === 2){ 
        //...Then return player speed to default
        this.speed = 1;
        console.log("Speed boost is off!")
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