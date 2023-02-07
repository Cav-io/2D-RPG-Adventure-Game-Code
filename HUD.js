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
