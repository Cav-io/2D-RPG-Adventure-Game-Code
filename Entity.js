class Sprite{
  constructor(config){

    // //Sprite Attributes
    // this.widthCut = config.widthCut;
    // this.heightCut = config.heightCut;
    
    this.skin = new Image();
    this.skin.src = config.src;
    this.skin.onload = () => {
      this.isLoaded = true; 
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

    //the default stance and animation of the character
    this.currentAnimation = config.currentanimation || "idle-down";
    this.currentAnimationFrame = 0;

    //Obj Class
    this.Obj = config.Obj;
    
  }

  //Sprite Methods
  drawObj(context){
    const x = this.Obj.x * 16;
    const y = this.Obj.y * 16;
    this.isLoaded && context.drawImage(this.skin, 0, 0, 16, 16, x, y, 16, 16)    
  }
  
}


// OBJECT CLASS

class Obj { //A blueprint for an object in the game
  constructor(config){
    this.x = config.x;
    this.y = config.y;
    this.sprite = new Sprite({Obj: this, src: config.src});
    
  }
  
}

