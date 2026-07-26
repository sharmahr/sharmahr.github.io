export default function smartRocketsSketch(p) {
  const Vector = p.createVector().constructor;
  const paper = "#111110";
  const ink = "#F2F0EC";
  const accent = "#E2542C";
  const muted = "#8A8781";

  let population;
  const lifespan = 400;
  let count = 0;
  let target;
  const maxforce = 0.2;
  const barrier = { x: 0, y: 0, w: 200, h: 10 };

  function canvasSize(max = 640) {
    return Math.max(320, Math.min(max, (p.windowWidth || max) - 48));
  }

  function setGeometry() {
    target = p.createVector(p.width / 2, 50);
    barrier.w = Math.min(220, p.width * 0.36);
    barrier.h = Math.max(10, p.height * 0.016);
    barrier.x = p.width / 2 - barrier.w / 2;
    barrier.y = Math.min(170, p.height * 0.38);
  }

  class DNA {
    constructor(genes) {
      if (genes) {
        this.genes = genes;
      } else {
        this.genes = [];
        for (let i = 0; i < lifespan; i++) {
          this.genes[i] = Vector.random2D();
          this.genes[i].setMag(maxforce);
        }
      }
    }

    crossover(partner) {
      const newgenes = [];
      const mid = p.floor(p.random(this.genes.length));
      for (let i = 0; i < this.genes.length; i++) newgenes[i] = i > mid ? this.genes[i] : partner.genes[i];
      return new DNA(newgenes);
    }

    mutation() {
      for (let i = 0; i < this.genes.length; i++) {
        if (p.random(1) < 0.01) {
          this.genes[i] = Vector.random2D();
          this.genes[i].setMag(maxforce);
        }
      }
    }
  }

  class Rocket {
    constructor(dna) {
      this.pos = p.createVector(p.width / 2, p.height);
      this.vel = p.createVector();
      this.acc = p.createVector();
      this.completed = false;
      this.crashed = false;
      this.dna = dna || new DNA();
      this.fitness = 0;
    }

    applyForce(force) {
      this.acc.add(force);
    }

    calcFitness() {
      const d = p.dist(this.pos.x, this.pos.y, target.x, target.y);
      this.fitness = p.constrain(p.map(d, 0, p.width, p.width, 0), 0, p.width);
      if (this.completed) this.fitness *= 10;
      if (this.crashed) this.fitness /= 10;
    }

    update() {
      const d = p.dist(this.pos.x, this.pos.y, target.x, target.y);
      if (d < 10) {
        this.completed = true;
        this.pos = target.copy();
      }

      if (
        this.pos.x > barrier.x &&
        this.pos.x < barrier.x + barrier.w &&
        this.pos.y > barrier.y &&
        this.pos.y < barrier.y + barrier.h
      ) {
        this.crashed = true;
      }
      if (this.pos.x > p.width || this.pos.x < 0 || this.pos.y > p.height || this.pos.y < 0) this.crashed = true;

      this.applyForce(this.dna.genes[count]);
      if (!this.completed && !this.crashed) {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.limit(4);
      }
    }

    show() {
      p.push();
      p.noStroke();
      p.fill(242, 240, 236, 150);
      p.translate(this.pos.x, this.pos.y);
      p.rotate(this.vel.heading());
      p.rectMode(p.CENTER);
      p.rect(0, 0, 25, 5);
      p.pop();
    }
  }

  class Population {
    constructor() {
      this.rockets = [];
      this.popsize = 25;
      this.matingpool = [];
      for (let i = 0; i < this.popsize; i++) this.rockets[i] = new Rocket();
    }

    evaluate() {
      let maxfit = 0;
      for (const rocket of this.rockets) {
        rocket.calcFitness();
        if (rocket.fitness > maxfit) maxfit = rocket.fitness;
      }
      maxfit ||= 1;
      this.matingpool = [];
      for (const rocket of this.rockets) {
        rocket.fitness /= maxfit;
        const n = rocket.fitness * 100;
        for (let j = 0; j < n; j++) this.matingpool.push(rocket);
      }
      if (this.matingpool.length === 0) this.matingpool = [...this.rockets];
    }

    selection() {
      const newRockets = [];
      for (let i = 0; i < this.rockets.length; i++) {
        const parentA = p.random(this.matingpool).dna;
        const parentB = p.random(this.matingpool).dna;
        const child = parentA.crossover(parentB);
        child.mutation();
        newRockets[i] = new Rocket(child);
      }
      this.rockets = newRockets;
    }

    run() {
      for (const rocket of this.rockets) {
        rocket.update();
        rocket.show();
      }
    }
  }

  p.setup = () => {
    const size = canvasSize();
    p.createCanvas(size, size);
    setGeometry();
    count = 0;
    population = new Population();
  };

  p.draw = () => {
    p.background(paper);
    population.run();
    count++;
    if (count === lifespan) {
      population.evaluate();
      population.selection();
      count = 0;
    }

    p.noStroke();
    p.fill(muted);
    p.rectMode(p.CORNER);
    p.rect(barrier.x, barrier.y, barrier.w, barrier.h);

    p.fill(accent);
    p.ellipse(target.x, target.y, 16, 16);

    p.fill(ink);
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text(`Frame ${count}/${lifespan}`, 16, 14);
  };
}
