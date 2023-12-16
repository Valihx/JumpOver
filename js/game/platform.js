import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';

class Platform extends GameObject {
  constructor() {
    const x = 0;
    const y = Renderer.canvas.height * 0.3; 
    const width = Renderer.canvas.width;
    const height = Renderer.canvas.height * 0.7; 
    super(x, y, width, height);
    this.color = 'black';
  }

  draw() {
    Renderer.drawRect(this.x, this.y, this.width, this.height, this.color);
  }
}

export default Platform;