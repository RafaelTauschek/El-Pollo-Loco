class Endboss extends MovableObject {

    height = 500;
    width = 300;
    y = -40;
    offsetY = -80;
    offsetX = -20;
    offsetWidth = 30;
    offsetHeight = 100;
    energy = 30;
    firstContact = false;
    hadFirstContact = false;
    playerNearby = false;
    playerLeft = true;

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4000;
        this.speed = 25;
        this.animate();
    }

    /**
    * Initiates animations and movements for the end boss character.
    * Uses stoppable intervals to control animation and actions.
    */
    animate() {
        let i = 0;
        setStoppableInterval(() => {
            this.endbossAnimationAndMovement(i);
            i++;
            if (this.firstContact) {
                i = 0;
                this.firstContact = false;
                this.hadFirstContact = true;
            }
        }, 150);
        setStoppableInterval(() => {
            if (this.energy <= 0) {
                this.playDeadAnimation();
            }
        }, 500);
    }

    /**
    * Perform animations and movements for the end boss character based on the current animation frame index.
    * @param {number} i - The current animation frame index.
    */
    endbossAnimationAndMovement(i) {
        if (i < 10)
            this.playAnimation(this.IMAGES_ALERT)
        if (this.canMoveLeft(i))
            this.moveLeft();
        if (this.playerIsCloseAndOnLeftSide(i))
            this.moveLeftAndAttack();
        if (this.canMoveRight(i))
            this.moveRight();
        if (this.playerIsCloseAndOnRightSide(i))
            this.moveRightAndAttack();
        if (this.isHurt())
            this.playAnimation(this.IMAGES_HURT)
    }

    /**
     * Determines whether the end boss character can move left based on various conditions.
     *
     * @param {number} i - The current animation frame index.
     * @returns {boolean} True if the character can move left, otherwise false.
     */
    canMoveLeft(i) {
        return this.hadFirstContact && i > 10 && !this.playerNearby && this.energy > 0 && this.playerLeft;
    }

    /**
    * Initiates the end boss character's movement to the left.
    * This method plays a walking animation and updates the character's direction.
    */
    moveLeft() {
        this.playAnimation(this.IMAGES_WALK);
        super.moveLeft();
        this.otherDirection = false;
    }

    /**
    * Determines whether the player is close and on the left side of the end boss character based on various conditions.
    *
    * @param {number} i - The current animation frame index.
    * @returns {boolean} True if the player is close and on the left side, otherwise false.
    */
    playerIsCloseAndOnLeftSide(i) {
        return this.hadFirstContact && i > 10 && this.playerNearby && this.energy > 0 && this.playerLeft;
    }

    /**
    * Initiates the end boss character's movement to the left while performing an attack.
    * This method plays an attack animation, updates the character's direction, and initiates movement.
    */
    moveLeftAndAttack() {
        this.playAnimation(this.IMAGES_ATTACK);
        super.moveLeft();
        this.otherDirection = false;
    }

    /**
     * Determines whether the end boss character can move right based on various conditions.
     *
     * @param {number} i - The current animation frame index.
     * @returns {boolean} True if the character can move right, otherwise false.
     */
    canMoveRight(i) {
        return this.hadFirstContact && i > 10 && !this.playerNearby && this.energy > 0 && !this.playerLeft;
    }

    /**
    * Initiates the end boss character's movement to the right.
    * This method plays a walking animation, updates the character's direction, and initiates movement.
    */
    moveRight() {
        this.playAnimation(this.IMAGES_WALK);
        super.moveRight();
        this.otherDirection = true;
    }

    /**
    * Determines whether the player is close and on the right side of the end boss character based on various conditions.
    *
    * @param {number} i - The current animation frame index.
    * @returns {boolean} True if the player is close and on the right side, otherwise false.
    */
    playerIsCloseAndOnRightSide(i) {
        return this.hadFirstContact && i > 10 && this.playerNearby && this.energy > 0 && !this.playerLeft;
    }

    /**
    * Initiates the end boss character's movement to the right while performing an attack.
    * This method plays an attack animation, updates the character's direction, and initiates movement.
    */
    moveRightAndAttack() {
        this.playAnimation(this.IMAGES_ATTACK);
        super.moveRight();
        this.otherDirection = true;
    }

    /**
    * Initiates the dead animation for the end boss character.
    * This method plays a dead animation and applies gravity after a delay.
    */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.applyGravity();
        }, 400);
    }
}