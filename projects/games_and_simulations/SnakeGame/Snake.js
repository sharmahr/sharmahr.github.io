function Snake(side,no)
{
	this.body = [[6,4],[5,4],[4,4]];
	this.side = side;
	this.no = no;
	
	this.alive = true;

	this.vel = 1; // 0 - left , 1 - right , 2 - up , 3 - down 


	this.display = function()
	{
		for(var i = 0 ; i < this.body.length; i++)
		{
			fill(0,255,0);
			rect(this.body[i][0]*this.side,this.body[i][1]*this.side,this.side,this.side);

		}
		
	}

	this.update = function()
	{

		if(this.alive == false)
		{
			return;
		}

		if((this.vel == 0 && this.body[0][0] == 0 ) ||(this.vel == 1 && this.body[0][0] >= this.no - 1 ) ||(this.vel == 2 && this.body[0][1] == 0 ) || (this.vel == 3 && this.body[0][1] >= this.no - 1 ))
		{
			this.alive = false;
			return ;
		}


		
		var t = [];
		t[0] = this.body[0][0];
		t[1] = this.body[0][1];

		for(var i = this.body.length - 1 ; i > 0; i--)
		{
			this.body[i][0] = this.body[i - 1][0];
			this.body[i][1] = this.body[i - 1][1];
		}
		if(this.vel == 0)
		{
			this.body[0][0] = t[0] - 1;
		}
		else if(this.vel == 1)
		{
			this.body[0][0] = t[0] + 1;
		}
		else if(this.vel == 2)
		{
			this.body[0][1] = t[1] - 1;
		}
		else if(this.vel == 3)
		{
			this.body[0][1] = t[1] + 1;
		}


	}

	this.velUp = function()
	{
		if(this.vel != 3)
		{
			this.vel = 2;
		}
	}

	this.velDown = function()
	{
		if(this.vel != 2)
		{
			this.vel = 3;
		}
	}

	this.velLeft = function()
	{
		if(this.vel != 1)
		{
			this.vel = 0;
		}
	}


	this.velRight = function()
	{
		if(this.vel != 0)
		{
			this.vel = 1;
		}
	}
	this.ate = function(food)
	{
		if(this.body[0][0] == food[0] && this.body[0][1] == food[1])
		{
			this.body[this.body.length] = [];
			for(var i = this.body.length - 1 ; i > 0; i--)
			{
				this.body[i][0] = this.body[i - 1][0];
				this.body[i][1] = this.body[i - 1][1];
			}
			this.body[0][0] = food[0];
			this.body[0][1] = food[1];

			return true;
		}
	}

	this.reset = function()
	{
		this.body = [[4,4],[5,4],[6,4]];
	}

	this.eatItself = function()
	{
		for(var i = 3;i < this.body.length;i++)
		{
			if(this.body[i][0] == this.body[0][0] && this.body[i][1] == this.body[0][1])
			{
				return true;
			}
		}
	}

}