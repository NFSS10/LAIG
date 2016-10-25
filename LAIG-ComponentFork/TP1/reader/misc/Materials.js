
function Material () 
{
	
	this.id = null,
	this.emission = null; 
	this.ambient = null; 
	this.diffuse = null; 
	this.specular = null; 
	this.shininess = null;
	
	
};

function rgb_obj() 
{
	this.r = null;
	this.g = null;
	this.b = null;
	this.a = null;
};


/*var ambient_obj = {r: null, g : null, b : null, a : null};

var diffuse_obj = {r: null, g : null, b : null, a : null};

var specular_obj = {r: null, g : null, b : null, a : null};*/


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

/*
Materials.prototype.addMaterial_emission = function(r, g, b, a)
{
	emission_obj.r=r;
	emission_obj.g=g;
	emission_obj.b=b;
	emission_obj.a=a;
	
	material.emission=emission_obj;
	
	this.materials.push(material);
}

Materials.prototype.addMaterial_ambient = function(r, g, b, a)
{
	ambient_obj.r=r;
	ambient_obj.g=g;
	ambient_obj.b=b;
	ambient_obj.a=a;
	
	material.ambient=ambient_obj;
	
	this.materials.push(material);
}

Materials.prototype.addMaterial_diffuse = function(r, g, b, a)
{
	diffuse_obj.r=r;
	diffuse_obj.g=g;
	diffuse_obj.b=b;
	diffuse_obj.a=a;
	
	material.diffuse=diffuse_obj;
	
	this.materials.push(material);
}

Materials.prototype.addMaterial_specular = function(r, g, b, a)
{
	specular_obj.r=r;
	specular_obj.g=g;
	specular_obj.b=b;
	specular_obj.a=a;
	
	material.specular=specular_obj;
	
	this.materials.push(material);
}

Materials.prototype.addMaterial_shininess = function(shininess)
{
	material.shininess=shininess;
	
	this.materials.push(material);
}
*/



