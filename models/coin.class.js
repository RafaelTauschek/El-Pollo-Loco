class Coin extends CollactableObject {

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]
    height = 100;
    width = 100;
    offsetX = -30;
    offsetY = -30;
    offsetWidth = 60;
    offsetHeight = 60;

    constructor (x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 150);
    }
} 