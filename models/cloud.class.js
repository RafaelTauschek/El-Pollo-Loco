class Cloud extends MovableObject {  
    y = 20;
    height = 250;
    width = 500;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.speed = 2;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}