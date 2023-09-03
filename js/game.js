let canvas;
let world;
let keyboard = new Keyboard();
intervalIds = [];

function init() {
    canvas = document.getElementById('canvas'); 
}

function startGame() {
    document.getElementById('start-screen').classList.add('display-none');
    world = new World(canvas, keyboard);
}

function endGame() {

}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {   
        keyboard.RIGHT = true;
        keyboard.NOKEY = false;
    }

    if (e.keyCode == 37) {    
        keyboard.LEFT = true;
        keyboard.NOKEY = false;
    }

    if (e.keyCode == 38) {    
        keyboard.UP = true;
        keyboard.NOKEY = false;
    }


    if (e.keyCode == 32) {    
        keyboard.SPACE = true;
        keyboard.NOKEY = false;
    }

    if (e.keyCode == 68) {
        keyboard.THROW = true;
        keyboard.NOKEY = false;
    }
});



window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {   
        keyboard.RIGHT = false;
        keyboard.NOKEY = true;
    }

    if (e.keyCode == 37) {    
        keyboard.LEFT = false;
        keyboard.NOKEY = true;
    }

    if (e.keyCode == 38) {    
        keyboard.UP = false;
        keyboard.NOKEY = true;
    }

    if (e.keyCode == 32) {    
        keyboard.SPACE = false;
        keyboard.NOKEY = true;
    }
    if (e.keyCode == 68) {
        keyboard.THROW = false;
        keyboard.NOKEY = true;
    }
});

