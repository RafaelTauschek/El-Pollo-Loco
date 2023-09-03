class Soundboard {

BACKGROUND_SOUND = new Audio('audio/background.mp3');
ENDBOSS_BACKGROUND_SOUND = new Audio('audio/endboss-background.mp3');
ENDBOSS_INTRO_SOUND = new Audio('audio/boss.intro.mp3');
BOTTLE_COLLECT_SOUND = new Audio('audio/bottle.mp3');
COIN_COLLECT_SOUND = new Audio('audio/coin-collect.mp3');
HURT_SOUND = new Audio('audio/hurt.wav');
ROOSTER_SOUND = new Audio('audio/rooster.mp3');
WIN_SOUND = new Audio ('audio/win.mp3');
CHICKEN_SOUND = new Audio ('audio/chicken.mp3');
JUMPING_SOUND = new Audio ('audio/jump.mp3');
THROW_SOUND = new Audio ('audio/throw.mp3');
WALKING_SOUND = new Audio ('audio/walking.mp3');
SMASH_SOUND = new Audio ('audio/bottle_smash.mp3');

sound = true;


soundPlay(audio) {
    if (sound) {
        audio.play();   
    }
}

soundStop(audio) {
    audio.pause();
}






}