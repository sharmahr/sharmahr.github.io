function Tile(box)
{
	this.i = box.i;
	this.j = box.j;

	this.lWall = box.lWall;
	this.rWall = box.rWall;
	this.tWall = box.tWall;
	this.dWall = box.dWall;

	this.lineWidth = 10; 

	this.side = 25;

	this.traveller = false;



	this.display = function()
	{
		//+++++++++++++++++++++++++++++WALL CONFIG+++++++++++++++++++++++++++++++++++++++++

		if(this.lWall) //LEFT
		{
			stroke(0);
			strokeWeight(this.lineWidth);
			line(this.i*this.side,this.j*this.side,this.i*this.side,this.j*this.side + this.side);

		}
		if(this.rWall) //RIGHT
		{
			stroke(0);
			strokeWeight(this.lineWidth);
			line(this.i*this.side + this.side,this.j*this.side,this.i*this.side + this.side,this.j*this.side + this.side);			
		}
		if(this.tWall) //TOP
		{
			stroke(0);
			strokeWeight(this.lineWidth);
			line(this.i*this.side,this.j*this.side,this.i*this.side + this.side,this.j*this.side);
		}
		if(this.dWall) //BOTTOM
		{
			stroke(0);
			strokeWeight(this.lineWidth);
			line(this.i*this.side,this.j*this.side + this.side,this.i*this.side + this.side,this.j*this.side + this.side);
		}
	}

	this.getWalls = function()
	{
		return ([this.tWall,this.rWall,this.dWall,this.lWall]);
	}
}