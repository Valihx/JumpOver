import Game from '../engine/game.js';
//import Player from './player.js';
//import PlayerUI from './playerUI.js';
import Platform from './platform.js';
//import Collectible from './collectible.js';

class Level extends Game {
  
  constructor(canvasId) {
    super(canvasId);
    /*
    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);
    
    this.addGameObject(new PlayerUI(10, 10));
*/
    const platformWidth = 1000;

    new Platform(0, this.canvas.height - 20, platformWidth, 20),
    addGameObject(platform);
    
}
}