import GameObject from '../engine/gameobject.js';
import UI from '../engine/ui.js';
import Player from './player1.js';

class PlayerUI extends GameObject {
  constructor(x, y) {
    super(x, y); 

    this.player1UI = new UI('Score: 0', x, y);
    this.player2UI = new UI('Score: 0', x, y);
    this.addComponent(this.player1UI);
    this.addComponent(this.player2UI);
  }
  update(deltaTime) {
    const player1 = this.game.gameObjects.find((obj) => obj instanceof Player);

    this.uiComponent.setText(`Lives: ${player.lives} Score: ${player.score}`);
  }
}

export default PlayerUI; 
