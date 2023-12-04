import GameObject from '../engine/gameobject.js';
import UI from '../engine/ui.js';
import Player from './player1.js';

// The PlayerUI class extends GameObject.
class PlayerUI extends GameObject {
  constructor(x, y) {
    super(x, y); // Call the constructor of the GameObject class.

    // Create a new UI component with initial text and add it to this object's components.
    this.player1UI = new UI('Score: 0', x, y);
    this.player2UI = new UI('Score: 0', x, y);
    this.addComponent(this.player1UI);
    this.addComponent(this.player2UI);
  }
  update(deltaTime) {
    // Find the player object in the game's gameObjects array.
    const player1 = this.game.gameObjects.find((obj) => obj instanceof Player);

    // Update the text of the UI component to reflect the player's current lives and score.
    this.uiComponent.setText(`Lives: ${player.lives} Score: ${player.score}`);
  }
}

export default PlayerUI; // Export the PlayerUI class for use in other modules.
