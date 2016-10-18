var rectangle = {x1: null, y1 : null, x2 : null, y2 : null};
var triangle = {x1 : null, y1 : null, z1 : null, x2 : null, y2 : null, z2 : null, x3 : null, y3 : null, z3 : null};
var cylinder = {base: null, top : null, height : null, slices : null, stacks : null};
var sphere = {radius : null, slices : null, stacks : null};
var torus = {inner : null, outer : null, slices : null, loops : null};


var primitive = {
	id : null,
	this.primitiveref = [];
};




function Primitives() 
{
	this.primitives_list[];
}

Primitives.prototype.addRectangle = function(x1, y1, x2, y2)
{
	rectangle.x1 = x1;
	rectangle.x2 = x2;
	rectangle.y1 = y1;
	rectangle.y2 = y2;


};

Primitives.prototype.addTriangle = function(x1, y1, z1, x2, y2, z2, x3, y3, z3)
{
	triangle.x1 = x1;
	triangle.x2 = x2;
	triangle.x3 = x3;
	triangle.y1 = y1;
	triangle.y2 = y2;
	triangle.y3 = y3;
	triangle.z1 = z1;
	triangle.z2 = z2;
	triangle.z3 = z3;

	

};

Primitives.prototype.addCylinder = function(x1, y1, x2, y2)
{
	cylinder.x1 = x1;
	rectangle.x2 = x2;
	rectangle.y1 = y1;
	rectangle.y2 = y2;


};

Primitives.prototype.addSphere = function(x1, y1, x2, y2)
{
	rectangle.x1 = x1;
	rectangle.x2 = x2;
	rectangle.y1 = y1;
	rectangle.y2 = y2;


};

Primitives.prototype.addTorus = function(x1, y1, x2, y2)
{
	rectangle.x1 = x1;
	rectangle.x2 = x2;
	rectangle.y1 = y1;
	rectangle.y2 = y2;


};

