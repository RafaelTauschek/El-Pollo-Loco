class Chicken extends MovableObject {
    y = 350;
    height = 100;
    width = 80;
    offsetY = -10;
    offsetX = -5;
    offsetWidth = 7;
    offsetHeight = 20;
    energy = 1;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DYING = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DYING);
        this.x = 300 + (Math.random() * 3700);
        this.speed = 1.5 + Math.random() * 1;
        this.animate();
    }

/**
 * Animates the movements and actions based on energy level.
 * Uses a stoppable interval to control behavior and animations.
 */
    animate() {
        setStoppableInterval( () => {
            if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_DYING);
            } else if (this.energy > 0) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            } 
        }, 100);
    }
}