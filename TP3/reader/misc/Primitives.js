/**Vai conter o objecto a fazer display assim como outras informacoes*/
function Primitive()
{
	this.id = null;
	this.primitiveref = null;
	this.realPrimitive = null;
}

Primitive.prototype.add_id = function(id)
{
	this.id = id;
}

//________________________
/**Primitivas*/
function Rectangle()
{
	x1 = null;
	y1 = null;

	x2 = null;
	y2 = null;
}

function Triangle()
{
	x1 = null;
	y1 = null;
	z1 = null;

	x2 = null;
	y2 = null;
	z2 = null;

	x3 = null;
	y3 = null;
	z3 = null;
}

function Cylinder()
{
	base = null;
	top = null;
	height = null;
	slices = null;
	stacks = null;
}

function Sphere()
{
	radius = null;
	slices = null;
	stacks = null;
}

function Torus()
{
	inner = null;
	outer = null;
	slices = null;
	loops = null;
};
//________________________

/**Vai conter todas as primitivas*/
function Primitives()
{
	this.primitives_list = [];
}

Primitives.prototype.add_Primitive = function(id)
{
	primitive = new Primitive();
	primitive.add_id(id);
	this.primitives_list.push(primitive);
}


Primitive.prototype.add_Rectangle = function(x1, y1, x2, y2)
{
	rectangle = new Rectangle();
	rectangle.x1 = x1;
	rectangle.x2 = x2;
	rectangle.y1 = y1;
	rectangle.y2 = y2;

	this.primitiveref = rectangle;
}

Primitive.prototype.add_Triangle = function(x1, y1, z1, x2, y2, z2, x3, y3, z3)
{
	triangle = new Triangle();
	triangle.x1 = x1;
	triangle.x2 = x2;
	triangle.x3 = x3;
	triangle.y1 = y1;
	triangle.y2 = y2;
	triangle.y3 = y3;
	triangle.z1 = z1;
	triangle.z2 = z2;
	triangle.z3 = z3;

	this.primitiveref = triangle;
};

Primitive.prototype.add_Cylinder = function(base, top, height, slices, stacks)
{
	cylinder =  new Cylinder();
	cylinder.base = base;
	cylinder.top = top;
	cylinder.height = height;
	cylinder.slices = slices;
	cylinder.stacks = stacks;

	this.primitiveref = cylinder;
}

Primitive.prototype.add_Sphere = function(radius, slices, stacks)
{
	sphere = new Sphere();
	sphere.radius = radius;
	sphere.slices = slices;
	sphere.stacks = stacks;

	this.primitiveref = sphere;
}

Primitive.prototype.add_Torus = function(inner, outer, slices, loops)
{
	torus = new Torus();
	torus.inner = inner;
	torus.outer = outer;
	torus.slices = slices;
	torus.loops = loops;

	this.primitiveref = torus;
}
