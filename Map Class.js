//declare class Map with constructor and drawLayers method 
class Map {
  constructor(config) { 
    //Assigns a name for the map
    this.name = config.name;
    this.walls = config.walls || {};
    
    //assign layer sources
    this.lowerLayer = new Image(); 
    this.lowerLayer.src = "/Maps/"+this.name+"/lower layer.png";

    this.collisionLayer = new Image(); 
    this.collisionLayer.src = "/Maps/"+this.name+"/collision layer.png";

    this.upperLayer = new Image(); 
    this.upperLayer.src = "/Maps/"+this.name+"/upper layer.png";

    
    //assign entities 
    this.entities = config.entities; 
  }

  drawLower(context, camera){
    context.drawImage(this.lowerLayer, 9*16 - camera.x, 4*16 - camera.y); //draw lower layer image 
  }

  drawCollision(context, camera){
    context.drawImage(this.collisionLayer, 9*16 - camera.x, 4*16 - camera.y); //draw lower layer image 
  }

  drawUpper(context, camera){
    context.drawImage(this.upperLayer, 9*16 - camera.x, 4*16 - camera.y); //draw lower layer image 
  }
    
  checkCollision(x, y, direction){
    let collide = true;
    let directionDict = {
      "up": [0, -1], "down": [0, 1],
      "right": [1, 0], "left": [-1, 0]
    }
    let xValue = directionDict[direction][0];
    let yValue = directionDict[direction][1];
    x += xValue;
    y += yValue;
    if(x >= 0 && x < this.walls.width && 
       y >= 0 && y < this.walls.height){
      if (Object.keys(this.walls).length !== 0){
        if (this.walls.data[x+(y*this.walls.width)] === 0){
          collide = false
        }
      }
    Object.values(this.entities).forEach(entity => {
          if(entity.isPlayer === false){
             if(x == entity.x/16 && y ==entity.y/16){            
             collide = true
             }
          }  
      })
    }
    return collide;
  }

  fetchCoordinates(){
    fetch('/Maps/'+this.name+'/collision.json')
    .then(response => response.json())
    .then(json => {
      this.walls = json.layers[0]
    })
  }
  
}

