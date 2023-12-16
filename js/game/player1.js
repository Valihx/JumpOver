import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { player1 } from '../engine/resources.js';
import Enemy from './enemy.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';


class Player1 extends GameObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.speed = 5;
    this.jumpStrength = 10;
    this.grounded = false;
    this.image = new Image();
    this.image.src = player1;
  }
  
  
    update() {
      const gamepad = navigator.getGamepads()[0];
  
      if (gamepad) {
        if (gamepad.axes[0] < -0.1) {
          this.x -= this.speed;
        } else if (gamepad.axes[0] > 0.1) {
          this.x += this.speed;
        }
  
        if (gamepad.buttons[0].pressed && this.grounded) {
          this.y -= this.jumpStrength;
          this.grounded = false;
        }
      }
        if (!this.grounded) {
        this.y += Physics.gravity;
      }
  
      for (let platform of platforms) {
        if (Physics.checkCollision(this, platform)) {
          this.grounded = true;
          break;
        } else {
          this.grounded = false;
        }
      }
    }
  
    draw() {
      Renderer.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
  
  export default Player1;