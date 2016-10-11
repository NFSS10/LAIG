/*
Estrutura da struct...

from_obj e to_obj sao separados, porque da sintax error se for declaradodentro de perspective

*/

var from_obj = {x: null, y : null, z : null};
		
var to_obj = {x : null, y : null, z : null};

var perspective = {
		id : null,
		near : null,
		far : null,
		angle : null,
		
		from : {},

		to : {}
		
		//from : {x: null, y : null, z : null},
		
		//to : {x : null, y : null, z : null}
		
};



function Views() 
{
	this.default = null;
	this.perspectives_list = [];
}


Views.prototype.addPerspective_Info = function(id, near, far, angle)
{
	perspective.id = id;
	perspective.near = near;
	perspective.far = far;
	perspective.angle = angle;

	this.perspectives_list.push(perspective);
/*
	this.perspectives_list.push(id: id);
	this.perspectives_list.push(near: near);
	this.perspectives_list.push(far);
	this.perspectives_list.push(angle);
*/
};

Views.prototype.addPerspective_From = function(x, y, z)
{
	//perspective.from =x;
	//perspective.from =y;
	//perspective.from =z;

	from_obj.x=x;
	from_obj.y=y;
	from_obj.z=z;
	perspective.from=from_obj;
	this.perspectives_list.push(perspective);

	/*
	this.perspectives_list.push(x);
	this.perspectives_list.push(y);
	this.perspectives_list.push(z);
	*/
};

Views.prototype.addPerspective_To = function(x, y, z)
{
	to_obj.x=x;
	to_obj.y=y;
	to_obj.z=z;
	perspective.to=to_obj;
	this.perspectives_list.push(perspective);
	/*
	this.perspectives_list.push(x);
	this.perspectives_list.push(y);
	this.perspectives_list.push(z);	*/
};