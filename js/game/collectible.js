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
    // Change the x position based on the direction and speed
    this.x += this.direction * this.speed;

    // If the collectible reaches the edge of the range, change the direction
    if (this.x > 1600) {
      this.direction = -1;
    } else if (this.x < 1200) {
      this.direction = 1;
    }
  }
  respawn() {
    // Create a new collectible at a random location within the specified range
    const newCollectible = new Collectible(Math.random() * (1700 - 1200) + 1200, 1375, /* other parameters */);
    // Add the new collectible to the game
    this.game.addGameObject(newCollectible);
  }
}
export default Collectible;