// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Player2 from './player2.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import { Images,AudioFiles } from '../engine/resources.js';

class Level extends Game {
  constructor(canvasId) {
    super(canvasId);

    document.addEventListener('click', function initAudio() {
      this.backgroundMusic.play();
      this.backgroundMusic.pause();
      document.removeEventListener('click', initAudio);
    });

    this.backgroundMusic = new Audio(AudioFiles.background);
    this.backgroundMusic.loop = true; 
    this.backgroundMusic.volume = 0.05; 
    this.backgroundMusic.play(); 


    // Calculate the  position of the player
    const px = this.canvas.width * 0.55;
    const playerHeight = 100;
    const py = this.canvas.height + 200 - playerHeight;

    // Create the player and add it to the game
    const player1 = new Player(px, py,"Player 1");
    this.addGameObject(player1);

    // Calculate the spawn position of the second player
    const px2 = this.canvas.width * 1.35;
    const playerHeight2 = 100; 
    const py2 = this.canvas.height + 200 - playerHeight2;

    // Create the second player and add it to the game
    const player2 = new Player2(px2, py2,"Player 2");
    this.addGameObject(player2);

   //create ui
    this.addGameObject(new PlayerUI(1280, 10, player2)); 
    this.addGameObject(new PlayerUI(10, 10, player1));

    this.camera.target = player1;

    const platformWidth = 2000;
    const gap = 100;

    const platforms = [
      new Platform(0, this.canvas.height + 200, platformWidth+200, 5000),
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    this.addGameObject(new Collectible(1375, this.canvas.height-60 - 100, 20, 20));
  }

}
export default Level;
