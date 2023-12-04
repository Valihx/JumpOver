const Images = {
  player: new Image(),
  player2: new Image(),
};

const AudioFiles = {
  jump: './resources/audio/jump.mp3',
  collect: './resources/audio/collect.mp3',
  jumpOver: './resources/audio/jumpOver.mp3',
  background: './resources/audio/background.mp3',
  uiClick: './resources/audio/uiClick.mp3',
  dash: './resources/audio/dash.mp3',
};

Images.player1.src = './resources/images/player/player.png';
Images.player2.src = './resources/images/player/player2.png';

export { Images, AudioFiles };
