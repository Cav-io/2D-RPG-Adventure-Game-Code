//declare class Map with constructor and drawLayers method 
class Map {
  constructor(config) {
    //Assigns a name for the map
    this.name = config.name;
    this.walls = config.walls || {};
    this.exits = config.exits || {};

    //Creates layer instances and assigns layer sources
    this.lowerLayer = new Image();
    this.lowerLayer.src = "/Maps/" + this.name + "/lower layer.png";

    this.collisionLayer = new Image();
    this.collisionLayer.src = "/Maps/" + this.name + "/collision layer.png";

    this.upperLayer = new Image();
    this.upperLayer.src = "/Maps/" + this.name + "/upper layer.png";


    this.entities = config.entities;
  }

  drawLower(context, camera) {
    context.drawImage(this.lowerLayer, 9 * 16 - camera.x, 4 * 16 - camera.y); //draw lower layer image 
  }

  //draw lower layer image 
  drawCollision(context, camera) {
    context.drawImage(this.collisionLayer, 9 * 16 - camera.x, 4 * 16 - camera.y);
  }

  //draw lower layer image 
  drawUpper(context, camera) {
    context.drawImage(this.upperLayer, 9 * 16 - camera.x, 4 * 16 - camera.y);
  }

  
  playerInteraction(state) {
    // Define a dictionary that maps the direction string to the corresponding x and y offsets
    let directionDict = {
      "up": [0, -1], "down": [0, 1],
      "right": [1, 0], "left": [-1, 0]
    };
    
    //New x and y coordinates of the next tile in front of the player
    const newPlayerX = player.x / 16 + directionDict[player.direction][0];
    const newPlayerY = player.y / 16 + directionDict[player.direction][1];
    
    // Initialize a flag to indicate whether the player is facing an entity that is not a monster
    let isFacingPlayer = false;
    // Iterate over all the entities
    Object.values(this.entities).forEach(entity => {
      // Check if the entity is not a monster
      if (entity.type !== "monster") {
        // Check if the entity is located in front of the player
        if (entity.x / 16 === newPlayerX && entity.y / 16 === newPlayerY) {
          //If the player has inputed enter...
          if (selectBoolean) {
            //... Then set the entity as interacting and freeze the player
            entity.interacting = true;
            player.freeze = true;
          } else {
            //Otherwise set them to false and unfreeze the player
            entity.interacting = false;
            player.freeze = false;
          }
          // Set the flag to indicate that the player is facing an entity
          isFacingPlayer = true;
        }
      }
    });
    // Return whether the player is facing an entity that is not a monster
    return isFacingPlayer;
  }


  checkCollision(obj) {
    // Set initial value of collision as false
    let collide = false;

    // Define a dictionary of direction with corresponding x and y values
    let directionDict = {
      "up": [0, -1], "down": [0, 1],
      "right": [1, 0], "left": [-1, 0]
    };

    // Destructure x and y values from the dictionary based on the input direction
    const [xValue, yValue] = directionDict[obj.direction];

    // Update x and y values based on direction
    const x = Math.round(obj.x / 16 + xValue);
    const y = Math.round(obj.y / 16 + yValue);

    // Check if new x and y values are within the bounds of the walls
    if (x >= 0 && x < this.walls.width && y >= 0 && y < this.walls.height) {
      // Check if there are any walls defined
      if (Object.keys(this.walls).length !== 0) {
        // Check if the current position contains a wall
        if (this.walls.data[x + (y * this.walls.width)] !== 0) {
          collide = true;
        }
      }
    };

    // Check for collision with entities, except the player 
    Object.values(this.entities).forEach(entity => {
      //Player to entity collsion
      if (x == Math.round(entity.x / 16) && y == Math.round(entity.y / 16)) {
        collide = true
      }
      //Entity to player collision
      if (x == Math.round(player.x / 16) && y == Math.round(player.y / 16)) {
        collide = true
      }

      // Check for player-to-entity collision while both are moving
      if (obj.isPlayer && entity.behaviour === "walking") {
        // Calculate the new position of the entity based on its current direction
        const [entityXValue, entityYValue] = directionDict[entity.direction];
        const newEntityX = entity.x / 16 + entityXValue;
        const newEntityY = entity.y / 16 + entityYValue;
        // Check if the player's position falls within the entity's new and current positions
        if ((x >= newEntityX && x <= entity.x / 16) || (x >= entity.x / 16 && x <= newEntityX)) {
          if ((y >= newEntityY && y <= entity.y / 16) || (y >= entity.y / 16 && y <= newEntityY)) {
            // If so, set the collide flag to true
            collide = true;
          }
        }
      }
    });

    // Check for entity-to-player collision while both are moving
    if (!obj.isPlayer && player.behaviour === "walking") {
      // Calculate the new position of the player based on its current direction
      const newPlayerX = Math.round(player.x / 16 + directionDict[player.direction][0])
      const newPlayerY = Math.round(player.y / 16 + directionDict[player.direction][1])
      // Check if the entity's position matches the player's new position
      if (x == newPlayerX && y == newPlayerY) {
        // If so, set the collide flag to true
        collide = true;
      }
    }

    return collide;
  }

  async fetchCoordinates() {
    // Make a fetch request to retrieve collision data for the map
    const response = await fetch(`/Maps/${this.name}/collision.json`);
    // Parse the response as a JSON object
    const json = await response.json();
    // Assign the first layer of the JSON object to the "walls" property
    this.walls = json.layers[0];
  }

  update(key, exit) {
    player.x = exit.newX * 16;
    player.y = exit.newY * 16;
    return Object.keys(window.mapDict).
      find(k => window.mapDict[k].name === exit.name)
  }
}



