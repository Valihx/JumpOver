// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player1: new Image(), // The Image instance for the player.
  player2: new Image(), // The Image instance for the enemy.
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: './resources/audio/jump.mp3', // The file path of the jump sound.
  collect: './resources/audio/collect.mp3', // The file path of the collect sound.
  // Add more audio file paths as needed
};

// Set the source of the player image.
Images.player1.src = './resources/images/player1.png'; // Update the image path

// Set the source of the player2 image.
Images.player2.src = './resources/images/player2.png'; // Update the image path

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
