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
    const {x, y} = this.Obj; //Destructuring
    if (this.isLoaded) {  //If the sprite is loaded
      //then draw the sprite on the game canvas 
      context.drawImage(this.skin, 0, 0, 16, 16, x, y, 16, 16) 
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

    //Assigns the axis and the value for the correspoding direction
    this.directionDict = {
      "up"   :   ["y",-1], "down" :   ["y", 1],
      "right":   ["x", 1], "left" :   ["x",-1]
    } 
  }

  //The update method will commit changes to the player
  update(state) {
    this.updatePos();

    if (this.TilesLeft === 0 && state.arrow){
      this.direction = state.arrow;
      this.TilesLeft = 1*16;
    }
  }

  updatePos() {
    if (this.TilesLeft > 0) { //If the player has to move
      const [axis, value] = this.directionDict[this.direction] 
      //Checks which direction it needs to move to
      this[axis] += value;
      //Changes their position value on the correct axis
      this.TilesLeft -= 1 
      // If this method continues to run, the method will stop when the TilesLeft is 0
    }  
  }
}

class keyInput{
  constructor(){

    // Initialize an empty array to track held keys
    this.keysHeld = [];

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

    //If the held key is not in the keysHeld array...
    if (event.type === 'keydown' && !this.keysHeld.includes(direction)) {
      //...Then add the direction to the front of the keysHeld array
      this.keysHeld.unshift(direction);
    //If the released key is in the keysHeld array...
    } else if (event.type === 'keyup' && index > -1) {
      //...Then remove the direction of the corresponding key 
      this.keysHeld.splice(index, 1);
    }
  }

  get direction(){
    return this.keysHeld[0];
  }
}