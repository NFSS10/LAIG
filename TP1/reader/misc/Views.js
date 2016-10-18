/*
Estrutura da struct...

from_obj e to_obj sao separados, porque da sintax error se for declaradodentro de perspective

*/

var from_obj = {x: null, y : null, z : null};
var info_obj = {id : null, near : null, far : null, angle : null};
var to_obj = {x : null, y : null, z : null};

var perspective = {

		info : {},
		
		from : {},

		to : {}

		
};



function Views() 
{
	this.default = null;
	this.perspectives_list = [];
}


Views.prototype.addPerspective_Info = function(id, near, far, angle)
{
	info_obj.id = id;
	info_obj.near = near;
	info_obj.far = far;
	info_obj.angle = angle;

	perspective.info = info_obj;
	this.perspectives_list.push(perspective);

};

Views.prototype.addPerspective_From = function(x, y, z)
{
	
	from_obj.x=x;
	from_obj.y=y;
	from_obj.z=z;
	perspective.from=from_obj;
	this.perspectives_list.push(perspective);

	
};

Views.prototype.addPerspective_To = function(x, y, z)
{
	to_obj.x=x;
	to_obj.y=y;
	to_obj.z=z;
	perspective.to=to_obj;
	this.perspectives_list.push(perspective);

};