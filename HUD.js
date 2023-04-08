class HUD {
  constructor(config) {
    this.name = config.name //Sets the name used for filepath
    this.type = config.type //Sets the type of HUD it is
    //Coordinate position of where to draw this HUD
    this.x = config.x; 
    this.y = config.y;
    //Sets the height and width of the HUD
    this.height = config.height; 
    this.width = config.width;
    this.opacity = config.opacity || 1; // set default opacity to 1 if not provided

  }

  drawHUD(context) {
    if (this.type === "transform") { //If the type of the HUD is a transform HUD
      this.transformHUD = new Image(); //Create a new image instance for transformHUD
      //Set the transform HUD default background 
      this.transformHUD.src = "HUD/NinePathRect/DialogueBubble2.png" 
      // Create a new image for the monster element 
      this.image = new Image();
      //Set the source of the image using the name for filepath
      this.image.src = "Monsters/" + this.name + "/SpriteSheet.png"
      context.globalAlpha = this.opacity; // set the global alpha value
      context.drawImage(this.transformHUD, 8, 8) //Draws the transform HUD background
      //Draws the monster element taken from the spritesheet
      context.drawImage(this.image, 0, 0, 16, 16, 16, 16, 16, 16) 
      context.globalAlpha = 1; // reset the global alpha value back to 1
    }
  }
}


class FX {
  constructor(config) {
    this.skin = new Image(); // Create a new Image object for the FX sprite
    this.name = config.name // Set  the name used for the filepath
    this.skin.src = "FX/" + config.name + "/SpriteSheet.png" // Set the file path for the sprite
    this.isFinished = config.isFinished || false; // Sets a flag to control the animation loop

    this.skin.onload = () => { // When the sprite is loaded, mark as loaded
      this.isLoaded = true;
    }

    this.updated = false;

    this.animationsMap = config.animationsMap || { // Create an animations map or use a default
      "play": [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]]
    }

    this.animationSet = config.animationSet || "play"; // Set the initial animation set or use a default
    this.currentSpriteFrame = 0; // Set the initial sprite frame
    this.framesLimit = 2; // Set the number of frames to wait between animation frames
    this.framesLeft = this.framesLimit; // Set the frames left to the frames limit
  }

  updateFramesLeft() {
    // If there are frames left...
    if (this.framesLeft > 0) { 
       //decrement frames left and return
      this.framesLeft--;
      return;
    }

    this.framesLeft = this.framesLimit; // Reset frames left
    this.currentSpriteFrame += 1; // Increment the current sprite frame
    // If the current sprite frame doesn't exist in the animations map...
    if (this.animationsMap[this.animationSet][this.currentSpriteFrame] === undefined) { 
      //reset to 0 and mark as finished
      this.currentSpriteFrame = 0;
      this.isFinished = true; 
      return; 
    }
  }

  drawFX(context, camera) {
    // Calculate the coordinate position of the effect taking into account the player camera
    const x = player.x + 9 * 16 - camera.x 
    const y = player.y + 4 * 16 - camera.y 
    // Only update the animation if it's not finished and the sprite is loaded
    if (this.isLoaded && !this.isFinished) {  
      // Get the coordinate position of the current sprite frame
      const fx = this.animationsMap[this.animationSet][this.currentSpriteFrame][0] * 16 
      const fy = this.animationsMap[this.animationSet][this.currentSpriteFrame][1] * 16 
      // Draw the sprite
      context.drawImage(this.skin, fx, fy, 16, 16, x, y, 16, 16) 
      this.updateFramesLeft() // Update the frames left
    }
  }
}
