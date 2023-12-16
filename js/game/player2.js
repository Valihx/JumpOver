class Player2 extends GameObject {
    constructor(x, y, width, height) {
      super(x, y, width, height);
      this.speed = 5;
      this.jumpStrength = 10;
      this.grounded = false;
      this.image = new Image();
      this.image.src = player2;
    }
  
    update() {
      const gamepad = navigator.getGamepads()[1];
  
      if (gamepad) {
        if (gamepad.axes[0] < -0.1) {
          this.x -= this.speed;
        } else if (gamepad.axes[0] > 0.1) {
          this.x += this.speed;
        }
  
        if (gamepad.buttons[0].pressed && this.grounded) {
          this.y -= this.jumpStrength;
          this.grounded = false;
        }
      }
    }
  
    draw() {
      Renderer.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
  
  export default Player2;