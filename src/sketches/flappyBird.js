export default function flappyBirdSketch(p) {
  const paper = "#111110";
  const ink = "#F2F0EC";
  const accent = "#E2542C";
  const muted = "#8A8781";

  let pipes = [];
  let bird;
  let counter = 0;
  let brainJSON;

  function canvasSize(max = 640) {
    return Math.max(320, Math.min(max, (p.windowWidth || max) - 48));
  }

  class Matrix {
    constructor(rows, cols) {
      this.rows = rows;
      this.cols = cols;
      this.data = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    copy() {
      const matrix = new Matrix(this.rows, this.cols);
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) matrix.data[i][j] = this.data[i][j];
      }
      return matrix;
    }

    static fromArray(arr) {
      return new Matrix(arr.length, 1).map((_, i) => arr[i]);
    }

    static multiply(a, b) {
      return new Matrix(a.rows, b.cols).map((_, i, j) => {
        let sum = 0;
        for (let k = 0; k < a.cols; k++) sum += a.data[i][k] * b.data[k][j];
        return sum;
      });
    }

    static deserialize(data) {
      const matrix = new Matrix(data.rows, data.cols);
      matrix.data = data.data;
      return matrix;
    }

    toArray() {
      const arr = [];
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) arr.push(this.data[i][j]);
      }
      return arr;
    }

    randomize() {
      return this.map(() => Math.random() * 2 - 1);
    }

    add(n) {
      if (n instanceof Matrix) return this.map((e, i, j) => e + n.data[i][j]);
      return this.map((e) => e + n);
    }

    map(func) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) this.data[i][j] = func(this.data[i][j], i, j);
      }
      return this;
    }
  }

  class ActivationFunction {
    constructor(func, dfunc) {
      this.func = func;
      this.dfunc = dfunc;
    }
  }

  const sigmoid = new ActivationFunction(
    (x) => 1 / (1 + Math.exp(-x)),
    (y) => y * (1 - y),
  );

  class NeuralNetwork {
    constructor(a, b, c) {
      if (a instanceof NeuralNetwork) {
        this.input_nodes = a.input_nodes;
        this.hidden_nodes = a.hidden_nodes;
        this.output_nodes = a.output_nodes;
        this.weights_ih = a.weights_ih.copy();
        this.weights_ho = a.weights_ho.copy();
        this.bias_h = a.bias_h.copy();
        this.bias_o = a.bias_o.copy();
      } else {
        this.input_nodes = a;
        this.hidden_nodes = b;
        this.output_nodes = c;
        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes).randomize();
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes).randomize();
        this.bias_h = new Matrix(this.hidden_nodes, 1).randomize();
        this.bias_o = new Matrix(this.output_nodes, 1).randomize();
      }
      this.learning_rate = 0.1;
      this.activation_function = sigmoid;
    }

    predict(inputArray) {
      const inputs = Matrix.fromArray(inputArray);
      const hidden = Matrix.multiply(this.weights_ih, inputs);
      hidden.add(this.bias_h);
      hidden.map(this.activation_function.func);

      const output = Matrix.multiply(this.weights_ho, hidden);
      output.add(this.bias_o);
      output.map(this.activation_function.func);
      return output.toArray();
    }

    static deserialize(data) {
      const payload = typeof data === "string" ? JSON.parse(data) : data;
      const nn = new NeuralNetwork(payload.input_nodes, payload.hidden_nodes, payload.output_nodes);
      nn.weights_ih = Matrix.deserialize(payload.weights_ih);
      nn.weights_ho = Matrix.deserialize(payload.weights_ho);
      nn.bias_h = Matrix.deserialize(payload.bias_h);
      nn.bias_o = Matrix.deserialize(payload.bias_o);
      nn.learning_rate = payload.learning_rate || 0.1;
      return nn;
    }

    copy() {
      return new NeuralNetwork(this);
    }

    mutate(rate) {
      const mutateValue = (value) => (Math.random() < rate ? value + p.randomGaussian(0, 0.1) : value);
      this.weights_ih.map(mutateValue);
      this.weights_ho.map(mutateValue);
      this.bias_h.map(mutateValue);
      this.bias_o.map(mutateValue);
    }
  }

  class Bird {
    constructor(brain) {
      this.y = p.height / 2;
      this.x = 64;
      this.gravity = 0.8;
      this.lift = -12;
      this.velocity = 0;
      this.score = 0;
      this.fitness = 0;
      this.brain = brain ? brain.copy() : new NeuralNetwork(5, 8, 2);
    }

    show() {
      p.stroke(ink);
      p.strokeWeight(2);
      p.fill(226, 84, 44, 180);
      p.ellipse(this.x, this.y, 32, 32);
    }

    up() {
      this.velocity += this.lift;
    }

    mutate() {
      this.brain.mutate(0.1);
    }

    think(activePipes) {
      let closest = null;
      let closestD = Infinity;
      for (const pipe of activePipes) {
        const d = pipe.x + pipe.w - this.x;
        if (d < closestD && d > 0) {
          closest = pipe;
          closestD = d;
        }
      }
      if (!closest) return;

      const inputs = [
        this.y / p.height,
        closest.top / p.height,
        closest.bottom / p.height,
        closest.x / p.width,
        this.velocity / 10,
      ];
      const output = this.brain.predict(inputs);
      if (output[0] > output[1]) this.up();
    }

    offScreen() {
      return this.y > p.height || this.y < 0;
    }

    update() {
      this.score++;
      this.velocity += this.gravity;
      this.y += this.velocity;
    }
  }

  class Pipe {
    constructor() {
      this.spacing = 125;
      this.top = p.random(p.height / 6, (3 / 4) * p.height);
      this.bottom = p.height - (this.top + this.spacing);
      this.x = p.width;
      this.w = 80;
      this.speed = 6;
    }

    hits(targetBird) {
      return (
        (targetBird.y < this.top || targetBird.y > p.height - this.bottom) &&
        targetBird.x > this.x &&
        targetBird.x < this.x + this.w
      );
    }

    show() {
      p.noStroke();
      p.fill(muted);
      p.rectMode(p.CORNER);
      p.rect(this.x, 0, this.w, this.top);
      p.rect(this.x, p.height - this.bottom, this.w, this.bottom);
    }

    update() {
      this.x -= this.speed;
    }

    offscreen() {
      return this.x < -this.w;
    }
  }

  p.preload = () => {
    brainJSON = p.loadJSON("/assets/data/best_bird.json");
  };

  p.setup = () => {
    const size = canvasSize();
    p.createCanvas(size, size);
    pipes = [];
    counter = 0;
    bird = new Bird(NeuralNetwork.deserialize(brainJSON));
  };

  p.draw = () => {
    if (!bird) return;

    if (counter % 75 === 0) pipes.push(new Pipe());
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].hits(bird);
      if (pipes[i].offscreen()) pipes.splice(i, 1);
    }

    bird.think(pipes);
    bird.update();
    bird.offScreen();

    p.background(paper);
    bird.show();
    for (const pipe of pipes) pipe.show();

    p.noStroke();
    p.fill(ink);
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text(`Score ${bird.score}`, 16, 14);
    p.fill(accent);
    p.text("neural flaps", 16, 34);
  };
}
