const Pacman = require('./pacman.js');

class Game {
  constructor() {
    let canvas = document.getElementById('maze-canvas');
    let c = canvas.getContext("2d");
    new Pacman(c);
  }
}

new Game();