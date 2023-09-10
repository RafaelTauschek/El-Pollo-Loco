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
    * Manages the animation and behavior of an entity based on its state, energy, and proximity to the player.
    * Uses two stoppable intervals to control animations and state transitions.
    */
    animate() {
        let i = 0;
        setStoppableInterval(() => {
            console.log(this.rightDirection);
            if (i < 10) {
                this.playAnimation(this.IMAGES_ALERT)
            }
            if (this.hadFirstContact && i > 10 && !this.playerNearby && this.energy > 0) {
                this.playAnimation(this.IMAGES_WALK);
                this.moveLeft();
            }
            if (this.hadFirstContact && i > 10 && this.playerNearby && this.energy > 0) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.moveLeft();
            }
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            }
            i++;
            if (this.firstContact) {
                i = 0;
                this.firstContact = false;
                this.hadFirstContact = true;
            }
        }, 150);

        setStoppableInterval(() => {
            if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.applyGravity();
                }, 500);
            }
        }, 500);
    }
}