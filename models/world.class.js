class World {
    sounds = new Soundboard();
    character = new Character();
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObject = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    maxCoins = this.level.coins.length;
    maxBottles = this.level.bottles.length;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollecting(this.level.coins);
            this.checkCollecting(this.level.bottles);
            this.checkBottleCollision();
            this.checkFalling();
            this.checkFirstContact();
        }, 150);
    }

    checkFirstContact() {
        if (this.character.x > 1600) {
        
        }
    }

    checkFalling() {
        setInterval(() => {
            if (this.character.speedY == 0) {
                this.character.falling = true;
            } else if (this.character.speedY == -32.5) {
                this.character.falling = false;
            }
        }, 1000 / 60)
    }


    checkThrowObjects() {
        if (this.keyboard.THROW && this.bottleBar.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.bottleBar.collectedBottles--;
            let count = this.bottleBar.collectedBottles / this.maxBottles * 100;
            this.bottleBar.setPercentage(count, this.bottleBar.IMAGES);
        }
    }

    checkBottleCollision() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObject.forEach((bottle) => {
                if (enemy.isColliding(bottle) && !bottle.impact) {
                    bottle.impact = true;
                    enemy.hit();
                    if (enemy instanceof Endboss) {
                        enemy.playAnimation(enemy.IMAGES_HURT);
                    }
                }
            })
        })
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isJumpingOn(enemy) && this.character.falling && !(enemy instanceof Endboss) && enemy.energy > 0) {
                enemy.hit();
                this.character.jump();
                setTimeout(() => {
                    this.level.enemies.splice(index, 1);
                }, 1000);
            } else if (this.character.isColliding(enemy) && !this.character.falling && enemy.energy > 0) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy, this.healthBar.IMAGES);
            }
        });
    }

    checkCollecting(items) {
        items.forEach((item, index) => {
            if (this.character.isColliding(item)) {
                if (item instanceof Coin) {
                    this.coinBar.collectedCoins++;
                    let count = this.coinBar.collectedCoins / this.maxCoins * 100;
                    this.coinBar.setPercentage(count, this.coinBar.IMAGES);
                }
                if (item instanceof Bottle) {
                    this.bottleBar.collectedBottles++;
                    let count = this.bottleBar.collectedBottles / this.maxBottles * 100;
                    this.bottleBar.setPercentage(count, this.bottleBar.IMAGES);
                }
                items.splice(index, 1);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        // ------- SPACE for fixed Objects
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);
        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx)
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}