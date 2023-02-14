class keyInput {
  constructor() {

    // Initialize an empty array to track held keys
    this.keysHeld = [];

    this.speedBoolean = false;
    this.selectBoolean = false;

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

  init() {
    //The function triggers when the user presses and releases a key, respectively
    document.addEventListener('keydown', this.handleKey.bind(this));
    document.addEventListener('keyup', this.handleKey.bind(this));
  }

  handleKey(event) {
    //Gets the direction value from input key
    const direction = this.keyDirectionMap[event.code];
    //Gets the index of the direction in the keysHeld array
    const index = this.keysHeld.indexOf(direction);
    //Checks if the user presses a key
    if (event.type === 'keydown') {
      //If the held key is not in the keysHeld array...
      if (!this.keysHeld.includes(direction) && direction) {
        //...Then add the direction to the front of the keysHeld array
        this.keysHeld.unshift(direction);
      }
      //If the held key is a Shift button and the speedBoolean is false...
      if (event.code === 'ShiftLeft') {
        //... Then set the speedBoolean as true
        this.speedBoolean = true;
      }
      if (event.code === 'Enter') {
        if (this.selectBoolean) {
          this.selectBoolean = false
        } else {this.selectBoolean = true}
      }
    }
    //Checks if the user releases a key
    else if (event.type === 'keyup') {
      //If the released key is in the keysHeld array...
      if (index > -1 && direction) {
        //...Then remove the direction of the corresponding key
        this.keysHeld.splice(index, 1);
      }
      //If the released key is a Shift button and the speedBoolean is true...
      if (event.code === 'ShiftLeft' && this.speedBoolean === true) {
        //... Then set the speedBoolean as false
        this.speedBoolean = false;
      }
    }
  }

  //This function fetches the latest pressed key
  get direction() {
    return this.keysHeld[0];
  }

  //This function fetches whether the player is running or not
  get speedBoost() {
    return this.speedBoolean;
  }

  get select() {
    return this.selectBoolean
  }
}

