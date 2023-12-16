const Images = {
  player: new Image(),
  player2: new Image(),
};

const AudioFiles = {
  jump: './resources/audio/jump.wav',
  collect: './resources/audio/collect.mp3',
  background: './resources/audio/background.mp3',
  uiClick: './resources/audio/button.mp3',
  dash: './resources/audio/dash.wav',
};

Images.player.src = './resources/images/player.png';


export { Images, AudioFiles };
3