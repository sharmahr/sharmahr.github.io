
let pipes = [];
let bird;
let counter = 0;

let brainJSON;

function preload() {
  brainJSON = loadJSON("best_bird.json");
  //brainJSON = loadJSON("bad_bird.json");
}


function setup() {
  var canvassize = Math.ceil(displayWidth-(displayWidth/3));
  var canvas = createCanvas(canvassize,canvassize);
  canvas.parent('sketch-holder');
  let birdBrain = NeuralNetwork.deserialize(brainJSON);
  bird = new Bird(birdBrain);
}

function draw() {

    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      if (pipes[i].hits(bird)) {
        console.log("collision");
      }
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    if (bird.offScreen()) {
      console.log("bottom");
    }


    bird.think(pipes);
    bird.update();



    // All the drawing stuff
    background(0);

    bird.show();

    for (let pipe of pipes) {
      pipe.show();
    }
  
}

function windowResized() {
  var canvass = Math.ceil(displayWidth-(displayWidth/3));
  resizeCanvas(canvass,canvass);
  }

// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
// }
