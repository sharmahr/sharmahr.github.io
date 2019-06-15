

function Board()
{
	this.no = mazeSize;
	this.boxes = [];
	this.traveller = [0,0];


	this.stack = [[0,0]];

	for(var i = 0;i < this.no ; i++)
	{
		this.boxes[i] = [];
		for(var j = 0;j < this.no;j++)
		{
			this.boxes[i][j] = new Box(i,j);
		}
	}

	this.boxes[0][0].traveller = true;

	this.display = function()
	{
		push();
		translate();

		for(var i = 0;i < this.no ; i++)
		{
			for(var j = 0;j < this.no;j++)
			{
				this.boxes[i][j].display();
			}
		}
	}



	//+++++++++++++++++TRAVELLER FUNCTIONS+++++++++++++++++++++++
	this.travelLeft = function()
	{
		if(this.traveller[0] > 0 && this.boxes[this.traveller[0] - 1][this.traveller[1]].explored && this.boxes[this.traveller[0] - 1][this.traveller[1]].rWall)
		{
			return ;
		}
		//==============PRE MOVEMENT=================
		if(this.traveller[0] > 0 )
		{
			//==============PRE MOVEMENT=================

			this.boxes[this.traveller[0]][this.traveller[1]].traveller = false;
			this.boxes[this.traveller[0]][this.traveller[1]].explored = true;

			this.boxes[this.traveller[0]][this.traveller[1]].lWall = false;
			this.boxes[this.traveller[0] - 1][this.traveller[1]].rWall = false; 

			this.traveller[0] = this.traveller[0] - 1;
		}
		this.boxes[this.traveller[0]][this.traveller[1]].traveller = true;
	}

	this.travelRight = function()
	{
		if(this.traveller[0] < this.no - 1 && this.boxes[this.traveller[0] + 1][this.traveller[1]].explored && this.boxes[this.traveller[0] + 1][this.traveller[1]].lWall)
		{
			return ;
		}
		if(this.traveller[0] < this.no - 1 )
		{
			//==============PRE MOVEMENT=================

			this.boxes[this.traveller[0]][this.traveller[1]].traveller = false;
			this.boxes[this.traveller[0]][this.traveller[1]].explored = true;

			this.boxes[this.traveller[0]][this.traveller[1]].rWall = false;
			this.boxes[this.traveller[0] + 1][this.traveller[1]].lWall = false; 

			this.traveller[0] = this.traveller[0] + 1;
		}
		this.boxes[this.traveller[0]][this.traveller[1]].traveller = true;
	}

	this.travelUp = function()
	{
		if(this.boxes[this.traveller[0]][this.traveller[1] - 1].explored && this.boxes[this.traveller[0]][this.traveller[1] - 1].dWall)
		{
			return ;
		}
		//=================POST MOVEMENT===========================
		if(this.traveller[1] > 0 )
		{
			//==============PRE MOVEMENT=================
			this.boxes[this.traveller[0]][this.traveller[1]].traveller = false;
			this.boxes[this.traveller[0]][this.traveller[1]].explored = true;

			this.boxes[this.traveller[0]][this.traveller[1]].tWall = false;
			this.boxes[this.traveller[0]][this.traveller[1] - 1].dWall = false; 
			this.traveller[1] = this.traveller[1] - 1;
		}
		this.boxes[this.traveller[0]][this.traveller[1]].traveller = true;
	}

	this.travelDown = function()
	{

		if(this.traveller[1] < this.no - 1 && this.boxes[this.traveller[0]][this.traveller[1] + 1].explored && this.boxes[this.traveller[0]][this.traveller[1] + 1].tWall)
		{
			return ;
		}
		//==============PRE MOVEMENT=================
		if(this.traveller[1] < this.no - 1 )
		{
			//==============PRE MOVEMENT=================

			this.boxes[this.traveller[0]][this.traveller[1]].traveller = false;
			this.boxes[this.traveller[0]][this.traveller[1]].explored = true;

			this.boxes[this.traveller[0]][this.traveller[1]].dWall = false;
			this.boxes[this.traveller[0]][this.traveller[1] + 1].tWall = false; 

			this.traveller[1] = this.traveller[1] + 1;
		}
		this.boxes[this.traveller[0]][this.traveller[1]].traveller = true;
	}


//==============EXPLORATIONS=============

	this.getNbrs = function()
	{
		var nbrs = [];


		if(this.traveller[0] < this.no - 1)
		{
			if(this.boxes[this.traveller[0] + 1][this.traveller[1]].explored == false)
			{
				nbrs.push([this.traveller[0] + 1,this.traveller[1],"r"]);
				// print("right");
			}
		}

		if(this.traveller[0] > 0)
		{
			if(this.boxes[this.traveller[0] - 1][this.traveller[1]].explored == false)
			{
				nbrs.push([this.traveller[0] - 1,this.traveller[1],"l"]);
				// print("left");
			}
		}

		if(this.traveller[1] < this.no - 1)
		{
			if(this.boxes[this.traveller[0]][this.traveller[1] + 1].explored == false)
			{
				nbrs.push([this.traveller[0],this.traveller[1] + 1,"d"]);
				// print("down");
			}
		}

		if(this.traveller[1] > 0)
		{
			if(this.boxes[this.traveller[0]][this.traveller[1] - 1].explored == false)
			{
				nbrs.push([this.traveller[0],this.traveller[1] - 1,"t"]);
				// print("up");
			}	
		}
		return nbrs;
	}

	this.move = function()
	{
		var t = random(this.getNbrs());

		if(typeof(t) == 'undefined')
		{

			this.backtrack();
			return 'end';
		}

		this.stack.push(t);

		if(t[2] == "t")
		{
			this.travelUp();
		}

		if(t[2] == "d")
		{
			this.travelDown();
		}

		if(t[2] == "l")
		{
			this.travelLeft();
		}

		if(t[2] == "r")
		{
			this.travelRight();
		}
	}

	this.backtrack = function()
	{
		while(this.getNbrs().length == 0)
		{
			if(this.explored())
			{
				return "done";
			}

			this.boxes[this.traveller[0]][this.traveller[1]].traveller = false;
			this.boxes[this.traveller[0]][this.traveller[1]].explored = true;

			this.traveller[0] = this.stack[this.stack.length - 1][0];
			this.traveller[1] = this.stack[this.stack.length - 1][1];
			this.stack.pop();

			this.boxes[this.traveller[0]][this.traveller[1]].traveller = true;
		}
	}

	this.explored = function()
	{ 

		for(var i = 0;i < this.no ; i++)
		{
			for(var j = 0;j < this.no;j++)
			{
				if(this.boxes[i][j].explored == false)
				{
					return false;
				}
			}
		}
		// noLoop();
		return true;
	}

	this.mazeDone = function()
	{
		if(this.explored())
		{
			return "done";
		}
	}


	//-----------------------MAZE HELP-----------------------------------
	this.getBox = function(i,j)
	{
		return this.boxes[i][j];
	}

}



function generateMaze()
{
	var board = new Board();
	var t = board.mazeDone();
	while(t != "done")
	{
		board.move();
		t = board.mazeDone();
	}

	return(new Maze(board));
}


