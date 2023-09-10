class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
    * Loads an image from the specified file path and sets it as the character's image.
    *
    * @param {string} path - The file path of the image to be loaded.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Draws the character's image on the canvas context at the specified position and dimensions.
    * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * Loads a list of images and stores them in the character's image cache.
    * @param {string[]} arr - An array of file paths for the images to be loaded.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
    * Draws a frame (bounding box) around the object for debugging purposes.
    * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
    */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || 
            this instanceof ThrowableObject || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x - this.offsetX, this.y - this.offsetY, this.width - this.offsetWidth, this.height - this.offsetHeight);
            ctx.stroke();
        }
    }
}