class Coin extends CollactableObject {

    IMAGE = 'img/8_coin/coin_1.png';
    height = 100;
    width = 100;

    constructor (x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
    }
}