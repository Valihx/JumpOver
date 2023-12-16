import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { Images } from '../engine/resources.js';

class Player2 extends GameObject {
  constructor(x, y, width, height, color) {
    super(x, y);
    this.image = new Image();
    this.image.src = 'resources/images/player2.png'; // Replace with your image path
    this.addComponent(new Renderer(color, width, height, Images.player2));
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }));
  }

  update(deltaTime) {
    let gamepads = navigator.getGamepads();
    let gamepad = gamepads[1]; 
    if (gamepad) {
      if (gamepad.axes[0] > 0.5) {
        this.physics.velocity.x = 100;
      } else if (gamepad.axes[0] < -0.5) {
        this.physics.velocity.x = -100;
      } else {
        this.physics.velocity.x = 0;
      }
      if (gamepad.axes[1] > 0.5) {
        this.physics.velocity.y = 100;
      } else if (gamepad.axes[1] < -0.5) {
        this.physics.velocity.y = -100;
      } else {
        this.physics.velocity.y = 0;
      }
    }
  
    super.update(deltaTime);
  }
}
export default Player2;