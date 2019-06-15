
var maze;

var mazeSize = 10;
var traveller;

function setup() {
	var canvas = createCanvas(windowWidth-400,windowHeight-200);
	canvas.parent('sketch-holder');
	maze = generateMaze();
	traveller = new Traveller(maze);
	// maze.display();
	frameRate(5);

}

function draw() {
	background(255);
	maze.display();
	if(traveller.explored() != true)
	{
		// print("in1");
		traveller.travel();
		traveller.display();
	}
	else
	{
		// print("in");
		var p = traveller.solve();
		print(p);
		// maze.displayPath([[0,0],[0,1],[0,1],[0,2],[0,3],[1,3],[1,4],[2,4],[3,4]]);
		maze.displayPath(p);
		noLoop();
	}
}


function mouseDragged()
{
	fill(255,0,0);
	noStroke();
	ellipse(mouseX,mouseY,10,10);
}

function mousePressed()
{
	print(maze.getLoc(mouseX,mouseY));
	// traveller.travel();
}


function keyPressed()
{

	if(keyCode === LEFT_ARROW)
	{
		// board.travelLeft();
		traveller.moveLeft();
	}

	else if(keyCode === RIGHT_ARROW)
	{
		// board.travelRight();
		traveller.moveRight();
	}

	else if(keyCode === UP_ARROW)
	{
		// board.travelUp();
		traveller.moveTop();
	}

	else if(keyCode === DOWN_ARROW)
	{
		// board.travelDown();
		traveller.moveDown();
	}

	// board.display();
}

function windowResized() {
  resizeCanvas(windowWidth-400, windowHeight-200);
}