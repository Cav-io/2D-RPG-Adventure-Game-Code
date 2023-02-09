class HUD {
  constructor(config){
    this.image = new Image();
    this.image.src = config.src
    this.name = config.name
    this.type = config.type
    this.x = config.x;
    this.y = config.y;
    this.height = config.height;
    this.width = config.width;
    this.type = config.type;
    this.opacity = config.opacity || 1; // set default opacity to 1 if not provided

  }

  drawHUD(context){
    if(this.type === "transform"){
      this.transformHUD = new Image();
      this.transformHUD.src = "HUD/NinePathRect/DialogueBubble2.png"
      this.image.src = "Monsters/"+this.name+"/SpriteSheet.png"
      context.globalAlpha = this.opacity; // set the global alpha value
      context.drawImage(this.transformHUD, 8, 8)
      context.drawImage(this.image, 0, 0, 16, 16, 16, 16, 16, 16)
      context.globalAlpha = 1; // reset the global alpha value back to 1
    }
  }
}


class FX{
  constructor(config){    
    this.skin = new Image(); 
    this.name = config.name
    this.skin.src = "FX/" + config.name + "/SpriteSheet.png"
    this.isFinished = config.isFinished || false; // New property to control the animation loop

    this.skin.onload = () => {
      this.isLoaded = true;
    }

    this.updated = false;

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
      this.isFinished = true; // Mark the animation as finished
      return;
    }
  }
  
  drawFX(context, camera) {
    const x = player.x + 9 * 16 - camera.x
    const y = player.y + 4 * 16 - camera.y
    if (this.isLoaded && !this.isFinished) {  // Only update the animation if it's not finished
      const fx = this.animationsMap[this.animationSet][this.currentSpriteFrame][0] * 16
      const fy = this.animationsMap[this.animationSet][this.currentSpriteFrame][1] * 16
      context.drawImage(this.skin, fx, fy, 16, 16, x, y, 16, 16)
      this.updateFramesLeft()

    }
  }
}