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

    /**
     * Stops all currently playing sounds if the 'sound' flag is enabled.
     */
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

    /**
    * Plays an audio element with a specified volume if the 'sound' flag is enabled.
    *
    * @param {HTMLAudioElement} audio - The audio element to play.
    * @param {number} volume - The volume level to set for the audio (0.0 to 1.0).
    */
    soundPlay(audio, volume) {
        if (this.sound) {
            audio.volume = volume;
            audio.play();
        }
    }

    /**
    * Stops the playback of an audio element.
    *
    * @param {HTMLAudioElement} audio - The audio element to stop.
    */
    soundStop(audio) {
        audio.pause();
    }

    /**
    * Plays the background sound with a specified volume and enables looping if the 'sound' flag is enabled.
    */
    playBackgroundSound() {
        if (this.sound) {
            this.BACKGROUND_SOUND.volume = 0.3;
            this.BACKGROUND_SOUND.loop = true;
            this.BACKGROUND_SOUND.play();
        }
    }

    /**
    * Plays the end boss intro sound with a specified volume and triggers the rooster sound after a delay if the 'sound' flag is enabled.
    */
    playEndbossIntro() {
        if (this.sound) {
            this.ENDBOSS_INTRO_SOUND.volume = 0.3;
            this.ENDBOSS_INTRO_SOUND.play();
            setTimeout(() => {
                this.ROOSTER_SOUND.play();
            }, 1000);
        }
    }

    /**
    * Plays the end boss theme sound with a specified volume, pauses the end boss intro sound, and enables looping if the 'sound' flag is enabled.
    */
    playEndbossTheme() {
        if (this.sound) {
            this.ENDBOSS_INTRO_SOUND.pause();
            this.ENDBOSS_BACKGROUND_SOUND.volume = 0.3;
            this.ENDBOSS_BACKGROUND_SOUND.loop = true;
            this.ENDBOSS_BACKGROUND_SOUND.play();
        }
    }












}
