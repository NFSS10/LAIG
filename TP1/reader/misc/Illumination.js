
var ambient = {r : null, g : null, b : null, a : null};
		
var background = {r : null, g : null, b : null, a : null};



function Illumination() 
{
	
	this.doublesided = null;
	this.local = null;
	this.ambient = [];
	this.background = [];
}



Illumination.prototype.addAmbient = function(r, g, b, a)
{
	
	ambient.r=r;
	ambient.g=g;
	ambient.b=b;
	ambient.a=a;
	
	this.ambient=ambient;


};

Illumination.prototype.addBackground = function(r, g, b, a)
{
	background.r=r;
	background.g=g;
	background.b=b;
	background.a=a;
	
	this.background = background;
	
};