import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';

class Collectible extends GameObject {
  constructor(x, y, radius) {
    super(x, y, radius * 2, radius * 2);
    this.radius = radius;
    this.speed = 2;
    this.direction = 1;
  }
update() {
  this.x += this.speed * this.direction;

  if (this.x + this.radius > Renderer.canvas.width * 0.6 || this.x - this.radius < Renderer.canvas.width * 0.4) {
    this.direction *= -1;
  }
}

  draw() {
    Renderer.drawCircle(this.x, this.y, this.radius, 'gold');
  }
}

export default Collectible;