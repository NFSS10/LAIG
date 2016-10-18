
var material = {
	
	id : null,
	emission : {}, 
	ambient : {},
	diffuse : {},
	specular : {},
	shininess : null
	
	
};

var emission_obj = {r: null, g : null, b : null, a : null};

var ambient_obj = {r: null, g : null, b : null, a : null};

var diffuse_obj = {r: null, g : null, b : null, a : null};

var specular_obj = {r: null, g : null, b : null, a : null};


function Materials() 
{
	this.materials=[];
}


Materials.prototype.addMaterial_id = function(id)
{
	material.id=id;
	
	this.materials.push(material);
}

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




