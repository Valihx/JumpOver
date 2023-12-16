const Images = {
  player1: new Image(), 
  player2: new Image(), 
};

const AudioFiles = {
  jump: './resources/audio/jump.WAV',
  collect: './resources/audio/collect.WAV', 
  run: './resources/audio/run.MP3', 
  dash: './resources/audio/dash.WAV', 
  button: './resources/audio/button.MP3',
  background: './resources/audio/background.MP3'
};

// Set the source of the player image.
Images.player1.src = './resources/images/player1.png'; 
// Set the source of the player2 image.
Images.player2.src = './resources/images/player2.png'; 

export { Images, AudioFiles };
