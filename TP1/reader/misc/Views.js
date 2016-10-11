/*
Estrutura da struct...

var perspective = {
		id : null,
		near : null,
		far : null,
		angle : null,
		
		from : {x: null, y : null, z : null},
		
		to : {x : null, y : null, z : null}
		
};

*/

function Views() 
{
	this.default = null;
	this.perspectives_list = [];
}


Views.prototype.addPerspective_Info = function(id, near, far, angle)
{
	this.perspectives_list.push(id);
	this.perspectives_list.push(near);
	this.perspectives_list.push(far);
	this.perspectives_list.push(angle);

};

Views.prototype.addPerspective_From = function(x, y, z)
{
	this.perspectives_list.push(x);
	this.perspectives_list.push(y);
	this.perspectives_list.push(z);
};

Views.prototype.addPerspective_To = function(x, y, z)
{
	this.perspectives_list.push(x);
	this.perspectives_list.push(y);
	this.perspectives_list.push(z);	
};