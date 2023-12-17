// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Player2 from './player2.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import { Images,AudioFiles } from '../engine/resources.js';


// Define a class Level that extends the Game class from the engine
class Level extends Game {
  constructor(canvasId) {
    super(canvasId);

    document.addEventListener('click', function initAudio() {
      // Play and immediately pause all audio
      this.backgroundMusic.play();
      this.backgroundMusic.pause();
      // Remove the event listener so this only happens once
      document.removeEventListener('click', initAudio);
    });

    this.backgroundMusic = new Audio(AudioFiles.background);
    this.backgroundMusic.loop = true; // Make the music loop
    this.backgroundMusic.volume = 0.2; // Adjust the volume if necessary
    this.backgroundMusic.play(); // Start playing the music


    // Calculate the spawn position of the player
    const px = this.canvas.width * 0.55;
    const playerHeight = 100; // Replace this with the actual height of the player
    const py = this.canvas.height + 200 - playerHeight;

    // Create the player and add it to the game
    const player1 = new Player(px, py,"Player 1");
    this.addGameObject(player1);

    // Calculate the spawn position of the second player
    const px2 = this.canvas.width * 1.35; // Adjust the spawn position as necessary
    const playerHeight2 = 100; // Replace this with the actual height of the second player
    const py2 = this.canvas.height + 200 - playerHeight2;

    // Create the second player and add it to the game
    const player2 = new Player2(px2, py2,"Player 2");
    this.addGameObject(player2);

    // Add the second player UI objects to the game
    this.addGameObject(new PlayerUI(1280, 10, player2)); // Adjust the UI position as necessary

    // Add the player UI objects to the game
    this.addGameObject(new PlayerUI(10, 10, player1));
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

    // Create a collectible and add it to the game
    this.addGameObject(new Collectible(1375, this.canvas.height+60 - 100, 20, 20));
  }
}
// Export the Level class as the default export of this module
export default Level;
