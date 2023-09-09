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


const buttonIds = ['setting-btn', 'control-btn', 'story-btn', 'start-btn'];

buttonIds.forEach((buttonId) => {
  const button = document.getElementById(buttonId);
  const tooltipId = buttonId.replace('-btn', '-tooltip');
  const tooltip = document.getElementById(tooltipId);

  button.addEventListener('mouseover', () => {
    tooltip.classList.remove('display-none');
  });

  button.addEventListener('mouseout', () => {
    tooltip.classList.add('display-none');
  });
});


function closeAllMenus() {
  let menus = ['setting-menu', 'control-menu', 'story-menu'];
  menus.forEach((menuId) => {
    let menu = document.getElementById(menuId);
    if (!menu.classList.contains('display-none')) {
      menu.classList.add('display-none');
    }
  });
}



function openMenu(id) {
  closeAllMenus();
  let menu = document.getElementById(id);
  menu.classList.remove('display-none');
}

function closeMenu(id) {
  let menu = document.getElementById(id);
  menu.classList.add('display-none');
}


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













