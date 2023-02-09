//declare class Map with constructor and drawLayers method 
class Map {
  constructor(config) { 
    //Assigns a name for the map
    this.name = config.name;
    this.walls = config.walls || {};
    this.exits = config.exits || {};
    
    //Creates layer instances and assigns layer sources
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

  //draw lower layer image 
  drawCollision(context, camera){
    context.drawImage(this.collisionLayer, 9*16 - camera.x, 4*16 - camera.y); 
  }

  //draw lower layer image 
  drawUpper(context, camera){
    context.drawImage(this.upperLayer, 9*16 - camera.x, 4*16 - camera.y); 
  }
    
checkCollision(x, y, direction){
  // Set initial value of collision as true
  let collide = true;
  
  // Define a dictionary of direction with corresponding x and y values
  let directionDict = {
    "up": [0, -1], "down": [0, 1],
    "right": [1, 0], "left": [-1, 0]
  };
  
  // Destructure x and y values from the dictionary based on the input direction
  const [xValue, yValue] = directionDict[direction];
  
  // Update x and y values based on direction
  x += xValue;
  y += yValue;
  
  // Check if new x and y values are within the bounds of the walls
  if (x >= 0 && x < this.walls.width && y >= 0 && y < this.walls.height) {
    // Check if there are any walls defined
    if (Object.keys(this.walls).length !== 0) {
      // Check if the current position contains a wall
      if (this.walls.data[x + (y * this.walls.width)] === 0) {
        collide = false;
      }
    }   
    // Check for collision with entities, except the player
    Object.values(this.entities).forEach(entity => {
      if(entity.isPlayer === false){
        if(x == entity.x/16 && y == entity.y/16){            
          collide = true
        }
      }  
    })
  };
  // Return the final value of collision
  return collide;
  }

  async fetchCoordinates(){
    // Make a fetch request to retrieve collision data for the map
    const response = await fetch(`/Maps/${this.name}/collision.json`);
    // Parse the response as a JSON object
    const json = await response.json();
    // Assign the first layer of the JSON object to the "walls" property
    this.walls = json.layers[0];
  }

  update(key, exit){ 
    player.x = exit.newX*16;
    player.y = exit.newY*16;
    return Object.keys(window.mapDict).
      find(k => window.mapDict[k].name === exit.name)
  }

  
}



