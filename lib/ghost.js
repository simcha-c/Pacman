import * as Tile from './tile';

class Ghost {

  constructor(c, x, y, color) {
    this.x = x;
    this.y = y;
    this.xPos = 10;
    this.yPos = 10.5;
    this.ctx = c;
    this.dir = [0, -1];
    this.color = color;
    this.count = 0;

    this.references = {0: 'wall', 1: 'dot', 2: 'powerPellet', 3: 'empty', 4: 'tunnel', 5: 'empty', 6: "wall"};
  }

  moveGhost() {
    if (this.count === 40 || this.dir[0] + this.dir[1] === 0) {
      debugger
      this.changeDir();
      this.count = 0;
    }

    this.count += 1;
    this.validMove();
    this.x += (this.dir[0] * 1.5);
    this.y += (this.dir[1] * 1.5);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc((this.x + this.xPos), (this.y + this.yPos), 13, 0, 2*Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();

    this.moveGhost();
  }

  getPos() {
    let x = Math.floor((this.x - 20) / 20);
    let y = Math.floor((this.y - 24.5) / 21);
    return [x, y];
  }

  validMove() {
    let pos = this.getPos();
    let nextPosInfo = Tile.getNextPosInfo(pos, this.dir);
    let currentPosInfo = Tile.getPosInfo(pos);
    if (this.references[nextPosInfo] === "wall") {
      this.dir = [0, 0];
    }
    if (this.x === 620) {
      this.x = -20;
    } else if (this.x === -20) {
      this.x = 620;
    }
  }

  nextPos(pos) {
    let col = pos[0] + this.dir[0];
    let row = pos[1] + this.dir[1];
    this.x = (col * 20) + 20;
    this.y = (row * 21) + 24.5;
  }

  changeDir() {
    let dirArray = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];
    let dir = dirArray[Math.floor(Math.random() * dirArray.length)];

    let pos = this.getPos();
    if (dir === "ArrowUp" && this.dir[1] !== -1 && (pos[0] > 0 && pos[0] < 27) ) {
      let nextDirPos = Tile.getNextPosInfo(pos, [0,-1]);
      if (this.references[nextDirPos] !== "wall") {
        this.dir = [0, -1];
        this.nextPos(pos);
        this.xPos = 10;
        this.yPos = -10.5;
        this.y += 42;
      }
    } else if (dir === "ArrowDown" && this.dir[1] !== 1 && (pos[0] > 0 && pos[0] < 27) ) {
      let nextDirPos = Tile.getNextPosInfo(pos, [0, 1]);
      if (this.references[nextDirPos] !== "wall" && nextDirPos !== 5) {
        this.dir = [0, 1];
        this.nextPos(pos);
        this.xPos = 10;
        this.yPos = 10.5;
        this.y -= 21;
      }
    } else if (dir === "ArrowRight" && this.dir[0] !== 1) {
      let nextDirPos = Tile.getNextPosInfo(pos, [1, 0]);
      if (this.references[nextDirPos] !== "wall") {
        this.dir = [1, 0];
        this.nextPos(pos);
        this.xPos = 10;
        this.yPos = 10.5;
        this.x -= 20;
      }
    } else if (dir === "ArrowLeft" && this.dir[0] !== -1) {
      let nextDirPos = Tile.getNextPosInfo(pos, [-1,0]);
      if (this.references[nextDirPos] !== "wall") {
        this.dir = [-1,0];
        this.nextPos(pos);
        this.xPos = -10;
        this.yPos = 10.5;
        this.x += 40;
      }
    }
  }

}

export default Ghost;