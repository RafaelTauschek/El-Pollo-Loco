class HealthBar extends StatusBar {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];


    percentage = 100;

    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 10;
        this.y = -20;
        this.width = 200;
        this.height = 75;
        this.setPercentage(this.percentage, this.IMAGES);
    }
}