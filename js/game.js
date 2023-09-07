let canvas;
let world;
let keyboard = new Keyboard();
intervalIds = [];
let overlay = document.getElementById('overlay');

function init() {
    canvas = document.getElementById('canvas'); 
}

function startGame() {
    document.getElementById('overlay').classList.add('display-none');
    setLevel();
    world = new World(canvas, keyboard);
}


function endGame() {
    intervalIds.forEach(clearInterval);
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
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













