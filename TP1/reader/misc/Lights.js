var locationo = {x: null, y : null, z : null, w : null};
var target = {x: null, y : null, z : null};
var locationS = {x: null, y : null, z : null};
var ambient = {r : null, g : null, b : null, a : null};
var diffuse = {r : null, g : null, b : null, a : null};
var specular = {r : null, g : null, b : null, a : null};


var omni = {
	id : null,
	enabled : null,
	
	locationo : {},
	ambient : {},
	diffuse : {},
	specular : {}
		
};

var spot = {
	id : null,
	enabled : null,
	angle : null,
	exponent : null,
	
	target : {},
	locationo : {},
	ambient : {},
	diffuse : {},
	specular : {}
		
};




function Lights() 
{
	//this.lights_list = [];
	this.lightsOmni_list = [];
	this.lightsSpot_list = [];
	
}

//Omni stuff--------------------------
Lights.prototype.addOmni_Info = function(id, enabled)
{
	omni.id = id;
	omni.enabled = enabled;

	this.lightsOmni_list.push(omni);
	//this.lights_list.push(omni);

};

Lights.prototype.addLocationOmni = function(x, y, z, w)
{
	locationo.x=x;
	locationo.y=y;
	locationo.z=z;
	omni.locationo=locationo;
	this.lightsOmni_list.push(omni);
	//this.lights_list.push(omni);
};

Lights.prototype.addAmbientOmni = function(r, g, b, a)
{
	ambient.r=r;
	ambient.g=g;
	ambient.b=b;
	ambient.a=a;
	omni.ambient=ambient;
	this.lightsOmni_list.push(omni);
	//this.lights_list.push(omni);
};

Lights.prototype.addDiffuseOmni = function(r, g, b, a)
{
	diffuse.r=r;
	diffuse.g=g;
	diffuse.b=b;
	diffuse.a=a;
	omni.diffuse=diffuse;
	this.lightsOmni_list.push(omni);
	//this.lights_list.push(omni);
};

Lights.prototype.addSpecularOmni = function(r, g, b, a)
{
	specular.r=r;
	specular.g=g;
	specular.b=b;
	specular.a=a;
	omni.specular=specular;
	this.lightsOmni_list.push(omni);
	//this.lights_list.push(omni);
};
//END Omni Stuff -------------------
//END Omni Stuff -------------------
//END Omni Stuff -------------------

//Spot stuff--------------------------
Lights.prototype.addSpot_Info = function(id, enabled, angle, exponent)
{
	spot.id = id;
	spot.enabled = enabled;
	spot.angle = angle;
	spot.exponent = exponent;
	
	this.lightsSpot_list.push(spot);
	//this.lights_list.push(spot);
};

Lights.prototype.addTargetSpot = function(x, y, z)
{
	target.x=x;
	target.y=y;
	target.z=z;
	spot.target=target;
	this.lightsSpot_list.push(spot);
	//this.lights_list.push(spot);
};

Lights.prototype.addLocationSpot = function(x, y, z)
{
	locationS.x=x;
	locationS.y=y;
	locationS.z=z;
	spot.locationS=locationS;
	this.lightsSpot_list.push(spot);
	//this.lights_list.push(spot);
};

Lights.prototype.addAmbientSpot = function(r, g, b, a)
{
	ambient.r=r;
	ambient.g=g;
	ambient.b=b;
	ambient.a=a;
	spot.ambient=ambient;
	this.lightsSpot_list.push(spot);
	//this.lights_list.push(spot);
};

Lights.prototype.addDiffuseSpot = function(r, g, b, a)
{
	diffuse.r=r;
	diffuse.g=g;
	diffuse.b=b;
	diffuse.a=a;
	spot.diffuse=diffuse;
	this.lightsSpot_list.push(spot);
	//this.lights_list.push(spot);
};

Lights.prototype.addSpecularSpot = function(r, g, b, a)
{
	specular.r=r;
	specular.g=g;
	specular.b=b;
	specular.a=a;
	spot.specular=specular;
	this.lightsSpot_list.push(spot);
	//this.lights_list.push(spot);
};


