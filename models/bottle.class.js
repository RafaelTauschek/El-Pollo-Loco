class Bottle extends CollactableObject {

    IMAGE = 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png';
    height = 80;
    width = 70;
    y = 350;
    offsetX = 0;
    offsetY = 0;
    offsetWidth = 0;
    offsetHeight = 0;

    constructor (x) {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
    }
} 