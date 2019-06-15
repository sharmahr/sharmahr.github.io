function Traveller(maze)
{
	this.i = 0;
	this.j = 0;

	this.no = maze.no;
	this.maze = maze;
	this.side = 25;
	this.area = [];
	this.stroke = 10;

	this.dest = [9,9];

	this.stack = [[this.i,this.j]];

	for(var i = 0;i < this.no ; i++)
	{
		this.area[i] = [];

		for(var j = 0;j < this.no;j++)
		{
			this.area[i][j] = [[false,false,false,false],false]; // top right down left

			if(i == 0)
			{
				this.area[i][j][0][3] = true;				
			}

			if(i == 24)
			{
				this.area[i][j][0][1] = true;				
			}

			if(j == 0)
			{
				this.area[i][j][0][0] = true;				
			}

			if(j == 24)
			{
				this.area[i][j][0][2] = true;				
			}
		}
	}

	this.area[this.i][this.j][1] = true;

	this.getPath = function()
	{
		var i = this.i;
		var j = this.j;
		var t = this.maze.getWalls(i,j);
		var op = []    ////////// return 0 top 1 right 2 left 3 down
		// print(t);
		if(t[0] == false && this.area[this.i][this.j - 1][1] == false)
		{
			op.push(0);
		}

		if(t[1] == false  && this.area[this.i + 1][this.j][1] == false)
		{
			op.push(1);
		}

		if(t[2] == false  && this.area[this.i][this.j + 1][1] == false)
		{
			op.push(2);
		}

		if(t[3] == false && this.area[this.i - 1][this.j][1] == false)
		{
			op.push(3);
		}

		return random(op);
	}


	this.drawWalls = function()
	{
		var i = this.i;
		var j = this.j;
		var t = this.maze.getWalls(i,j);
		// print(t);
		if(t[0])
		{
			this.area[i][j][0][0] = true;
		}

		if(t[1])
		{
			this.area[i][j][0][1] = true;
		}

		if(t[2])
		{
			this.area[i][j][0][2] = true;
		}

		if(t[3])
		{
			this.area[i][j][0][3] = true;
		}
	}

	this.explored = function()
	{
		for(var i = 0;i < this.no ; i++)
		{
			for(var j = 0;j < this.no;j++)
			{
				if(this.area[i][j][1] == false)
				{
					return false;
				}
			}
		}
		this.stack = [];
		return true;
	}

	this.travel = function()
	{
		// print(this.i,this.j);
		this.drawWalls();
		var p = this.getPath();

		if(typeof(p) !== "undefined")
		{
			if(p === 0)
			{
				this.moveTop();
				this.area[this.i][this.j][1] = true;
			}
			if(p === 1)
			{
				this.moveRight();
				this.area[this.i][this.j][1] = true;
			}
			if(p === 2)
			{
				this.moveDown();
				this.area[this.i][this.j][1] = true;
			}
			if(p === 3 )
			{
				this.moveLeft();
				this.area[this.i][this.j][1] = true;
			}
			// print(this.i,this.j,p);
			this.stack.push([this.i,this.j]);
		}
		else
		{
			var t = this.stack.pop();
			this.i = t[0];
			this.j = t[1]; 
		}
	}

	this.display = function()
	{
		push();
		translate(10 + 300,10);
		for(var i = 0;i < this.no ; i++)
		{
			for(var j = 0;j < this.no;j++)
			{
				if(this.area[i][j][0][3]) //LEFT
				{
					stroke(0);
					strokeWeight(this.stroke);
					line(i*this.side,j*this.side,i*this.side,j*this.side + this.side);

				}
				if(this.area[i][j][0][1]) //RIGHT
				{
					stroke(0);
					strokeWeight(this.stroke);
					line(i*this.side + this.side,j*this.side,i*this.side + this.side,j*this.side + this.side);			
				}
				if(this.area[i][j][0][0]) //TOP
				{
					stroke(0);
					strokeWeight(this.stroke);
					line(i*this.side,j*this.side,i*this.side + this.side,j*this.side);
				}
				if(this.area[i][j][0][2]) //BOTTOM
				{
					stroke(0);
					strokeWeight(this.stroke);
					line(i*this.side,j*this.side + this.side,i*this.side + this.side,j*this.side + this.side);
				}
			}
		}
		pop();
		push();
		translate(10,10);
		fill(255,0,250);
		noStroke();
		rect(this.i*this.side + this.stroke/2,this.j*this.side + this.stroke/2,this.side - this.stroke,this.side - this.stroke); // side = 25 stroke = 10
		pop();
		// print("displaying");
	}


	this.moveTop = function()
	{
		if(this.j > 0)
		{
			this.j = this.j - 1;
		}
	}

	this.moveRight = function()
	{
		if(this.i < 24)
		{
			this.i = this.i + 1;
		}
	}

	this.moveDown = function()
	{
		if(this.j < 24)
		{
			this.j = this.j + 1;
		}	
	}

	this.moveLeft = function()
	{
		if(this.i > 0)
		{
			this.i = this.i - 1;
		}	
	}

	this.solve = function()
	{
		var stack = [[0,0]];
		var path = [[0,0]];
		var t = [0,0];
		var x = 0;
		while(t[0] != this.no - 1 || t[1] != this.no - 1)
		{
			// maze.display(path);
			var t1 = this.maze.getWalls(t[0],t[1]);
			x = x + 1;
			// print(t);
			
			// if(this.isIn(t,path) == false)
			// {
			// 	path.push(t);
			// }


			if(t1[0] == false && this.isIn([t[0],t[1] - 1],stack) == false)
			{
				t[1] = t[1] - 1;
				path.push([t[0],t[1]]);
				stack.push([t[0],t[1]]);
				print("up");
			}
			else if(t1[1] == false && this.isIn([t[0] + 1,t[1]],stack) == false)
			{
				t[0] = t[0] + 1;
				path.push([t[0],t[1]]);
				stack.push([t[0],t[1]]);
				print("right");

			}
			else if(t1[2] == false && this.isIn([t[0],t[1] + 1],stack) == false)
			{
				t[1] = t[1] + 1;
				path.push([t[0],t[1]]);
				stack.push([t[0],t[1]]);
				print("down");
			}
			else if(t1[3] == false && this.isIn([t[0] - 1,t[1]],stack) == false)
			{
				t[0] = t[0] - 1;
				path.push([t[0],t[1]]);
				stack.push([t[0],t[1]]);
				print("left");
			}

			else
			{
				print("es");
				if(path.length == 0)
				{
					break;
				}
				t = path.pop();
				// print(t);
			}
		}	

		return path;
	}

	this.isIn = function(a,s)
	{
		d = s.length;
		for(var i = 0; i < d;i++)
		{
			// print(i);
			if(s[i][0] === a[0] && s[i][1] === a[1])
			{
				return true;
			}
		}
		return false;
	}




}