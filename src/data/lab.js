import flappyBird from "../sketches/flappyBird.js";
import mazeSolver from "../sketches/mazeSolver.js";
import smartRockets from "../sketches/smartRockets.js";
import snake from "../sketches/snake.js";

/* The playable end of the archive. Each entry is one sketch, its controls
   and an honest note on how it actually works. */
export const LAB = {
  "flappy-bird": {
    sketch: flappyBird,
    title: "Neuroevolution of Flappy Bird",
    kicker: "p5.js · Genetic algorithm · Feed-forward neural network",
    seoTitle: "Neuroevolution of Flappy Bird — Hardik Sharma",
    seoDescription:
      "Neural networks evolved by genetic algorithm until the bird stops dying. Matrix maths and the network written from scratch, no ML library.",
    controls:
      "Nothing to press. Each generation spawns a population of birds, and the best performers breed the next one — watch the scores climb.",
    label: "Flappy Bird neuroevolution simulation",
    how: [
      "Every bird carries a small feed-forward neural network. Its inputs are the bird's height and velocity plus the position of the next pipe gap; its single output decides whether to flap on this frame.",
      "There is no backpropagation here. Birds that survive longer are more likely to be picked as parents, their weight matrices are crossed over and lightly mutated, and the next generation starts again. After enough generations the population stops dying — the network has been evolved rather than trained.",
      "The matrix maths and network are written from scratch, with no ML library involved."
    ]
  },

  "maze-solver": {
    sketch: mazeSolver,
    title: "Maze solver",
    kicker: "p5.js · Maze generation · Shortest-path search",
    seoTitle: "Maze solver — Hardik Sharma",
    seoDescription:
      "A perfect maze carved by depth-first search, then solved with the search frontier drawn as it spreads.",
    controls:
      "Runs on load. The maze is carved first, then the search sweeps through it looking for the exit.",
    label: "Maze generation and solving simulation",
    how: [
      "The grid is carved into a perfect maze by depth-first search with backtracking — pick an unvisited neighbour, knock down the wall between the cells, and recurse until every cell has been reached.",
      "The solver then explores that maze, colouring cells as it visits them so the frontier of the search is visible. Watching the wavefront spread is the whole point: it turns a graph traversal from something you trace on paper into something you can see."
    ]
  },

  "smart-rockets": {
    sketch: smartRockets,
    title: "Smart Rockets",
    kicker: "p5.js · Genetic algorithm · Built for an AI assignment",
    seoTitle: "Smart Rockets — Hardik Sharma",
    seoDescription:
      "A genetic algorithm discovering a path around an obstacle to a target, without ever being told one exists.",
    controls:
      "Runs on load. Each generation launches together; survivors of the fittest breed the next batch.",
    label: "Smart Rockets genetic algorithm simulation",
    how: [
      "Each rocket's DNA is an array of thrust vectors, one per frame. It has no sensors and no plan — it simply executes its genome from launch to death.",
      "Fitness is scored on how close the rocket got to the target, penalised for hitting the obstacle. Fitter rockets are more likely to be selected as parents; their DNA is crossed over at a random midpoint and mutated at a low rate. Over generations the population discovers a path around the obstacle without ever being told one exists."
    ],
    source: "https://github.com/sharmahr/Smart-Rockets---Genetic-Algorithm"
  },

  snake: {
    sketch: snake,
    title: "Snake",
    kicker: "p5.js · The first game I finished",
    seoTitle: "Snake — Hardik Sharma",
    seoDescription:
      "Arrow keys to steer. Eat, grow, avoid yourself. The first game I ever finished.",
    controls: "Arrow keys to steer. Eat, grow, avoid yourself.",
    label: "Playable Snake game",
    how: [
      "The snake is an array of grid coordinates. Each tick a new head is pushed in the current direction and the tail is popped — unless food was just eaten, in which case the tail stays and the body grows by one.",
      "Collision is a lookup: does the new head coordinate already appear in the body, or has it left the board? That is the entire game. Building it was the moment classic arcade games stopped feeling like magic."
    ]
  }
};
