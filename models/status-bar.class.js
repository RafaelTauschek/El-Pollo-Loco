class StatusBar extends DrawableObject {
    percentage;

    constructor() {
        super();
    }

    /**
    * Sets the percentage value and updates the displayed image based on the provided images.
    * @param {number} percentage - The percentage value to set (0 to 100).
    * @param {string[]} images - An array of image paths representing different states based on the percentage.
    */
    setPercentage(percentage, images) {
        this.percentage = percentage;
        let path = images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * Resolves the index of an image based on the current percentage value.
    * @returns {number} The index of the image to be displayed (0 to 5).
    */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}