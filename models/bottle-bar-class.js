class BottleBar extends StatusBar {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

    percentage = 0;

    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 10;
        this.y = 75;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.percentage, this.IMAGES);
    }
}