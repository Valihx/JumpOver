import GameObject from '../engine/gameobject.js';
import UI from '../engine/ui.js';
import Player from './player.js';

class PlayerUI extends GameObject {
  constructor(x, y, player) {
    super(x, y); // Call the constructor of the GameObject class.

    // Create a new UI component for the player
    this.uiComponent = new UI(`${player.id} Score: 0`, x, y);

    // Add the UI component to this object's components
    this.addComponent(this.uiComponent);

    // Store a reference to the player
    this.player = player;
  }

  // The update method is called every frame.
  update(deltaTime) {
    // Update the text of the UI component to reflect the player's current score.
    this.uiComponent.setText(`${this.player.name} Score: ${this.player.score}`);
  }
}
export default PlayerUI;
