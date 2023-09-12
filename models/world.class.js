class World {
    sounds;
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

    constructor(canvas, keyboard, sounds) {
        this.ctx = canvas.getContext('2d');
        this.sounds = sounds;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.sounds.soundStop(this.sounds.WIN_SOUND);
        this.sounds.playBackgroundSound();
    }

    /**
    * Sets the world reference for the character.
    */
    setWorld() {
        this.character.world = this;
    }

    /**
    * Runs the main game loop, checking various game conditions and interactions at a fixed interval.
    */
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
        }, 1000 / 30);
    }

    /**
    * Checks the game over conditions and triggers appropriate actions if the game is won or lost.
    */
    checkGameOver() {
        setStoppableInterval(() => {
            if (this.checkIfLost()) {
                setTimeout(() => {
                    endGame();
                    this.sounds.stopAllSounds();
                    this.sounds.soundPlay(this.sounds.LOST_SOUND, 1);
                    showLosingScreen();
                }, 500);
            } else if (this.checkIfWon()) {
                setTimeout(() => {
                    this.sounds.stopAllSounds();
                    endGame();
                    this.sounds.soundPlay(this.sounds.WIN_SOUND, 1);
                    showWinningScreen();
                }, 2000);
            }
        }, 100);
    }

    /**
    * Checks if the game is lost based on the character's energy.
    * @returns {boolean} True if the game is lost (character's energy is 0), otherwise false.
    */
    checkIfLost() {
        if (this.character.energy == 0) {
            return true;
        } else {
            return false
        }
    }

    /**
    * Checks if the game is won by defeating the end boss.
    * @returns {boolean} True if the game is won (end boss defeated), otherwise false.
    */
    checkIfWon() {
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && endboss.energy === 0) {
            return true;
        }
    }

    /**
    * Checks and controls the background music during boss encounters.
    */
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

    /**
    * Checks if the player is nearby the end boss and updates their state accordingly.
    */
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

    /**
    * Checks for the first contact with the end boss and updates their state accordingly.
    */
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

    /**
    * Checks the falling state of the character.
    * 
    * This function continuously monitors the character's vertical speed and updates
    * the character's falling state accordingly. It sets the 'falling' property of the
    * character to true if the vertical speed is 2.5 (indicating falling) and false if
    * the vertical speed is -32.5 (indicating jumping).
    */
    checkFalling() {
        setStoppableInterval(() => {
            if (this.character.speedY == 2.5) {
                this.character.falling = true;
            } else if (this.character.speedY == -32.5) {
                this.character.falling = false;
            }
        }, 1000 / 60)
    }

    /**
     * Checks if the character can throw throwable objects and initiates the throwing action.
     * 
     * This function checks if the character's input indicates a throw action (e.g., pressing a
     * specific key) and whether there are collected throwable objects available to throw. If
     * both conditions are met, it initiates the throwing action by creating a new throwable
     * object, reducing the collected bottle count, updating the bottle bar's percentage, and
     * playing a throw sound effect.
     */
    checkThrowObjects() {
        if (this.keyboard.THROW && this.bottleBar.collectedBottles > 0 && !this.isThrowing) {
            this.isThrowing = true;
            let bottle;
            if (this.character.otherDirection) {
                bottle = new ThrowableObject(this.character.x + 100 - this.character.width, this.character.y + 100, 'left')
            } else {
                bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, 'right');
            }
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

    /**
    * Checks for collisions between throwable objects (bottles) and enemies, triggering
    * appropriate actions.
    * 
    * This function iterates through the enemies and throwable objects to detect collisions
    * between them. When a collision is detected and the bottle has not impacted previously,
    * it plays a smashing sound effect, marks the bottle as impacted, and reduces the enemy's
    * energy. If the enemy is an Endboss, it also plays a chicken sound effect.
    */
    checkBottleCollision() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObject.forEach((bottle) => {
                if (enemy.isColliding(bottle) && !bottle.impact) {
                    this.sounds.soundPlay(this.sounds.SMASH_SOUND, 0.5);
                    bottle.impact = true;
                    enemy.hit();
                    if (enemy instanceof Endboss) {
                        this.sounds.soundPlay(this.sounds.CHICKEN_SOUND, 0.3)
                    }
                }
            })
        })
    }

    /**
     * Checks for collisions between the character and enemies, triggering appropriate actions.
     * 
     * This function iterates through the enemies and checks for two types of collisions:
     * 1. If the character is jumping on an enemy, and the enemy has energy, it registers a hit,
     *    plays a chicken sound effect (if the enemy is not an Endboss), and removes the enemy
     *    from the list after a delay.
     * 2. If the character is colliding with an enemy while not falling and the enemy has energy,
     *    it registers a hit on the character and updates the character's health bar.
     */
    checkCollisions() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            const enemy = this.level.enemies[i];
            if (this.character.isJumpingOn(enemy) && this.character.falling && enemy.energy > 0) {
                if (!(enemy instanceof Endboss)) {
                    enemy.hit();
                    this.sounds.soundPlay(this.sounds.CHICKEN_SOUND, 0.5);
                    setTimeout(() => {
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

    /**
     * Checks if the character is collecting items and performs the corresponding actions.
     * 
     * @param {Array} items - An array of collectible items to check for collisions with the character.
     * 
     * This function iterates through the provided items and checks if the character is colliding
     * with any of them. If a collision is detected, the function performs the following actions:
     * 1. If the collected item is a Coin, it increments the collectedCoins count, plays a coin
     *    collect sound effect, and updates the coin bar's percentage.
     * 2. If the collected item is a Bottle, it increments the collectedBottles count, plays a bottle
     *    collect sound effect, and updates the bottle bar's percentage.
     * Finally, the collected item is removed from the items array.
     */
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

    /**
     * Clears the canvas and draws game objects on it.
     * 
     * This function is responsible for rendering the game world on the canvas. It performs the following steps:
     * 1. Clears the canvas to prepare for the next frame.
     * 2. Translates the canvas context based on the camera position to create the illusion of scrolling.
     * 3. Adds background objects and clouds to the map.
     * 4. Adds health, coin, and bottle bars to the map.
     * 5. Adds the character and other game objects (coins, bottles, enemies, throwable objects) to the map.
     * 6. Restores the canvas context's translation to its original position.
     * 7. Initiates a new animation frame to continuously update the game visuals.
     * 
     * @function
     */
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
    /**
     * Add an array of game objects to the rendering map.
     * This function iterates over an array of game objects and adds each object to the rendering map.
     * @param {Array} objects - An array of game objects to be added to the rendering map.
     * @function
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
    * Add a game object to the rendering map, optionally flipping it horizontally.
    * This function draws a game object on the canvas context and provides an option to flip the object horizontally
    * before rendering it.
    * @param {GameObject} mo - The game object to be added to the rendering map.
    * @function
    */
    addToMap(mo) {
        if (this.isInView(mo)) {
            if (mo.otherDirection) {
                this.flipImage(mo);
            }
            mo.draw(this.ctx)
            if (mo.otherDirection) {
                this.flipImageBack(mo);
            }
        }
    }

    isInView(mo) {
      if (mo.x > (this.character.x - 120) || mo.x < (this.character.x + this.character.width + 470) || mo instanceof BackgroundObject) {
        return true;
      } else {
        return false;
      }
    }

    /**
    * Flip a game object horizontally for rendering.
    * This function flips a game object horizontally by modifying the canvas context's transformation.
    * @param {GameObject} mo - The game object to be flipped horizontally.
    * @function
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Restore a game object to its original orientation after flipping.
    * This function restores a game object to its original orientation by undoing the horizontal flipping applied previously.
    * @param {GameObject} mo - The game object to be restored to its original orientation.
    * @function
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}