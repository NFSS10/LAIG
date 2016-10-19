function Components() 
{
	this.components_list = [];
}

//*************************
function Component()
{
	this.id = null;
	
	this.transformations = null;
	this.materials = null;
	this.texture = null;
	this.children = null;
}

Component.prototype.add_components = function(transf, mat, tex, chil)
{
	this.transformations = transf;
	this.materials = mat;
	this.texture = tex;
	this.children = chil;
}

//************************


//________________________
function Transformation_Components()
{
	this.id = []; //TODO se NONE entao usar a lista, caso contrario usar este id
	this.translate_list = [];
	this.scale_list = [];
	this.rotate_list = [];
}

function Scale()
{
	this.x=null;
	this.y=null;
	this.z=null;
}

function Translate()
{
	this.x=null;
	this.y=null;
	this.z=null;
}
function Rotate()
{
	this.axis=null;
	this.angle=null;
}

//Para transformation usar transformations
Transformation_Components.prototype.add_translate = function(x,y,z)
{
	translate= new Translate();
	translate.x=x;
	translate.y=y;
	translate.z=z;
	
	this.translate_list.push(translate);
}

Transformation_Components.prototype.add_scale = function(x,y,z)
{
	scale= new Scale();
	scale.x=x;
	scale.y=y;
	scale.z=z;
	
	this.scale_list.push(scale);
}

Transformation_Components.prototype.add_rotate = function(axis,angle)
{
	rotate= new Rotate();
	rotate.axis=axis;
	rotate.angle=angle;
	
	
	this.rotate_list.push(rotate);
}


Transformation_Components.prototype.set_id = function(id)
{
	this.id.push(id);
	
}

//----------------------------

//ºººººººººººººººººººººººººº
function Materials_Components()
{
	this.materials_list = [];
}


//material
function Material_Components()
{
	this.id = null;
}
//ººººººººººººººººººººººººººº

//texture
function Texture_Components()
{
	this.id = null;
}


//..........................
function Children()
{
	this.children_list = [];
}

//componentref ou primitiveref
function ChildrenRef()
{
	this.id = null;
}
//..........................


