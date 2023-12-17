import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';

class Collectible extends GameObject {
  constructor(x, y, width, height, color = 'gold') {
    super(x, y);
    this.addComponent(new Renderer(color, width, height));
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
    this.tag = 'collectible';
    this.value = 1;
    this.direction = 1; // 1 for right, -1 for left
    this.speed = 1.5; // Adjust this value to control the speed of movement

  }
  update() {
    this.x += this.direction * this.speed;
    if (this.x > 1600) {
      this.direction = -1;
    } else if (this.x < 1200) {
      this.direction = 1;
    }
  }
  respawn() {
    const newCollectible = new Collectible(Math.random() * (1700 - 1200) + 1200, 1375,);
    this.game.addGameObject(newCollectible);
  }
}
export default Collectible;