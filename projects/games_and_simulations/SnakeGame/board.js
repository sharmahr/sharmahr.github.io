function Board()
{
	this.no = 50;
	this.side = width/this.no;
	this.food = [int(random(0,this.no)),int(random(0,this.no))];

	this.snake = new Snake(this.side,this.no);





	this.tiles = []

	for(var i = 0 ; i < this.no ; i++)
	{
		this.tiles[i] = [];
		for(var j = 0 ; j < this.no ; j++)
		{
			this.tiles[i][j] = 0;
		}		
	}
	this.tiles[this.food[0]][this.food[1]] = 1;


	this.display = function()
	{
		for(var i = 0 ; i < this.no ; i++)
		{
			for(var j = 0 ; j < this.no ; j++)
			{
				if(this.tiles[i][j] == 0)
				{
					fill(0,0,0);
				}
				if(this.tiles[i][j] == 1)
				{
					fill(255,255,0);
				}
				rect(i*this.side,j*this.side,this.side,this.side);
			}		
		}
		this.snake.display();	
	}


	this.update = function()
	{
		if(this.snake.ate(this.food))
		{
			this.tiles[this.food[0]][this.food[1]] = 0;
			this.food = [int(random(0,this.no)),int(random(0,this.no))];
			this.tiles[this.food[0]][this.food[1]] = 1;
			return;	
		}

		if(this.snake.eatItself())
		{
			this.snake.alive = false;
		}

		this.snake.update();
	}


}