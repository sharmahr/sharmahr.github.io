function Maze(board)
{
	this.area = [];
	this.no = mazeSize;

	for(var i = 0;i < this.no ; i++)
	{
		this.area[i] = [];
		for(var j = 0;j < this.no;j++)
		{
			this.area[i][j] = new Tile(board.getBox(i,j));
		}
	}

	this.display = function()
	{
		push();
		translate(10,10);
		for(var i = 0;i < this.no ; i++)
		{
			for(var j = 0;j < this.no;j++)
			{
				this.area[i][j].display();
			}
		}
		pop();
	}

	this.getLoc = function(x,y)
	{
		push();
		translate(10,10);
		var i = int(x / 25);
		var j = int(y / 25); 
		pop();

		return [i,j];
	}

	this.getWalls = function(i,j)
	{
		return(this.area[i][j].getWalls());
	}

	this.displayPath = function(p)
	{
		for(var i = 0; i < p.length - 1;i++)
		{
			push();
			translate(10,10);
			stroke(0,255,0);
			// noStroke();
			// rect(p[i][0]*25 + 10/2,p[i][1]*25 + 10/2,25 - 10,25 - 10);
			strokeWeight(8);
			line(p[i][0]*25 + 25/2,p[i][1]*25 + 25/2,p[i + 1][0]*25 + 25/2,p[i + 1][1]*25 + 25/2);
			pop();
		}
	}
}