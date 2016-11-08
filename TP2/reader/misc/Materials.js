
/**Vai conter as informacoes de um material*/
function Material ()
{
	this.id = null,
	this.emission = null;
	this.ambient = null;
	this.diffuse = null;
	this.specular = null;
	this.shininess = null;
	this.realMaterial = null;
};

function rgb_obj()
{
	this.r = null;
	this.g = null;
	this.b = null;
	this.a = null;
};

/**Vai conter todos os materiasi*/
function Materials()
{
	this.materials=[];
}


Material.prototype.add_id = function(id)
{
	this.id=id;
}

Material.prototype.add_emission = function(r,g,b,a)
{
	rgbobj= new rgb_obj();
	rgbobj.r=r;
	rgbobj.g=g;
	rgbobj.b=b;
	rgbobj.a=a;

	this.emission=rgbobj;
}

Material.prototype.add_ambient = function(r,g,b,a)
{
	rgbobj= new rgb_obj();
	rgbobj.r=r;
	rgbobj.g=g;
	rgbobj.b=b;
	rgbobj.a=a;

	this.ambient=rgbobj;
}

Material.prototype.add_diffuse = function(r,g,b,a)
{
	rgbobj= new rgb_obj();
	rgbobj.r=r;
	rgbobj.g=g;
	rgbobj.b=b;
	rgbobj.a=a;

	this.diffuse=rgbobj;
}

Material.prototype.add_specular = function(r,g,b,a)
{
	rbgobj= new rgb_obj();
	rgbobj.r=r;
	rgbobj.g=g;
	rgbobj.b=b;
	rgbobj.a=a;

	this.specular=rgbobj;
}

Material.prototype.add_shininess = function(shininess)
{
	this.shininess=shininess;
}

Materials.prototype.add_material = function(mat)
{
	this.materials.push(mat);
}
