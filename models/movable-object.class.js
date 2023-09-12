class MovableObject extends DrawableObject {
    speed = 0.10;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;

    /**
    * Applies gravity to the entity's vertical position, causing it to fall if not above the ground.
    * The function is executed at a regular interval to update the entity's position.
    */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
    * Checks if the entity is above the ground based on its vertical position.
    * @returns {boolean} True if the entity is above the ground, otherwise false.
    */
    isAboveGround() {
        if (this instanceof ThrowableObject || this instanceof Endboss) {
            return true;
        } else {
            return this.y < 120;
        }
    }

    /**
    * Checks if the current entity is colliding with another movable object based on their positions and dimensions.
    * @param {MovableObject} mo - The movable object to check for collision with.
    * @returns {boolean} True if a collision is detected, otherwise false.
    */
    isColliding(mo) {
        return (
            ((this.x - this.offsetX) + (this.width - this.offsetWidth)) >= (mo.x - mo.offsetX) &&
            (this.x - this.offsetX) <= ((mo.x - mo.offsetX) + (mo.width - mo.offsetWidth)) &&
            ((this.y - this.offsetY) + (this.height - this.offsetHeight)) >= (mo.y - mo.offsetY) &&
            (this.y - this.offsetY) <= ((mo.y - mo.offsetY) + (mo.height - mo.offsetHeight))
        );
    }

    /**
    * Checks if the current entity is jumping on another movable object based on their positions and dimensions.
    * @param {MovableObject} mo - The movable object to check for jumping on.
    * @returns {boolean} True if the entity is jumping on the object, otherwise false.
    */
    isJumpingOn(mo) {
        if (!this.isColliding(mo)) {
            return false;
        }
        return ((this.y - this.offsetY) + (this.height - this.offsetHeight)) >= (mo.y - mo.offsetY);
    }

    /**
    * Reduces the entity's energy when it is hit, and records the time of the last hit.
    * If energy falls below zero, it is clamped to zero.
    */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * Checks if the entity is currently in a hurt state based on the time since the last hit.
    * @returns {boolean} True if the entity is hurt, otherwise false.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
    * Checks if the entity is currently in a dead state based on its energy level.
    * @returns {boolean} True if the entity is dead (energy is zero), otherwise false.
    */
    isDead() {
        return this.energy == 0;
    }

    /**
    * Plays an animation using a sequence of images by updating the entity's image source.
    * @param {string[]} images - An array of image paths representing the animation frames.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
    * Moves the entity to the right by updating its horizontal position and direction.
    */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
    * Moves the entity to the left by updating its horizontal position.
    */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
    * Initiates a jump action for the entity by setting its vertical speed.
    */
    jump() {
        this.speedY = 30;
    }

}