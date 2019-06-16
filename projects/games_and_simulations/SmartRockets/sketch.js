

var population;
// Each rocket is alive till 400 frames
var lifespan = 400;
// Made to display count on screen

// Keeps track of frames
var count = 0;
// Where rockets are trying to go
var target;
// Max force applied to rocket
var maxforce = 0.2;

// Dimensions of barrier
var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

function setup() {
   var canvassize = Math.ceil(displayWidth-(displayWidth/3));
  var canvas = createCanvas(canvassize,canvassize);
  canvas.parent('sketch-holder');
  population = new Population();
  target = createVector(width / 2, 50);

}

function draw() {
  background(0);
  population.run();
  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    // Population = new Population();
    count = 0;
  }
  // Renders barrier for rockets
  fill(255);
  rect(width/2-100, 150, rw, rh);
  // Renders target
  ellipse(target.x, target.y, 16, 16);
}

function windowResized() {
  var canvass = Math.ceil(displayWidth-(displayWidth/3));
  resizeCanvas(canvass,canvass);
  }
