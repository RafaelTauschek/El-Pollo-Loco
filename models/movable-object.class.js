class MovableObject extends DrawableObject {
    speed = 0.10;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return true;
        } else {
            return this.y < 120;
        }
    }

    isColliding(mo) {
        return (
            ((this.x - this.offsetX) + (this.width - this.offsetWidth)) >= (mo.x - mo.offsetX)  &&
            (this.x - this.offsetX) <= ((mo.x - mo.offsetX) + (mo.width - mo.offsetWidth)) &&
            ((this.y - this.offsetY) + (this.height - this.offsetHeight)) >= (mo.y - mo.offsetY) &&
            (this.y - this.offsetY) <= ((mo.y - mo.offsetY) + (mo.height - mo.offsetHeight))
        );
    }

    isJumpingOn(mo) {
        if (!this.isColliding(mo) || this instanceof Endboss) {
            return false;
        }
        return (this.y - this.offsetY + this.height) >= (mo.y - mo.offsetY);
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}