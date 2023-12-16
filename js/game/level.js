// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Player2 from './player2.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  constructor(canvasId) {
    super(canvasId);

    // Create player1 and add it to the game
    const player1 = new Player(this.canvas.width / 2 - 50, this.canvas.height / 2 - 25);
    player1.id = 'player1'; // Assign an id to distinguish between players
    this.addGameObject(player1);

    // Create player2 and add it to the game
    const player2 = new Player(this.canvas.width / 2 + 50, this.canvas.height / 2 - 25);
    player2.id = 'player2'; // Assign an id to distinguish between players

    // Add the player UI objects to the game
    this.addGameObject(new PlayerUI(10, 10, player1));
    this.addGameObject(new PlayerUI(this.canvas.width - 100, 10, player2)); // Adjust x as needed

    // Set the game's camera target to player1
    this.camera.target = player1;

    // Define the platform's width and the gap between platforms
    const platformWidth = 2000;
    const gap = 100;

    // Create platforms and add them to the game
    const platforms = [
      new Platform(0, this.canvas.height + 200, platformWidth+200, 5000),
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(250, this.canvas.height - 100, 20, 20));
    
  }
  
}

// Export the Level class as the default export of this module
export default Level;
