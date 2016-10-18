function Components() 
{
	this.components_list = [];
}

//*************************
function Component()
{
	this.id = null;
	
	this.transformation = null;
	this.materials = null;
	this.texture = null;
	this.children = null;
}

Component.prototype.add_id = function(id)
{
	this.id = id;
}

Component.prototype.add_components = function(transf, mat, tex, chil)
{
	this.transformation = transf;
	this.materials = mat;
	this.texture = tex;
	this.children = chil;
}

//************************


//________________________
function Transformation_Components()
{
	this.id = "NONE"; //TODO se NONE entao usar a lista, caso contrario usar este id
	
	this.transformations_list = [];
}
//Para transformation usar transformations
Transformation_Components.prototype.add_transformation(transformation)
{
	this.transformations_list.push(transformation);
}
Transformation_Components.prototype.set_id(id)
{
	this.id = id;
	this.transformations_list = null;
}

//----------------------------


function Materials_Components()
{
	this.materials_list = [];
}


//material
function Material_Components()
{
	this.id = null;
}


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


