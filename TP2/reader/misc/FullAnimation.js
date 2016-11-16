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
	return this.animations[this.index].currentAngle;
}

FullAnimation.prototype.getFullMatrix = function(id)
{

	if(this.animations[this.index].acabou==1 && this.index != this.animations.length -1)
	{
		console.log("CHEGUEEEEEEIIIIII");

		this.animations[this.index].start=0;
		this.index++;
		this.animations[this.index].start=1;
	}
	else
	{
		
		this.animations[this.index].start=1;
	}

	var matrix = mat4.create();
	
	tarray = [];
	pos= this.getFullPos();
	ang= this.getFullAng();
	tarray[0]=pos.x;
	tarray[1]=pos.y;
	tarray[2]=pos.z;
	console.log("sexoo: "+pos.x);
	mat4.translate(matrix,matrix,tarray);
	mat4.rotate(matrix,matrix,-ang,[0,1,0]);

	return matrix;
}