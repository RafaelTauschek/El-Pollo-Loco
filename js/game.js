let canvas;
let world;
let keyboard = new Keyboard();
intervalIds = [];
sounds = new Soundboard();

function init() {
  canvas = document.getElementById('canvas');
  checkOrientation();
  setInterval(() => {
    if (isMobile()) {
      document.getElementById('mobile-controls').classList.remove('display-none');
    } else {
      document.getElementById('mobile-controls').classList.add('display-none');
    }
  }, 2000);
}

function startGame() {
  document.getElementById('start-screen').classList.add('display-none');
  document.getElementById('hud').classList.add('display-none');
  setLevel();
  world = new World(canvas, keyboard, sounds);
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
  world = new World(canvas, keyboard, sounds);
}

function home() {
  document.getElementById('losing-screen').classList.add('display-none');
  document.getElementById('winning-screen').classList.add('display-none');
  document.getElementById('start-screen').classList.remove('display-none');
  document.getElementById('hud').classList.remove('display-none');
  document.getElementById('game-over-btn').classList.add('display-none');
}

const portait = window.matchMedia('(orientation: portrait)').matches;

function checkOrientation() {
  if (portait && isMobile()) {
    document.getElementById('phone-rotation').classList.remove('display-none');
  } else {
    document.getElementById('phone-rotation').classList.add('display-none');
  }
}


function isMobile() {
  return navigator.maxTouchPoints > 0 && /Android|iPhone/i.test(navigator.userAgent);
}




window.matchMedia('(orientation: portrait)').addEventListener('change', e => {
  const portait = e.matches;
  if (portait && isMobile()) {
    document.getElementById('phone-rotation').classList.remove('display-none');
  } else {
    document.getElementById('phone-rotation').classList.add('display-none');
  }
});




const buttonIds = ['setting-btn', 'control-btn', 'story-btn', 'start-btn', 'home-btn', 'restart-btn'];

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


const offSwitchMusic = document.getElementById('music-off');
const middleSwitchMusic = document.getElementById('music-middle');
const onSwitchMusic = document.getElementById('music-on');
const soundImage = document.getElementById('sound-img');

function musicOn() {
  offSwitchMusic.classList.add('display-none');
  middleSwitchMusic.classList.remove('display-none');
  setTimeout(() => {
    middleSwitchMusic.classList.add('display-none');
    onSwitchMusic.classList.remove('display-none');
  }, 50);
  soundImage.src = 'img/icons/sound-on.png';
  this.sounds.sound = true;
}


function musicOff() {
  onSwitchMusic.classList.add('display-none');
  middleSwitchMusic.classList.remove('display-none');
  setTimeout(() => {
    middleSwitchMusic.classList.add('display-none');
    offSwitchMusic.classList.remove('display-none')
  }, 50);
  soundImage.src = 'img/icons/sound-off.png';
  this.sounds.sound = false;
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


const offSwitchFullscreen = document.getElementById('fullscreen-off');
const middleSwitchFullscreen = document.getElementById('fullscreen-middle');
const onSwitchFullscreen = document.getElementById('fullscreen-on');




function fullscreen() {
  let fullscreen = document.getElementById('game-container');
  enterFullscreen(fullscreen);
  offSwitchFullscreen.classList.add('display-none');
  middleSwitchFullscreen.classList.remove('display-none');
  setTimeout(() => {
    middleSwitchFullscreen.classList.add('display-none');
    onSwitchFullscreen.classList.remove('display-none');
  }, 50);
}

function windowscreen() {
  onSwitchFullscreen.classList.add('display-none');
  middleSwitchFullscreen.classList.remove('display-none');
  setTimeout(() => {
    middleSwitchFullscreen.classList.add('display-none');
    offSwitchFullscreen.classList.remove('display-none')
  }, 50);
  exitFullscreen();
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}


function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}







