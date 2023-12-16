// This class depends on the Component, which is a separate module and needs to be imported.
import Component from './component.js';

// The Input class is responsible for handling keyboard and gamepad input.
class Input extends Component {
  // The constructor initializes a new instance of the Input class.
  constructor() {
    // Call the constructor of the parent class (Component).
    super();
    // The index of the gamepad that this input component is listening to.
    this.gamepadIndex = null;
  }
  // This method returns the current state of the gamepad this input component is listening to, or null if there is no such gamepad.
  getGamepad() {
    // If a gamepad index has been set...
    if (this.gamepadIndex !== null) {
      // Get the list of all gamepads...
      const gamepads = navigator.getGamepads();
      // And return the gamepad at the stored index.
      return gamepads[this.gamepadIndex];
    }
    // If no gamepad index has been set, return null.
    return null;
  }

  // This method checks if a particular button on the gamepad is down.
  isGamepadButtonDown(buttonIndex) {
    // Get the current state of the gamepad.
    const gamepad = this.getGamepad();
    // If a gamepad is available and the button at the given index is pressed, return true. Otherwise, return false.
    if (gamepad && gamepad.buttons[buttonIndex]) {
      return gamepad.buttons[buttonIndex].pressed;
    }
    return false;
  }

  get isJumping() {
    // Button 1 on the gamepad is the jump button
    return this.isGamepadButtonDown(1);
  }
  get isDashing() {
    // Button 2 on the gamepad is the dash button
    return this.isGamepadButtonDown(2);
  }
  get goingDown(){
    //Burron 3 on the gamepad will make the player go down faster :D
    return this.isGamepadButtonDown(3);
  }
  get isMovingRight() {
    // The horizontal axis of the left stick on the gamepad controls left/right movement
    // Positive values indicate movement to the right
    const gamepad = this.getGamepad();
    return gamepad && gamepad.axes[0] > 0.1;
  }
  get isMovingLeft() {
    // The horizontal axis of the left stick on the gamepad controls left/right movement
    // Negative values indicate movement to the left
    const gamepad = this.getGamepad();
    return gamepad && gamepad.axes[0] < -0.1;
  }

}

// The Input class is then exported as the default export of this module.
export default Input;
