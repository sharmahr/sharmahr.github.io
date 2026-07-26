export default function mazeSolverSketch(p) {
  const paper = "#111110";
  const ink = "#F2F0EC";
  const muted = "#8A8781";
  const accent = "#E2542C";

  const mazeSize = 10;
  let maze;
  let traveller;
  let solvedPath = null;
  let clickedCell = null;
  let cellSize = 25;
  let wallWidth = 4;
  let margin = 24;
  let gap = 48;
  let gridSize = mazeSize * cellSize;

  function canvasSize(max = 720) {
    return Math.max(360, Math.min(max, (p.windowWidth || max) - 48));
  }

  function updateLayout() {
    margin = Math.max(18, p.width * 0.05);
    gap = Math.max(36, p.width * 0.08);
    cellSize = (p.width - margin * 2 - gap) / (mazeSize * 2);
    gridSize = cellSize * mazeSize;
    wallWidth = Math.max(2, cellSize * 0.12);
  }

  function originA() {
    return { x: margin, y: margin };
  }

  function originB() {
    return { x: margin + gridSize + gap, y: margin };
  }

  class Box {
    constructor(i, j) {
      this.i = i;
      this.j = j;
      this.explored = false;
      this.traveller = false;
      this.lWall = true;
      this.rWall = true;
      this.tWall = true;
      this.dWall = true;
    }
  }

  class Board {
    constructor() {
      this.no = mazeSize;
      this.boxes = [];
      this.traveller = [0, 0];
      this.stack = [[0, 0]];

      for (let i = 0; i < this.no; i++) {
        this.boxes[i] = [];
        for (let j = 0; j < this.no; j++) this.boxes[i][j] = new Box(i, j);
      }
      this.boxes[0][0].traveller = true;
    }

    travelLeft() {
      const [i, j] = this.traveller;
      if (i <= 0) return;
      if (this.boxes[i - 1][j].explored && this.boxes[i - 1][j].rWall) return;
      this.boxes[i][j].traveller = false;
      this.boxes[i][j].explored = true;
      this.boxes[i][j].lWall = false;
      this.boxes[i - 1][j].rWall = false;
      this.traveller[0]--;
      this.boxes[this.traveller[0]][this.traveller[1]].traveller = true;
    }

    travelRight() {
      const [i, j] = this.traveller;
      if (i >= this.no - 1) return;
      if (this.boxes[i + 1][j].explored && this.boxes[i + 1][j].lWall) return;
      this.boxes[i][j].traveller = false;
      this.boxes[i][j].explored = true;
      this.boxes[i][j].rWall = false;
      this.boxes[i + 1][j].lWall = false;
      this.traveller[0]++;
      this.boxes[this.traveller[0]][this.traveller[1]].traveller = true;
    }

    travelUp() {
      const [i, j] = this.traveller;
      if (j <= 0) return;
      if (this.boxes[i][j - 1].explored && this.boxes[i][j - 1].dWall) return;
      this.boxes[i][j].traveller = false;
      this.boxes[i][j].explored = true;
      this.boxes[i][j].tWall = false;
      this.boxes[i][j - 1].dWall = false;
      this.traveller[1]--;
      this.boxes[this.traveller[0]][this.traveller[1]].traveller = true;
    }

    travelDown() {
      const [i, j] = this.traveller;
      if (j >= this.no - 1) return;
      if (this.boxes[i][j + 1].explored && this.boxes[i][j + 1].tWall) return;
      this.boxes[i][j].traveller = false;
      this.boxes[i][j].explored = true;
      this.boxes[i][j].dWall = false;
      this.boxes[i][j + 1].tWall = false;
      this.traveller[1]++;
      this.boxes[this.traveller[0]][this.traveller[1]].traveller = true;
    }

    getNbrs() {
      const [i, j] = this.traveller;
      const nbrs = [];
      if (i < this.no - 1 && !this.boxes[i + 1][j].explored) nbrs.push([i + 1, j, "r"]);
      if (i > 0 && !this.boxes[i - 1][j].explored) nbrs.push([i - 1, j, "l"]);
      if (j < this.no - 1 && !this.boxes[i][j + 1].explored) nbrs.push([i, j + 1, "d"]);
      if (j > 0 && !this.boxes[i][j - 1].explored) nbrs.push([i, j - 1, "t"]);
      return nbrs;
    }

    move() {
      const next = p.random(this.getNbrs());
      if (!next) return this.backtrack();
      this.stack.push(next);
      if (next[2] === "t") this.travelUp();
      if (next[2] === "d") this.travelDown();
      if (next[2] === "l") this.travelLeft();
      if (next[2] === "r") this.travelRight();
      return null;
    }

    backtrack() {
      while (this.getNbrs().length === 0) {
        if (this.explored()) return "done";
        this.boxes[this.traveller[0]][this.traveller[1]].traveller = false;
        this.boxes[this.traveller[0]][this.traveller[1]].explored = true;
        const previous = this.stack.pop();
        this.traveller[0] = previous[0];
        this.traveller[1] = previous[1];
        this.boxes[this.traveller[0]][this.traveller[1]].traveller = true;
      }
      return null;
    }

    explored() {
      for (let i = 0; i < this.no; i++) {
        for (let j = 0; j < this.no; j++) if (!this.boxes[i][j].explored) return false;
      }
      return true;
    }

    mazeDone() {
      return this.explored() ? "done" : null;
    }

    getBox(i, j) {
      return this.boxes[i][j];
    }
  }

  class Tile {
    constructor(box) {
      this.i = box.i;
      this.j = box.j;
      this.lWall = box.lWall;
      this.rWall = box.rWall;
      this.tWall = box.tWall;
      this.dWall = box.dWall;
    }

    display(origin) {
      const x = origin.x + this.i * cellSize;
      const y = origin.y + this.j * cellSize;
      p.stroke(ink);
      p.strokeWeight(wallWidth);
      if (this.lWall) p.line(x, y, x, y + cellSize);
      if (this.rWall) p.line(x + cellSize, y, x + cellSize, y + cellSize);
      if (this.tWall) p.line(x, y, x + cellSize, y);
      if (this.dWall) p.line(x, y + cellSize, x + cellSize, y + cellSize);
    }

    getWalls() {
      return [this.tWall, this.rWall, this.dWall, this.lWall];
    }
  }

  class Maze {
    constructor(board) {
      this.area = [];
      this.no = mazeSize;
      for (let i = 0; i < this.no; i++) {
        this.area[i] = [];
        for (let j = 0; j < this.no; j++) this.area[i][j] = new Tile(board.getBox(i, j));
      }
    }

    display() {
      const origin = originA();
      p.noStroke();
      p.fill(20, 18, 16);
      p.rect(origin.x, origin.y, gridSize, gridSize);
      for (let i = 0; i < this.no; i++) {
        for (let j = 0; j < this.no; j++) this.area[i][j].display(origin);
      }
    }

    getLoc(x, y) {
      const origin = originA();
      return [p.floor((x - origin.x) / cellSize), p.floor((y - origin.y) / cellSize)];
    }

    getWalls(i, j) {
      return this.area[i][j].getWalls();
    }

    displayPath(path) {
      if (!path || path.length < 2) return;
      const origin = originA();
      p.stroke(accent);
      p.strokeWeight(Math.max(3, cellSize * 0.2));
      for (let i = 0; i < path.length - 1; i++) {
        p.line(
          origin.x + path[i][0] * cellSize + cellSize / 2,
          origin.y + path[i][1] * cellSize + cellSize / 2,
          origin.x + path[i + 1][0] * cellSize + cellSize / 2,
          origin.y + path[i + 1][1] * cellSize + cellSize / 2,
        );
      }
    }
  }

  class Traveller {
    constructor(sourceMaze) {
      this.i = 0;
      this.j = 0;
      this.no = sourceMaze.no;
      this.maze = sourceMaze;
      this.area = [];
      this.stack = [[this.i, this.j]];

      for (let i = 0; i < this.no; i++) {
        this.area[i] = [];
        for (let j = 0; j < this.no; j++) {
          this.area[i][j] = [[false, false, false, false], false];
          if (i === 0) this.area[i][j][0][3] = true;
          if (i === this.no - 1) this.area[i][j][0][1] = true;
          if (j === 0) this.area[i][j][0][0] = true;
          if (j === this.no - 1) this.area[i][j][0][2] = true;
        }
      }
      this.area[this.i][this.j][1] = true;
    }

    getPath() {
      const walls = this.maze.getWalls(this.i, this.j);
      const options = [];
      if (!walls[0] && !this.area[this.i][this.j - 1][1]) options.push(0);
      if (!walls[1] && !this.area[this.i + 1][this.j][1]) options.push(1);
      if (!walls[2] && !this.area[this.i][this.j + 1][1]) options.push(2);
      if (!walls[3] && !this.area[this.i - 1][this.j][1]) options.push(3);
      return p.random(options);
    }

    drawWalls() {
      const walls = this.maze.getWalls(this.i, this.j);
      for (let k = 0; k < walls.length; k++) if (walls[k]) this.area[this.i][this.j][0][k] = true;
    }

    explored() {
      for (let i = 0; i < this.no; i++) {
        for (let j = 0; j < this.no; j++) if (!this.area[i][j][1]) return false;
      }
      this.stack = [];
      return true;
    }

    travel() {
      this.drawWalls();
      const next = this.getPath();
      if (typeof next !== "undefined") {
        if (next === 0) this.moveTop();
        if (next === 1) this.moveRight();
        if (next === 2) this.moveDown();
        if (next === 3) this.moveLeft();
        this.area[this.i][this.j][1] = true;
        this.stack.push([this.i, this.j]);
        return;
      }
      const previous = this.stack.pop();
      if (previous) [this.i, this.j] = previous;
    }

    display() {
      const discovered = originB();
      p.noStroke();
      p.fill(20, 18, 16);
      p.rect(discovered.x, discovered.y, gridSize, gridSize);

      p.stroke(muted);
      p.strokeWeight(wallWidth);
      for (let i = 0; i < this.no; i++) {
        for (let j = 0; j < this.no; j++) {
          const x = discovered.x + i * cellSize;
          const y = discovered.y + j * cellSize;
          if (this.area[i][j][0][3]) p.line(x, y, x, y + cellSize);
          if (this.area[i][j][0][1]) p.line(x + cellSize, y, x + cellSize, y + cellSize);
          if (this.area[i][j][0][0]) p.line(x, y, x + cellSize, y);
          if (this.area[i][j][0][2]) p.line(x, y + cellSize, x + cellSize, y + cellSize);
        }
      }

      const source = originA();
      p.noStroke();
      p.fill(accent);
      p.rect(
        source.x + this.i * cellSize + wallWidth,
        source.y + this.j * cellSize + wallWidth,
        cellSize - wallWidth * 2,
        cellSize - wallWidth * 2,
      );
    }

    moveTop() {
      if (this.j > 0) this.j--;
    }

    moveRight() {
      if (this.i < this.no - 1) this.i++;
    }

    moveDown() {
      if (this.j < this.no - 1) this.j++;
    }

    moveLeft() {
      if (this.i > 0) this.i--;
    }

    solve() {
      const start = [0, 0];
      const goal = `${this.no - 1},${this.no - 1}`;
      const stack = [start];
      const seen = new Set(["0,0"]);
      const parent = new Map();
      const dirs = [
        [0, -1, 0],
        [1, 0, 1],
        [0, 1, 2],
        [-1, 0, 3],
      ];

      while (stack.length) {
        const [i, j] = stack.pop();
        if (`${i},${j}` === goal) break;
        const walls = this.maze.getWalls(i, j);
        for (const [dx, dy, wall] of dirs) {
          const ni = i + dx;
          const nj = j + dy;
          const key = `${ni},${nj}`;
          if (walls[wall] || ni < 0 || nj < 0 || ni >= this.no || nj >= this.no || seen.has(key)) continue;
          seen.add(key);
          parent.set(key, `${i},${j}`);
          stack.push([ni, nj]);
        }
      }

      if (!seen.has(goal)) return [];
      const path = [];
      for (let key = goal; key; key = parent.get(key)) path.push(key.split(",").map(Number));
      return path.reverse();
    }
  }

  function generateMaze() {
    const board = new Board();
    while (board.mazeDone() !== "done") board.move();
    return new Maze(board);
  }

  function drawLabels() {
    p.noStroke();
    p.fill(ink);
    p.textSize(13);
    p.textAlign(p.LEFT, p.TOP);
    const left = originA();
    const right = originB();
    p.text("maze", left.x, left.y + gridSize + 14);
    p.fill(muted);
    p.text("solver map", right.x, right.y + gridSize + 14);
  }

  p.setup = () => {
    const size = canvasSize();
    p.createCanvas(size, size);
    updateLayout();
    maze = generateMaze();
    traveller = new Traveller(maze);
    p.frameRate(5);
  };

  p.draw = () => {
    p.background(paper);
    maze.display();
    if (!traveller.explored()) {
      traveller.travel();
      traveller.display();
    } else {
      if (!solvedPath) solvedPath = traveller.solve();
      maze.displayPath(solvedPath);
      traveller.display();
      p.noLoop();
    }

    if (clickedCell) {
      const origin = originA();
      p.noFill();
      p.stroke(accent);
      p.strokeWeight(2);
      p.rect(origin.x + clickedCell[0] * cellSize, origin.y + clickedCell[1] * cellSize, cellSize, cellSize);
    }
    drawLabels();
  };

  p.mousePressed = () => {
    if (!maze) return;
    const [i, j] = maze.getLoc(p.mouseX, p.mouseY);
    clickedCell = i >= 0 && j >= 0 && i < mazeSize && j < mazeSize ? [i, j] : null;
    p.redraw();
  };

  p.keyPressed = () => {
    if (!traveller) return false;
    if (p.keyCode === p.LEFT_ARROW) traveller.moveLeft();
    else if (p.keyCode === p.RIGHT_ARROW) traveller.moveRight();
    else if (p.keyCode === p.UP_ARROW) traveller.moveTop();
    else if (p.keyCode === p.DOWN_ARROW) traveller.moveDown();
    p.redraw();
    return false;
  };
}
