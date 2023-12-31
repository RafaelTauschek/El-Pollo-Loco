class ThrowableObject extends MovableObject {

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_IMPACT = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    impact = false;

    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.direction = direction
        this.height = 60;
        this.width = 50;
        this.offsetY = -5;
        this.offsetX = 0;
        this.offsetWidth = 0;
        this.offsetHeight = 10;
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_IMPACT);
        this.throw();
    }

    /**
    * Initiates animation, switching between impact and throw animations based on the 'impact' flag.
    */
    animate() {
        setStoppableInterval(() => {
            if (this.impact == true) {
                this.playAnimation(this.IMAGES_IMPACT);
            } else {
                this.playAnimation(this.IMAGES_THROW);
            }
        }, 50)
    }

    /**
    * Initiates a throwing action, setting the vertical speed, applying gravity, and animating the throw.
    */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.animate();
        if (this.direction == 'right') {
            setStoppableInterval(() => {
                this.x += 10;
            }, 25);
        } else if (this.direction == 'left') {
            setStoppableInterval(() => {
                this.x -= 10;
            }, 25);
        }
    }

} 