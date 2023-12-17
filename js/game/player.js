import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images, AudioFiles } from '../engine/resources.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';
import Player2 from './player2.js';

class Player extends GameObject {
  constructor(x, y,name) {
    super(x, y); 
    this.name=name;
    this.renderer = new Renderer('blue', 50, 50, Images.player1); 
    this.addComponent(this.renderer);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); 
    this.addComponent(new Input());
    this.direction = 1;
    this.score = 0;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpForce = 550;
    this.jumpTime = 0.007;
    this.jumpTimer = 0;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;
    this.isgamepadDash = false;
    this.isDashing = false;
    this.dashSpeed = 850;
    this.dashDuration = 0.5;
    this.dashTimer = 0;
    this.canDash = true; 
    this.fastFallSpeed = 45; 
    this.walkSpeed = 200; 
    this.dashCooldown = 1.5; 
    this.dashCooldownTimer = 0;
    this.spawnPoint = { x: this.x, y: this.y };
    
    
    document.addEventListener('click', () => {
      this.jumpSound.play();
      this.jumpSound.pause();
      this.dashSound.play();
      this.dashSound.pause();
      this.backgroundMusic.play();
      this.backgroundMusic.pause();
    
      document.removeEventListener('click', initAudio);
    });

    this.jumpSound = new Audio(AudioFiles.jump);
    this.dashSound = new Audio(AudioFiles.dash);
  }

  update(deltaTime) {
    const physics = this.getComponent(Physics); 
    const input = this.getComponent(Input); 
    const gamepad = navigator.getGamepads()[0];


    this.handleGamepadInput(input);
    // Handle player dashing
    if (this.isDashing && this.canDash) { 
      this.dashSound.play();
      this.dashTimer -= deltaTime;
      if (this.dashTimer <= 0) {
        this.isDashing = false;
        this.isGamepadDash = false;
        this.dashTimer = this.dashDuration;
        this.canDash = false;
        this.dashCooldownTimer = this.dashCooldown; 
      }
    }
    // Handle dash coldown
    if (this.dashCooldownTimer > 0) {
      this.dashCooldownTimer -= deltaTime;
      if (this.dashCooldownTimer <= 0) {
        this.canDash = true;
      }
    }
    //dash cd
    if (this.isDashing) {
      physics.velocity.x = this.direction * this.dashSpeed;
      this.dashTimer -= deltaTime;
      if (this.dashTimer <= 0) {
        this.isDashing = false;
      }
    } 
    //Handle player jump
    if (this.isGamepadJump && this.isOnPlatform) {
      this.startJump();
      this.isGamepadJump = false;
    }
    if (this.isJumping) {
      this.jumpSound.play();
      this.updateJump(deltaTime);
    }

    // Handle collisions with collectibles
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
      }
    }
    // Handle collisions with platforms
    this.isOnPlatform = false;  // Reset this before checking collisions with platforms
    const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
    for (const platform of platforms) {
      if (physics.isColliding(platform.getComponent(Physics))) {
        if (!this.isJumping) {
          physics.velocity.y = 0;
          physics.acceleration.y = 0;
          this.y = platform.y - this.renderer.height;
          this.isOnPlatform = true;
        }
      }
    }
    // Handle collisions with the other player
    const otherPlayer = this.game.gameObjects.find((obj) => obj instanceof Player2 && obj !== this);
    if (otherPlayer) {
      const player1Physics = this.getComponent(Physics);
      const player2Physics = otherPlayer.getComponent(Physics);
      if (player1Physics.isColliding(player2Physics)) {
        console.log("colliding");
        // Check if this player is directly above the other player
        if (this.y + this.renderer.height >= otherPlayer.y) {
          // Allow this player to jump again
          this.isOnPlatform = true;
          this.isJumping = false;
        }
      }
    }
    
    super.update(deltaTime);
  }

  handleGamepadInput(input){
    const gamepad = input.getGamepad(); // Get the gamepad input
    const physics = this.getComponent(Physics); // Get physics component
    if (gamepad) {
      // Reset the gamepad flags
      this.isGamepadMovement = false;
      this.isGamepadJump = false;

      // Handle movement
      const horizontalAxis = gamepad.axes[0];
      if (horizontalAxis > 0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = 300;
        this.direction = 1; 
      } 
      else if (horizontalAxis < -0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = -300;
        this.direction = -1; 
      } 
      else {
        physics.velocity.x = 0;
      }
      if (input.isGamepadButtonDown(0) && this.isOnPlatform) {
        this.isGamepadJump = true;
        this.startJump();
      }
      if (input.isGamepadButtonDown(1) && !this.isDashing && this.canDash) {
        this.isGamepadDash = true;
        this.isDashing = true;
        this.dashTimer = this.dashDuration;
      }
      if (input.isGamepadButtonDown(2)) {
        const physics = this.getComponent(Physics); 
        physics.velocity.y += this.fastFallSpeed; 
      }
    }
  }

  startJump() {
    if (this.isOnPlatform) { 
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce;
      this.isOnPlatform = false;
    }
  }
  
  updateJump(deltaTime) {
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }
  }
  collect(collectible) {
    this.score += collectible.value;
    console.log(`Score: ${this.score}`);
    this.emitCollectParticles(collectible);
    this.resetPlayerState()
    collectible.respawn();
  }

  emitCollectParticles() {
    const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  resetPlayerState() {
    // Set the player's position to the spawn point
      this.x = this.spawnPoint.x;
      this.y = this.spawnPoint.y;
      this.getComponent(Physics).velocity = { x: 0, y: 0 };
      this.getComponent(Physics).acceleration = { x: 0, y: 0 };
      this.direction = 1;
      this.isOnPlatform = true;
      this.isJumping = false;
      this.jumpTimer = 0;
  }
}

export default Player;
