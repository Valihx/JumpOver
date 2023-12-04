import Component from './component.js';

class Input extends Component {
  constructor() {
    super();
    this.keys = {};
    this.gamepadIndex = null;

    document.addEventListener('keydown', (event) => (this.keys[event.code] = true));
    document.addEventListener('keyup', (event) => (this.keys[event.code] = false));
    

    window.addEventListener('gamepadconnected', (event) => {
      this.gamepadIndex = event.gamepad.index;
    });
    window.addEventListener('gamepaddisconnected', (event) => {
      this.gamepadIndex = null;
    });
  }

  isKeyDown(key) {
    return this.keys[key] || false;
  }
}

export default Input;
