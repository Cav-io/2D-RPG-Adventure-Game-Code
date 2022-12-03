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
    
  }

  //Sprite Methods
  drawObj(context){ 
    const x = this.Obj.x; 
    const y = this.Obj.y;
    if (this.isLoaded == true){//If the sprite is loaded
      context.drawImage(this.skin, 0, 0, 16, 16, x, y, 16, 16) 
      //then draw the sprite on the game canvas 
    }
  }
  
}


// OBJECT CLASS

class Obj { //A blueprint for an object in the game
  constructor(config){
    this.x = config.x;
    this.y = config.y;
    this.sprite = new Sprite({Obj: this, src: config.src});
    //Creates an attribute for the sprite or skin of the game object   

    //The direction that the object faces
    this.direction = config.direction || "down";
  }
  
  //The Update method will commit changes to the object 
  update() {} 

}

class Person extends Obj{ //GameObj that can be controlled by the user
  constructor(config) {
    super(config); //Inherits methods and attributes from Obj
    
    this.movementLeft = config.movementLeft*16 || 0; 
    //How many grids the player has left to travel

    this.directionDict = {
      "up"   :   ["y",-1], "down" :   ["y", 1],
      "right":   ["x", 1], "left" :   ["x",-1]
    } //Assigns the axis and the value for the correspoding direction
    
  }

  //The update method will commit changes to the player
  update() {
    this.updatePos();
  }

  updatePos() {
    if (this.movementLeft > 0) { //If the player has to move
      const [axis, value] = this.directionDict[this.direction] 
      //Checks which direction it needs to move to
      this[axis] += value;
      //Changes their position value on the correct axis
      this.movementLeft -= 1 
      // If this method continues to run, the method will stop when the movementLeft is 0
    }
    
  }
}

