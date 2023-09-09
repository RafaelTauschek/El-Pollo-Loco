class Soundboard {

    BACKGROUND_SOUND = new Audio('audio/background.mp3');
    ENDBOSS_BACKGROUND_SOUND = new Audio('audio/endboss-background.mp3');
    ENDBOSS_INTRO_SOUND = new Audio('audio/boss.intro.mp3');
    BOTTLE_COLLECT_SOUND = new Audio('audio/bottle.mp3');
    COIN_COLLECT_SOUND = new Audio('audio/coin-collect.mp3');
    HURT_SOUND = new Audio('audio/hurt.wav');
    ROOSTER_SOUND = new Audio('audio/rooster.mp3');
    WIN_SOUND = new Audio('audio/win.mp3');
    CHICKEN_SOUND = new Audio('audio/chicken.mp3');
    JUMPING_SOUND = new Audio('audio/jump.mp3');
    THROW_SOUND = new Audio('audio/throw.mp3');
    WALKING_SOUND = new Audio('audio/walking.mp3');
    SMASH_SOUND = new Audio('audio/bottle_smash.mp3');
    LOST_SOUND = new Audio('audio/lost.mp3');
    sound = false;


    stopAllSounds() {
        if (this.sound) {
            this.BACKGROUND_SOUND.pause();
            this.ENDBOSS_BACKGROUND_SOUND.pause();
            this.ENDBOSS_INTRO_SOUND.pause();
            this.BOTTLE_COLLECT_SOUND.pause();
            this.COIN_COLLECT_SOUND.pause();
            this.HURT_SOUND.pause();
            this.ROOSTER_SOUND.pause();
            this.CHICKEN_SOUND.pause();
            this.JUMPING_SOUND.pause();
            this.THROW_SOUND.pause();
            this.WALKING_SOUND.pause();
            this.SMASH_SOUND.pause();
        }
    }


    soundPlay(audio, volume) {
        if (this.sound) {
            audio.volume = volume;
            audio.play();
        }
    }

    soundStop(audio) {
        audio.pause();
    }

    playBackgroundSound() {
        if (this.sound) {
            this.BACKGROUND_SOUND.volume = 0.3;
            this.BACKGROUND_SOUND.loop = true;
            this.BACKGROUND_SOUND.play();
        }
    }

    playEndbossIntro() {
        if (this.sound) {
            this.ENDBOSS_INTRO_SOUND.volume = 0.3;
            this.ENDBOSS_INTRO_SOUND.play();
            setTimeout(() => {
                this.ROOSTER_SOUND.play();
            }, 1000);
        }
    }

    playEndbossTheme() {
        if (this.sound) {
            this.ENDBOSS_INTRO_SOUND.pause();
            this.ENDBOSS_BACKGROUND_SOUND.volume = 0.3;
            this.ENDBOSS_BACKGROUND_SOUND.loop = true;
            this.ENDBOSS_BACKGROUND_SOUND.play();
        }
    }












}
