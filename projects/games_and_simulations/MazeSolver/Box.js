

function Box(i,j)
{
	this.i = i;
	this.j = j;
	this.stroke = 5;

	this.side = width/25;
	this.explored = false;
	this.traveller = false;

	this.lWall = true;
	this.rWall = true;
	this.tWall = true;
	this.dWall = true;

	this.display = function()
	{
		//+++++++++++++++++++++++++++++WALL CONFIG+++++++++++++++++++++++++++++++++++++++++

		if(this.lWall) //LEFT
		{
			stroke(0);
			strokeWeight(this.stroke);
			line(this.i*this.side,this.j*this.side,this.i*this.side,this.j*this.side + this.side);

		}
		if(this.rWall) //RIGHT
		{
			stroke(0);
			strokeWeight(this.stroke);
			line(this.i*this.side + this.side,this.j*this.side,this.i*this.side + this.side,this.j*this.side + this.side);			
		}
		if(this.tWall) //TOP
		{
			stroke(0);
			strokeWeight(this.stroke);
			line(this.i*this.side,this.j*this.side,this.i*this.side + this.side,this.j*this.side);
		}
		if(this.bWall) //BOTTOM
		{
			stroke(0);
			strokeWeight(this.stroke);
			line(this.i*this.side,this.j*this.side + this.side,this.i*this.side + this.side,this.j*this.side + this.side);
		}

		/////////////TILE COLOR////////////////////////////////////////////////////


		if(this.traveller)
		{
			fill(255,255,0);
		}

		else if(this.explored && this.traveller == false)
		{
			fill(0,255,255);
		}

		else if(this.explored == false && this.traveller == false)
		{
			fill(0,0,255);
		}
		noStroke();
		rect(this.i*this.side,this.j*this.side,this.side,this.side);
	}



}