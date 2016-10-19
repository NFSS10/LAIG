function Transformation ()
{
	this.id = [];
	this.translate = [];
	this.rotate = [];
	this.scale = [];
};


function translate_obj ()
{
	this.x = null; 
	this.y = null;
	this.z = null;
	
}

function rotate_obj ()
{
	this.axis = null;
	this.angle = null;
	
};

function scale_obj ()
{	this.x = null;
	this.y = null; 
	this.z = null;
};

function Transformations() 
{
	this.transformations=[];
}

Transformation.prototype.add_id = function (id)
{
	this.id.push(id);
}

Transformation.prototype.add_translate = function (x,y,z)
{
	translateobj= new translate_obj();
	translateobj.x=x;
	translateobj.y=y;
	translateobj.z=z;
	this.translate.push(translateobj);
}

Transformation.prototype.add_rotate = function (axis,angle)
{
	rotateobj= new rotate_obj();
	rotateobj.axis=axis;
	rotateobj.angle=angle;
	this.rotate.push(rotateobj);
}

Transformation.prototype.add_scale = function (x,y,z)
{
	scaleobj= new scale_obj();
	scaleobj.x=x;
	scaleobj.y=y;
	scaleobj.z=z;
	this.scale.push(scaleobj);
}

Transformations.prototype.add_transformation = function (trans)
{
	this.transformations.push(trans);
}
