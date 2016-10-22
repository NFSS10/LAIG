
function Texture ()
{
	id = null; 
	file = null;  
	length_s = null;  
	lenght_t = null; 
	realTexture = null;

};

function Textures() 
{
	this.textures=[];
};


Textures.prototype.addTexture = function(id, file, length_s, length_t, realTexture)
{
	texture= new Texture();
	texture.id=id;
	texture.file=file;
	texture.length_t=length_t;
	texture.length_s=length_s;
	texture.realTexture=realTexture;
	
	this.textures.push(texture);
}