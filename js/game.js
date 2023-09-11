let canvas;
let world;
let keyboard = new Keyboard();
intervalIds = [];
sounds = new Soundboard();
const portait = window.matchMedia('(orientation: portrait)').matches;
let isFullscreen = false;

/**
 * Initializes the application.
 * - Retrieves the canvas element with the ID 'canvas'.
 * - Checks the device orientation.
 * - Sets up an interval to toggle the visibility of mobile controls
 *   based on whether the device is considered mobile.
 */
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

/**
 * Starts the game by performing the following actions:
 * - Hides the start screen by adding the 'display-none' class.
 * - Hides the heads-up display (HUD) by adding the 'display-none' class.
 * - Sets the game level.
 * - Initializes the game world with the provided canvas, keyboard, and sound objects.
 */
function startGame() {
  document.getElementById('start-screen').classList.add('display-none');
  document.getElementById('hud').classList.add('display-none');
  setLevel();
  world = new World(canvas, keyboard, sounds);
  if (isFullscreen) {
    enterFullscreen(canvas);
  }
}

/**
 * Displays the losing screen by performing the following actions:
 * - Removes the 'display-none' class from the losing screen element.
 * - Removes the 'display-none' class from the game over button element.
 */
function showLosingScreen() {
  document.getElementById('losing-screen').classList.remove('display-none');
  document.getElementById('game-over-btn').classList.remove('display-none');
}

/**
 * Displays the winning screen by performing the following actions:
 * - Removes the 'display-none' class from the winning screen element.
 * - Removes the 'display-none' class from the game over button element.
 */
function showWinningScreen() {
  document.getElementById('winning-screen').classList.remove('display-none');
  document.getElementById('game-over-btn').classList.remove('display-none');
}

/**
 * Restarts the game by performing the following actions:
 * - Hides the game over button by adding the 'display-none' class.
 * - Hides the losing screen by adding the 'display-none' class.
 * - Hides the winning screen by adding the 'display-none' class.
 * - Sets the game level.
 * - Initializes the game world with the provided canvas, keyboard, and sound objects.
 */
function restart() {
  document.getElementById('game-over-btn').classList.add('display-none');
  document.getElementById('losing-screen').classList.add('display-none');
  document.getElementById('winning-screen').classList.add('display-none');
  setLevel();
  world = new World(canvas, keyboard, sounds);
}

/**
 * Returns to the home/start screen by performing the following actions:
 * - Hides the losing screen by adding the 'display-none' class.
 * - Hides the winning screen by adding the 'display-none' class.
 * - Displays the start screen by removing the 'display-none' class.
 * - Displays the heads-up display (HUD) by removing the 'display-none' class.
 * - Hides the game over button by adding the 'display-none' class.
 */
function home() {
  document.getElementById('losing-screen').classList.add('display-none');
  document.getElementById('winning-screen').classList.add('display-none');
  document.getElementById('start-screen').classList.remove('display-none');
  document.getElementById('hud').classList.remove('display-none');
  document.getElementById('game-over-btn').classList.add('display-none');
}

/**
 * Checks the device orientation and displays a phone rotation message
 * if the device is in portrait mode and is considered a mobile device.
 */
function checkOrientation() {
  if (portait && isMobile()) {
    document.getElementById('phone-rotation').classList.remove('display-none');
  } else {
    document.getElementById('phone-rotation').classList.add('display-none');
  }
}

/**
 * Checks if the current device is a mobile device based on its touch capabilities
 * and user agent information.
 *
 * @returns {boolean} True if the device is considered a mobile device, false otherwise.
 */
function isMobile() {
  return navigator.maxTouchPoints > 0 && /Android|iPhone/i.test(navigator.userAgent);
}

/**
 * Adds an event listener to track changes in the device orientation.
 * When the orientation changes to portrait on a mobile device, it displays
 * a phone rotation message; otherwise, it hides the message.
 *
 * @param {Event} e - The event object representing the change in orientation.
 */
window.matchMedia('(orientation: portrait)').addEventListener('change', e => {
  const portait = e.matches;
  if (portait && isMobile()) {
    document.getElementById('phone-rotation').classList.remove('display-none');
  } else {
    document.getElementById('phone-rotation').classList.add('display-none');
  }
});


/**
 * Adds event listeners to buttons identified by their IDs in the 'buttonIds' array.
 * When a button is hovered over, its associated tooltip is displayed; when the
 * mouse leaves the button, the tooltip is hidden.
 */
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

/**
 * Closes all menus by adding the 'display-none' class to each menu element
 * specified in the 'menus' array.
 */
function closeAllMenus() {
  let menus = ['setting-menu', 'control-menu', 'story-menu'];
  menus.forEach((menuId) => {
    let menu = document.getElementById(menuId);
    if (!menu.classList.contains('display-none')) {
      menu.classList.add('display-none');
    }
  });
}

/**
 * References to HTML elements related to music and sound control.
 */
const offSwitchMusic = document.getElementById('music-off');
const middleSwitchMusic = document.getElementById('music-middle');
const onSwitchMusic = document.getElementById('music-on');
const soundImage = document.getElementById('sound-img');

/**
 * Enables music and sound by updating the displayed elements and settings.
 */
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

/**
 * Disables music and sound by updating the displayed elements and settings.
 */
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

/**
 * Opens a specified menu by removing the 'display-none' class and closes all other menus.
 * @param {string} id - The ID of the menu to be opened.
 */
function openMenu(id) {
  closeAllMenus();
  let menu = document.getElementById(id);
  menu.classList.remove('display-none');
}

/**
 * Closes a specified menu by adding the 'display-none' class.
 * @param {string} id - The ID of the menu to be closed.
 */
function closeMenu(id) {
  let menu = document.getElementById(id);
  menu.classList.add('display-none');
}

/**
 * Ends the game by clearing all intervals registered in the 'intervalIds' array.
 */
function endGame() {
  intervalIds.forEach(clearInterval);
}

/**
 * Sets a stoppable interval that repeatedly invokes a given function at a specified time interval.
 * The interval ID is stored in the 'intervalIds' array for later management.
 * @param {Function} fn - The function to be executed at each interval.
 * @param {number} time - The time interval (in milliseconds) at which the function should be called.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * References to HTML elements related to fullscreen control.
 */
const offSwitchFullscreen = document.getElementById('fullscreen-off');
const middleSwitchFullscreen = document.getElementById('fullscreen-middle');
const onSwitchFullscreen = document.getElementById('fullscreen-on');

/**
 * Activates fullscreen mode for the game container element and updates the displayed elements.
 */
function fullscreen() {
  let fullscreen = document.getElementById('game-container');
  enterFullscreen(fullscreen);
  isFullscreen = true;
  offSwitchFullscreen.classList.add('display-none');
  middleSwitchFullscreen.classList.remove('display-none');
  setTimeout(() => {
    middleSwitchFullscreen.classList.add('display-none');
    onSwitchFullscreen.classList.remove('display-none');
  }, 50);
}

/**
 * Deactivates fullscreen mode and updates the displayed elements.
 */
function windowscreen() {
  onSwitchFullscreen.classList.add('display-none');
  middleSwitchFullscreen.classList.remove('display-none');
  setTimeout(() => {
    middleSwitchFullscreen.classList.add('display-none');
    offSwitchFullscreen.classList.remove('display-none')
  }, 50);
  exitFullscreen();
  isFullscreen = false;
}

/**
 * Attempts to enter fullscreen mode for the specified HTML element.
 * @param {HTMLElement} element - The HTML element to be displayed in fullscreen mode.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Attempts to exit fullscreen mode for the current document.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}







