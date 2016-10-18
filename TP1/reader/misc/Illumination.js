		
function rgba()
{
	r = null;
	g = null;
	b = null;
	a = null;

};



function Illumination() 
{
	
	this.doublesided = null;
	this.local = null;
	this.ambient = null;
	this.background = null;
}



Illumination.prototype.add_Ambient = function(r, g, b, a)
{
	ambient = new rgba();
	ambient.r=r;
	ambient.g=g;
	ambient.b=b;
	ambient.a=a;
	
	this.ambient=ambient;


};

Illumination.prototype.add_Background = function(r, g, b, a)
{
	background= new rgba();
	background.r=r;
	background.g=g;
	background.b=b;
	background.a=a;
	
	this.background = background;
	
};