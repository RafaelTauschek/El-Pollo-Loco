class Character extends MovableObject {

    height = 320;
    width = 130;
    y = 80;
    speed = 8;
    offsetY = -125;
    offsetX = -25;
    offsetWidth = 55;
    offsetHeight = 140;
    idleTimer = 0;
    idleThreshold = 5000;
    energy = 100;
    falling = false;


    IMAGES_IDLING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURTING = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DYING = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    world;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_IDLING);
        this.loadImages(this.IMAGES_LONG_IDLING);
        this.applyGravity();
        this.animate();
    }

    /**
    * Initiates animations for the character.
    * This method sets up two intervals: one for moving the character and
    * another for animating the character's appearance.
    */
    animate() {
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.animateCharacter(), 80);
    }

    /**
     * Moves the character within the game world.
     * This method handles character movement, jumping, sound effects, and camera positioning.
     */
    moveCharacter() {
        this.world.sounds.soundStop(this.world.sounds.WALKING_SOUND);
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.jump();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Animates the character's appearance based on its current state.
     * This method plays different animations depending on the character's actions,
     * such as jumping, walking, being hurt, or being idle.
     */
    animateCharacter() {
        if (this.isAboveGround()) {
            this.playJumpAnimation();
        } else if (this.characterJumpAndWalk()) {
            this.playJumpAnimation();
        } else if (this.isHurt()) {
            this.playHurtAnimation();
        } else if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.characterIsWalking()) {
            this.playWalkingAnimation();
        } else if (this.noKeyIsPressed()) {
            this.playIdlingAnimation();
        }
    }
    /**
     * Plays the idling animation for the character.
     * This method increases the idle timer and switches between long idling and regular idling animations
     * based on the elapsed time compared to the idle threshold.
     */
    playIdlingAnimation() {
        this.idleTimer += 50;
        if (this.idleTimer >= this.idleThreshold) {
            this.playAnimation(this.IMAGES_LONG_IDLING);
        } else {
            this.playAnimation(this.IMAGES_IDLING);
        }
    }

    /**
     * Checks if no keys are currently pressed and the character is not above ground.
     */
    noKeyIsPressed() {
        return this.world.keyboard.NOKEY && !this.isAboveGround();
    }

    /**
    * Plays the walking animation for the character.
    * This method triggers the character to play the walking animation and resets the idle timer.
    */
    playWalkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.idleTimer = 0;
    }

    /**
     * Checks if the character is currently walking.
     * @returns {boolean}
     */
    characterIsWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
    * Plays the dead animation for the character.
    */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DYING);
    }

    /**
     * Playes the hurt animation for the character.
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURTING);
        this.world.sounds.soundPlay(this.world.sounds.HURT_SOUND, 0.3);
        this.idleTimer = 0;
    }

    /**
     * Checks if the character is currently jumping and walking at the same time.
     * @returns {boolean}
     */
    characterJumpAndWalk() {
        return this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT);
    }

    /**
    * Plays the jumping animation for the character.
    * This method triggers the character to play the walking animation and resets the idle timer.
    */
    playJumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.idleTimer = 0;
    }

    /**
    * Initiates a character jump, playing a sound and resetting the idle timer.
    */
    jump() {
        super.jump(this.Character);
        this.world.sounds.soundPlay(this.world.sounds.JUMPING_SOUND, 1);
        this.idleTimer = 0;
    }

    /**
    * Moves the character to the left, playing a walking sound and resetting the idle timer.
    */
    moveLeft() {
        super.moveLeft();
        this.world.sounds.soundPlay(this.world.sounds.WALKING_SOUND, 1);
        this.otherDirection = true;
        this.idleTimer = 0;
    }

    /**
     * Moves the character to the right, paying a walking sound and resetting the idle timer.
     */
    moveRight() {
        super.moveRight();
        this.world.sounds.soundPlay(this.world.sounds.WALKING_SOUND, 1);
        this.otherDirection = false;
        this.idleTimer = 0;
    }

    /**
     * Checks if the character is currently jumping.
     * @returns {boolean}
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Checks if the character can move to the left.
     * @returns {boolean}
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Checks if the character can move to the right.
     * @returns {boolean}
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }
}

