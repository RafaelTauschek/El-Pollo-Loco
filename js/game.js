let canvas;
let world;
let keyboard = new Keyboard();
intervalIds = [];

function init() {
    canvas = document.getElementById('canvas'); 
}

function startGame() {
    document.getElementById('start-screen').classList.add('display-none');
    document.getElementById('hud').classList.add('display-none');
    setLevel();
    world = new World(canvas, keyboard);
}

function showLosingScreen() {
  document.getElementById('losing-screen').classList.remove('display-none');
  document.getElementById('game-over-btn').classList.remove('display-none');
}

function showWinningScreen() {
  document.getElementById('winning-screen').classList.remove('display-none');
  document.getElementById('game-over-btn').classList.remove('display-none');
}

function restart() {
  document.getElementById('game-over-btn').classList.add('display-none');
  document.getElementById('losing-screen').classList.add('display-none');
  document.getElementById('winning-screen').classList.add('display-none');
  setLevel();
  world = new World(canvas, keyboard);
}

function home() {
  document.getElementById('losing-screen').classList.add('display-none');
  document.getElementById('winning-screen').classList.add('display-none');
  document.getElementById('start-screen').classList.remove('display-none');
  document.getElementById('hud').classList.remove('display-none');
  document.getElementById('game-over-btn').classList.add('display-none');
}


const settingButton = document.getElementById('setting-btn');
const controlButton = document.getElementById('control-btn');
const storyButton = document.getElementById('story-btn');
const startButton = document.getElementById('start-btn');

settingButton.addEventListener('mouseover', () => {
  document.getElementById('setting-tooltip').classList.remove('display-none');
});

settingButton.addEventListener('mouseout', () => {
  document.getElementById('setting-tooltip').classList.add('display-none');
});

controlButton.addEventListener('mouseover', () => {
  document.getElementById('control-tooltip').classList.remove('display-none');
});

controlButton.addEventListener('mouseout', () => {
  document.getElementById('control-tooltip').classList.add('display-none');
});

storyButton.addEventListener('mouseover', () => {
  document.getElementById('story-tooltip').classList.remove('display-none');
});

storyButton.addEventListener('mouseout', () => {
  document.getElementById('story-tooltip').classList.add('display-none');
});

startButton.addEventListener('mouseover', () => {
  document.getElementById('start-tooltip').classList.remove('display-none');
});

startButton.addEventListener('mouseout', () => {
  document.getElementById('start-tooltip').classList.add('display-none');
});


function endGame() {
    intervalIds.forEach(clearInterval);
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


function fullscreen() {
    let fullscreen = document.getElementById('game-container');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element)  {
    if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.msRequestFullscreen) {      
        element.msRequestFullscreen();
      } else if(element.webkitRequestFullscreen) {  
        element.webkitRequestFullscreen();
      }
    }


function exitFullscreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }













