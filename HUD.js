class HUD {
  constructor(config){
    this.image = new Image();
    this.image.src = config.src;
    this.x = config.x;
    this.y = config.y;
    this.height = config.height;
    this.width = config.width;
    this.type = config.type;
    this.opacity = config.opacity || 1; // set default opacity to 1 if not provided

    this.transformHUD = new Image();
    this.transformHUD.src = "HUD/NinePathRect/DialogueBubble2.png"
  }

  drawHUD(context){
    if(this.type === "transform"){
      context.globalAlpha = this.opacity; // set the global alpha value
      context.drawImage(this.transformHUD, 8, 8)
      context.drawImage(this.image, 0, 0, 16, 16, 16, 16, 16, 16)
      context.globalAlpha = 1; // reset the global alpha value back to 1
    }
  }
}


class FX{
  constructor(config){
    
    this.skin = new Image(); //Creates a new image attribute for the sprite
    this.name = config.name
    this.skin.src = "FX/" + config.name + "/SpriteSheet.png"

    this.skin.onload = () => {//When the skin is loaded
      this.isLoaded = true; //Mark as loaded
    }

    this.updated = false;

    //Player movement animation
    this.animationsMap = config.animationsMap || {
      "play": [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]]
    }

    this.animationSet = config.animationSet || "play";
    this.currentSpriteFrame = 0;
    this.framesLimit = 2;
    this.framesLeft = this.framesLimit;
  }

  updateFramesLeft() {
    
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
  drawFX(context, camera) {
    //const {x, y} = this.Obj; //Destructuring
    const x = player.x + 9 * 16 - camera.x
    const y = player.y + 4 * 16 - camera.y
    if (this.isLoaded) {  //If the sprite is loaded
      const fx = this.animationsMap[this.animationSet][this.currentSpriteFrame][0] * 16
      const fy = this.animationsMap[this.animationSet][this.currentSpriteFrame][1] * 16
      //then draw the sprite on the game canvas 
      context.drawImage(this.skin, fx, fy, 16, 16, x, y, 16, 16)
      this.updateFramesLeft()

    }
  }
}