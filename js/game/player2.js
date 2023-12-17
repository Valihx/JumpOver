import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images, AudioFiles } from '../engine/resources.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';

class Player2 extends GameObject {
  constructor(x, y) {
    super(x, y); 
    this.renderer = new Renderer('red', 50, 50, Images.player2); 
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
    this.fastFallSpeed = 65; 
    this.walkSpeed = 200; 
    this.dashCooldown = 1.5; 
    this.dashCooldownTimer = 0;
    

    document.addEventListener('click', () => {
      // Play and immediately pause all audio
      this.jumpSound.play();
      this.jumpSound.pause();
      this.dashSound.play();
      this.dashSound.pause();
      this.backgroundMusic.play();
      this.backgroundMusic.pause();
    
      // Remove the event listener so this only happens once
      document.removeEventListener('click', initAudio);
    });

    this.jumpSound = new Audio(AudioFiles.jump);
    this.dashSound = new Audio(AudioFiles.dash);
  }

  update(deltaTime) {
    const physics = this.getComponent(Physics); 
    const input = this.getComponent(Input); 
  
    // Handle player movement
    if (input.isKeyDown('KeyD')) {
      physics.velocity.x = 300;
      this.direction = 1;
    } else if (input.isKeyDown('KeyA')) {
      physics.velocity.x = -300;
      this.direction = -1;
    } else {
      physics.velocity.x = 0;
    }
  
    if (input.isKeyDown('KeyJ') && this.isOnPlatform) {
      this.startJump();
    }
    
    if (this.isJumping) {
      this.updateJump(deltaTime);
    }
    
    // Handle player dashing
    if (!this.isDashing && input.isKeyDown('KeyK') && this.canDash) { 
      this.dashSound.play(); // Play the dash sound at the start of the dash
      this.isDashing = true; // Set isDashing to true
      physics.velocity.x = this.direction * 1000; // Increase the player's velocity in the direction they're facing
      this.dashCooldownTimer = this.dashCooldown; // Start the dash cooldown
    }
    
if (this.isDashing) {
  this.dashTimer -= deltaTime;
  if (this.dashTimer <= 0) {
    this.isDashing = false;
    this.dashTimer = this.dashDuration;
    physics.velocity.x = 0; // Reset the player's velocity when the dash ends
  }
}

// Handle dash cooldown
this.dashCooldownTimer -= deltaTime;
if (this.dashCooldownTimer <= 0) {
  this.canDash = true; // Player can dash again
} else {
  this.canDash = false; // Player can't dash until cooldown is over
}

if (this.isDashing) {
  physics.velocity.x = this.direction * this.dashSpeed;
}

// Only allow dashing again if cooldown is over
if (this.dashCooldownTimer <= 0) {
  this.canDash = true; // Player can dash again
}

if (this.isDashing) {
  physics.velocity.x = this.direction * this.dashSpeed;
  this.dashTimer -= deltaTime;
  if (this.dashTimer <= 0) {
    this.isDashing = false;
  }
} 

    // Handle player fast falling
    if (input.isKeyDown('KeyS')) {
      physics.velocity.y += this.fastFallSpeed; // Increase vertical velocity
    }
    // Handle collisions with collectibles
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
        this.game.removeGameObject(collectible);
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


    super.update(deltaTime);
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
  }

  emitCollectParticles() {
    const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  resetPlayerState() {
    const platformHeight = 50; // Replace with your platform's height
    this.y = this.game.canvas.height - platformHeight - this.height;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = true;
    this.isJumping = false;
    this.jumpTimer = 0;
  }

}

export default Player2;
