function Locationo ()
{
	this.x= null;
	this.y = null;
	this.z = null;
	this.w = null;
};

function Locations()  
{
	this.x= null; 
	this.y= null; 
	this.z = null;
};
function Rgba_lights()  
{
	this.r = null; 
	this.g = null; 
	this.b = null; 
	this.a = null;
};



function Omni ()
{
	this.id = null;
	this.enabled = null;
	
	this.locationo = null;
	this.ambient = null;
	this.diffuse = null;
	this.specular = null;
		
};

function Spot()
{
	this.id = null;
	this.enabled = null;
	this.angle = null;
	this.exponent = null;
	
	this.target = null;
	this.locations = null;
	this.ambient = null;
	this.diffuse = null;
	this.specular = null;
		
};




function Lights() 
{
	
	this.omni_list = [];
	this.spot_list = [];
	
}


Lights.prototype.add_omni = function(omni)
{
	this.omni_list.push(omni);

};

Lights.prototype.add_spot = function(spot)
{
	this.spot_list.push(spot);

};

//omni

Omni.prototype.add_info = function(id,enabled)
{
	this.id=id;
	this.enabled=enabled;
}

Omni.prototype.add_location = function(x,y,z,w)
{
	locationo = new Locationo();
	locationo.x=x;
	locationo.y=y;
	locationo.z=z;
	locationo.w=w;
	this.locationo=locationo;
}

Omni.prototype.add_ambient = function(r,g,b,a)
{
	rgba= new Rgba_lights();
	rgba.r=r;
	rgba.g=g;
	rgba.b=b;
	rgba.a=a;
	this.ambient=rgba;
}

Omni.prototype.add_diffuse = function(r,g,b,a)
{
	rgba= new Rgba_lights();
	rgba.r=r;
	rgba.g=g;
	rgba.b=b;
	rgba.a=a;
	this.diffuse=rgba;
}

Omni.prototype.add_specular = function(r,g,b,a)
{
	rgba= new Rgba_lights();
	rgba.r=r;
	rgba.g=g;
	rgba.b=b;
	rgba.a=a;
	this.specular=rgba;
}

//spot

Spot.prototype.add_info = function(id,enabled,angle,exponent)
{
	this.id=id;
	this.enabled=enabled;
	this.angle=angle;
	this.exponent=exponent;
}

Spot.prototype.add_location = function(x,y,z)
{
	locations = new Locations();
	locations.x=x;
	locations.y=y;
	locations.z=z;
	this.locations=locations;
}

Spot.prototype.add_target = function(x,y,z)
{
	target = new Locations();
	target.x=x;
	target.y=y;
	target.z=z;
	this.target=target;
}

Spot.prototype.add_ambient = function(r,g,b,a)
{
	rgba= new Rgba_lights();
	rgba.r=r;
	rgba.g=g;
	rgba.b=b;
	rgba.a=a;
	this.ambient=rgba;
}

Spot.prototype.add_diffuse = function(r,g,b,a)
{
	rgba= new Rgba_lights();
	rgba.r=r;
	rgba.g=g;
	rgba.b=b;
	rgba.a=a;
	this.diffuse=rgba;
}

Spot.prototype.add_specular = function(r,g,b,a)
{
	rgba= new Rgba_lights();
	rgba.r=r;
	rgba.g=g;
	rgba.b=b;
	rgba.a=a;
	this.specular=rgba;
}
