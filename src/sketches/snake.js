export default function snakeSketch(p) {
  const paper = "#111110";
  const tile = "#1C1917";
  const ink = "#F2F0EC";
  const accent = "#E2542C";

  let board;

  function canvasSize(max = 600) {
    return Math.max(320, Math.min(max, (p.windowWidth || max) - 48));
  }

  class Snake {
    constructor(side, no) {
      this.side = side;
      this.no = no;
      this.reset();
    }

    display() {
      p.noStroke();
      p.fill(ink);
      for (const [x, y] of this.body) p.rect(x * this.side, y * this.side, this.side, this.side);
    }

    update() {
      if (!this.alive) return;
      if (
        (this.vel === 0 && this.body[0][0] === 0) ||
        (this.vel === 1 && this.body[0][0] >= this.no - 1) ||
        (this.vel === 2 && this.body[0][1] === 0) ||
        (this.vel === 3 && this.body[0][1] >= this.no - 1)
      ) {
        this.alive = false;
        return;
      }

      const [headX, headY] = this.body[0];
      for (let i = this.body.length - 1; i > 0; i--) this.body[i] = [...this.body[i - 1]];
      if (this.vel === 0) this.body[0][0] = headX - 1;
      else if (this.vel === 1) this.body[0][0] = headX + 1;
      else if (this.vel === 2) this.body[0][1] = headY - 1;
      else if (this.vel === 3) this.body[0][1] = headY + 1;
    }

    velUp() {
      if (this.vel !== 3) this.vel = 2;
    }

    velDown() {
      if (this.vel !== 2) this.vel = 3;
    }

    velLeft() {
      if (this.vel !== 1) this.vel = 0;
    }

    velRight() {
      if (this.vel !== 0) this.vel = 1;
    }

    ate(food) {
      if (this.body[0][0] !== food[0] || this.body[0][1] !== food[1]) return false;
      this.body.push([...this.body[this.body.length - 1]]);
      return true;
    }

    reset() {
      this.body = [
        [6, 4],
        [5, 4],
        [4, 4],
      ];
      this.vel = 1;
      this.alive = true;
    }

    eatItself() {
      for (let i = 3; i < this.body.length; i++) {
        if (this.body[i][0] === this.body[0][0] && this.body[i][1] === this.body[0][1]) return true;
      }
      return false;
    }
  }

  class Board {
    constructor() {
      this.no = 50;
      this.side = p.width / this.no;
      this.snake = new Snake(this.side, this.no);
      this.tiles = Array.from({ length: this.no }, () => Array(this.no).fill(0));
      this.food = this.nextFood();
      this.tiles[this.food[0]][this.food[1]] = 1;
    }

    nextFood() {
      let food;
      do {
        food = [p.floor(p.random(0, this.no)), p.floor(p.random(0, this.no))];
      } while (this.snake.body.some(([x, y]) => x === food[0] && y === food[1]));
      return food;
    }

    display() {
      p.noStroke();
      for (let i = 0; i < this.no; i++) {
        for (let j = 0; j < this.no; j++) {
          p.fill(this.tiles[i][j] === 1 ? accent : tile);
          p.rect(i * this.side, j * this.side, this.side - 0.5, this.side - 0.5);
        }
      }
      this.snake.display();

      if (!this.snake.alive) {
        p.fill(paper);
        p.rect(0, p.height / 2 - 22, p.width, 44);
        p.fill(ink);
        p.textSize(18);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("click to restart", p.width / 2, p.height / 2);
      }
    }

    update() {
      if (this.snake.ate(this.food)) {
        this.tiles[this.food[0]][this.food[1]] = 0;
        this.food = this.nextFood();
        this.tiles[this.food[0]][this.food[1]] = 1;
        return;
      }
      if (this.snake.eatItself()) this.snake.alive = false;
      this.snake.update();
    }
  }

  p.setup = () => {
    const size = canvasSize();
    p.createCanvas(size, size);
    board = new Board();
    p.frameRate(10);
  };

  p.draw = () => {
    p.background(paper);
    board.update();
    board.display();
  };

  p.mousePressed = () => {
    board.snake.reset();
  };

  p.keyPressed = () => {
    if (p.keyCode === p.LEFT_ARROW) board.snake.velLeft();
    else if (p.keyCode === p.RIGHT_ARROW) board.snake.velRight();
    else if (p.keyCode === p.UP_ARROW) board.snake.velUp();
    else if (p.keyCode === p.DOWN_ARROW) board.snake.velDown();
    return false;
  };
}
