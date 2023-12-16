import Game from '../engine/game.js';
import Platform from './platform.js';
import Player1 from './player1.js';
import Collectible from './collectible.js'; // Import Collectible

class Level extends Game {
  
  constructor(canvasId) {
    super(canvasId);

    const platformWidth = 1000;
    const platform = new Platform(0, this.canvas.height - 20, platformWidth, 20);
    this.addGameObject(platform);

    const player = new Player1(50, this.canvas.height - 100, 50, 50);
    this.addGameObject(player);

    const collectible = new Collectible(this.canvas.width / 2, this.canvas.height / 2, 20); 
    this.addGameObject(collectible); 
  }
}