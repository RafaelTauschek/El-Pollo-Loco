class Keyboard {

    LEFT = false;
    UP = false;
    RIGHT = false;
    SPACE = false;
    THROW = false;
    NOKEY = true;

    constructor() {
        this.bindKeyEvents();
        this.bindBtnEvents();
    }

    /**
    * Binds event listeners for keydown events to track key presses and update keyboard state.
    */
    bindKeyEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 39) {
                this.RIGHT = true;
                this.NOKEY = false;
            }
            if (e.keyCode == 37) {
                this.LEFT = true;
                this.NOKEY = false;
            }
            if (e.keyCode == 38) {
                this.UP = true;
                this.NOKEY = false;
            }
            if (e.keyCode == 32) {
                this.SPACE = true;
                this.NOKEY = false;
            }
            if (e.keyCode == 68) {
                this.THROW = true;
                this.NOKEY = false;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.keyCode == 39) {
                this.RIGHT = false;
                this.NOKEY = true;
            }
            if (e.keyCode == 37) {
                this.LEFT = false;
                this.NOKEY = true;
            }
            if (e.keyCode == 38) {
                this.UP = false;
                this.NOKEY = true;
            }
            if (e.keyCode == 32) {
                this.SPACE = false;
                this.NOKEY = true;
            }
            if (e.keyCode == 68) {
                this.THROW = false;
                this.NOKEY = true;
            }
        });
    }
    
    /**
    * Binds event listeners for touch events on virtual buttons to track button presses and update keyboard state.
    */
    bindBtnEvents() {
        document.getElementById('left-btn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
            this.NOKEY = false;
        }, { passive: false });
        document.getElementById('left-btn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
            this.NOKEY = true;
        }, { passive: false });
        document.getElementById('right-btn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
            this.NOKEY = false;
        }, { passive: false });
        document.getElementById('right-btn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
            this.NOKEY = true;
        }, { passive: false });
        document.getElementById('jump-btn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
            this.NOKEY = false;
        }, { passive: false });
        document.getElementById('jump-btn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
            this.NOKEY = true;
        }, { passive: false });
        document.getElementById('throw-btn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.THROW = true;
            this.NOKEY = false;
        }, { passive: false });
        document.getElementById('throw-btn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.THROW = false;
            this.NOKEY = true;
        }, { passive: false });
    }

}