
function From_obj()
{
	this.x = null;
	this.y = null;
	this.z = null;
};


function Perspective()
{
		this.id = null;
		this.near = null;
		this.far = null;
		this.angle = null;

		this.from = null;

		this.to = null;
};


/**Contem todas as views*/
function Views()
{
	this.default = null;
	this.perspectives_list = [];
}


Perspective.prototype.add_Info = function(id, near, far, angle)
{
	this.id = id;
	this.near = near;
	this.far = far;
	this.angle = angle;
};

Perspective.prototype.add_From = function(x, y, z)
{
	from_obj= new From_obj();

	from_obj.x=x;
	from_obj.y=y;
	from_obj.z=z;

	this.from=from_obj;

};

Perspective.prototype.add_To = function(x, y, z)
{
	from_obj= new From_obj();

	from_obj.x=x;
	from_obj.y=y;
	from_obj.z=z;

	this.to=from_obj;
};

Views.prototype.add_default = function(def)
{
	this.default=def;
}

Views.prototype.add_perspective = function(perspective)
{
	this.perspectives_list.push(perspective);
}
