function FullAnimation(animations)
{
	this.animations=animations;
	
	this.index=0;
};

FullAnimation.prototype.getFullPos = function(id)
{
	
	return this.animations[this.index].currentPosition;
}

FullAnimation.prototype.getFullAng = function(id)
{
	if(this.animations[this.index] instanceof CircularAnimation )
	{
		return -this.animations[this.index].currentAngle;
	}
	return this.animations[this.index].currentAngle;
}

FullAnimation.prototype.getFullMatrix = function(id)
{

	
	if(this.animations[this.index].acabou==1 && this.index != this.animations.length -1)
	{
		

		
		newangle= this.getFullAng();
		newposition= this.animations[this.index].currentPosition;

		this.index++;
		
		

		/*if(this.animations[this.index] instanceof LinearAnimation )
		{
		for(var i=0; i<this.animations[this.index].pontosControlo.length ; i++)
		{
			this.animations[this.index].currentPosition = newposition;
			this.animations[this.index].pontosControlo[i].x+= 	newposition.x;
			this.animations[this.index].pontosControlo[i].y+= 	newposition.y;
			this.animations[this.index].pontosControlo[i].z+= 	newposition.z;

		}
		}
		if(this.animations[this.index] instanceof CircularAnimation )
		{
			this.animations[this.index].startAngle= newangle;
			this.animations[this.index].currentAngle= newangle;
			
			this.animations[this.index].currentPosition = newposition;

			this.animations[this.index].centro.x+= newposition.x;
			this.animations[this.index].centro.y+= newposition.y;
			this.animations[this.index].centro.z+= newposition.z;
		}*/
		this.animations[this.index].start=1;
		
		
	}
	this.animations[0].start=1;
	var matrix = mat4.create();
	
	tarray = [];
	pos= this.getFullPos();
	ang= this.getFullAng();
	tarray[0]=pos.x;
	tarray[1]=pos.y;
	tarray[2]=pos.z;
	
	mat4.translate(matrix,matrix,tarray);
	mat4.rotate(matrix,matrix,ang,[0,1,0]);

	
	return matrix;
}