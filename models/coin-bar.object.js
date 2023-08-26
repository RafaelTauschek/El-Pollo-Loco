class CoinBar extends StatusBar {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    percentage = 0;


    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 10;
        this.y = 30;
        this.width = 200;
        this.height = 75;
        this.setPercentage(this.percentage, this.IMAGES);
    }
}