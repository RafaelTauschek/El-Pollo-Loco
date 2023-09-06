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
    firstContactOccurred = false;
    firstIntroSond = false;
    isThrowing = false;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.sounds.playBackgroundSound();
    }


    setWorld() {
        this.character.world = this;
    }

    run() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollecting(this.level.coins);
            this.checkCollecting(this.level.bottles);
            this.checkBottleCollision();
            this.checkFalling();
            this.checkFirstContact();
            this.checkPlayerNearby();
            this.checkBossMusic();
            this.checkGameOver();
        }, 1000 / 60);
    }

    checkGameOver() {
        setStoppableInterval(() => {
            if (this.checkIfLost()) {
                console.log('You lost');
                endGame();
                this.sounds.stopAllSounds();
                this.sounds.soundPlay(this.sounds.LOST_SOUND, 1);
            } else if (this.checkIfWon()) {
                console.log('You won');
                setTimeout(() => {
                    endGame();
                }, 1500);
                this.sounds.stopAllSounds();
                this.sounds.soundPlay(this.sounds.WIN_SOUND, 1);

            }
        }, 100)
    }

    checkIfLost() {
        if (this.character.energy == 0) {
            return true;
        } else {
            return false
        }
    }

    checkIfWon() {
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && endboss.energy === 0) {
            return true;
        }
    }


    checkBossMusic() {
        if (this.firstContactOccurred && !this.firstIntroSond) {
            this.sounds.soundStop(this.sounds.BACKGROUND_SOUND);
            this.sounds.playEndbossIntro();
            this.firstIntroSond = true;
            setTimeout(() => {
                const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
                if (endboss && !endboss.energy === 0) {
                    this.sounds.playEndbossTheme();
                }
            }, 9500);
        }
    }


    checkPlayerNearby() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                let distance = enemy.x - this.character.x;
                if (distance < 150) {
                    enemy.playerNearby = true;
                } else {
                    enemy.playerNearby = false;
                }
            }
        })
    }

    checkFirstContact() {
        if (!this.firstContactOccurred && this.character.x > 3300) {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss) {
                    enemy.firstContact = true;
                    this.firstContactOccurred = true;
                }
            })
        }
    }

    checkFalling() {
        setStoppableInterval(() => {
            if (this.character.speedY == 2.5) {
                this.character.falling = true;
            } else if (this.character.speedY == -32.5) {
                this.character.falling = false;
            }
        }, 1000 / 60)
    }

    checkIfEndboss(mo) {
        const endboss = mo.find(obj => obj instanceof Endboss);
        if (endboss) {
            return true;
        } else {
            return false;
        }
    }


    checkThrowObjects() {
        if (this.keyboard.THROW && this.bottleBar.collectedBottles > 0 && !this.isThrowing) {
            this.isThrowing = true;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.bottleBar.collectedBottles--;
            this.sounds.soundPlay(this.sounds.THROW_SOUND, 1)
            let count = this.bottleBar.collectedBottles / this.maxBottles * 100;
            this.bottleBar.setPercentage(count, this.bottleBar.IMAGES);
            setTimeout(() => {
                this.isThrowing = false;
            }, 150);
        }
    }

    checkBottleCollision() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObject.forEach((bottle) => {
                if (enemy.isColliding(bottle) && !bottle.impact) {
                    this.sounds.soundPlay(this.sounds.SMASH_SOUND, 0.5);
                    bottle.impact = true;
                    enemy.hit();
                    if (enemy instanceof Endboss) {
                        //enemy.playAnimation(enemy.IMAGES_HURT);
                        this.sounds.soundPlay(this.sounds.CHICKEN_SOUND, 0.3)
                    }
                }
            })
        })
    }


    checkCollisions() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            const enemy = this.level.enemies[i];
            if (this.character.isJumpingOn(enemy) && this.character.falling && enemy.energy > 0) {
                if (!(enemy instanceof Endboss)) {
                    enemy.hit();
                    this.sounds.soundPlay(this.sounds.CHICKEN_SOUND, 0.5);
                    setTimeout( () => {
                        this.level.enemies.splice(i, 1);
                        i--;
                    }, 1000) 
                }
            } else if (this.character.isColliding(enemy) && !this.character.falling && enemy.energy > 0) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy, this.healthBar.IMAGES);
            }
        }
    }


    checkCollecting(items) {
        items.forEach((item, index) => {
            if (this.character.isColliding(item)) {
                if (item instanceof Coin) {
                    this.coinBar.collectedCoins++;
                    this.sounds.soundPlay(this.sounds.COIN_COLLECT_SOUND, 0.15);
                    let count = this.coinBar.collectedCoins / this.maxCoins * 100;
                    this.coinBar.setPercentage(count, this.coinBar.IMAGES);
                }
                if (item instanceof Bottle) {
                    this.bottleBar.collectedBottles++;
                    this.sounds.soundPlay(this.sounds.BOTTLE_COLLECT_SOUND, 0.3);
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
        //mo.drawFrame(this.ctx);
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