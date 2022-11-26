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
    const x = this.Obj.x * 16; 
    const y = this.Obj.y * 16;
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
    
  }
  
}

