class ChickenSmall extends MovableObject {

    y = 360;
    height = 70;
    width = 70;
    offsetY = -5;
    offsetX = 0;
    offsetWidth = 0;
    offsetHeight = 10;
    energy = 1;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DYING = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DYING);
        this.x = 300 + (Math.random() * 5000);
        this.speed = 0.8 + Math.random() * 1;
        this.animate();
    }



    animate() {

        setInterval( () => {
            if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_DYING);
            } else if (this.energy > 0) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            } 
        }, 150);
    }
}