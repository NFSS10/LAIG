
/*function Graph()
{
	scene_root=null;
	scene_axis=null;
	views=null;
	illumination=null;
	lights=null;
	textures=null;
	materials=null;
	transformations=null;
	primitives=null;
	components=null;
}

var graph= new Graph();*/

function MySceneGraph(filename, scene) {
	this.loadedOk = null;

	// Establish bidirectional references between scene and graph
	this.scene = scene;
	this.scene.graph=this;

	//construtores;

	this.scene_info=new Scene();
	this.view_teste = new Views();
	this.illumination_teste = new Illumination();
	this.lights_teste= new Lights();
	this.texture_teste = new Textures();
	this.materiais= new Materials();
	this.transformationst = new Transformations();
	this.primitives_obj = new Primitives();
	this.components_obj = new Components();

	// File reading
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */

	this.reader.open('scenes/'+filename, this);
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function()
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;

	// Here should go the calls for different functions to parse the various blocks
	/*var error = this.parseGlobalsExample(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}
*/


	var sceneError = this.parseScene(rootElement);

	if (sceneError != null) {
		this.onXMLError(sceneError);
		return;
	}

	//VIEWS
	var viewsError = this.parseViews(rootElement);

	if (viewsError != null) {
		this.onXMLError(viewsError);
		return;
	}


	var illuminationError = this.parseIllumination(rootElement);

	if (illuminationError != null) {
		this.onXMLError(illuminationError);
		return;
	}


	var lightError = this.parseLights(rootElement);

	if (lightError != null) {
		this.onXMLError(lightError);
		return;
	}

	var texturesError = this.parseTextures(rootElement);

	if (texturesError != null) {
		this.onXMLError(texturesError);
		return;
	}

	 var materialsError = this.parseMaterialas(rootElement);

	if (materialsError != null) {
		this.onXMLError(materialsError);
		return;
	}

	 var transformationsError = this.parseTransformations(rootElement);

	if (transformationsError != null) {
		this.onXMLError(transformationsError);
		return;
	}

	 var primitivesError = this.parsePrimitives(rootElement);

	if (primitivesError != null) {
		this.onXMLError(primitivesError);
		return;
	}

	 var ComponentsError = this.parseComponents(rootElement);

	if (ComponentsError != null) {
		this.onXMLError(ComponentsError);
		return;
	}


	this.loadedOk=true;

	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};



/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseGlobalsExample= function(rootElement) {

	var elems =  rootElement.getElementsByTagName('globals');
	if (elems == null) {
		return "globals element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'globals' element found.";
	}

	// various examples of different types of access
	var globals = elems[0];
	this.background = this.reader.getRGBA(globals, 'background');
	this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill","line","point"]);
	this.cullface = this.reader.getItem(globals, 'cullface', ["back","front","none", "frontandback"]);
	this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw","cw"]);

	console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");

	var tempList=rootElement.getElementsByTagName('list');

	if (tempList == null  || tempList.length==0) {
		return "list element is missing.";
	}

	this.list=[];
	// iterate over every element
	var nnodes=tempList[0].children.length;
	for (var i=0; i< nnodes; i++)
	{
		var e=tempList[0].children[i];

		// process each element and store its information
		this.list[e.id]=e.attributes.getNamedItem("coords").value;
		console.log("Read list item id "+ e.id+" with value "+this.list[e.id]);
	};

};


MySceneGraph.prototype.parseScene= function(rootElement) {

	var sceneElements =  rootElement.getElementsByTagName('scene');
	if (sceneElements == null || sceneElements.length==0){
		return "scene element is missing.";
	}

	if (sceneElements.length != 1) {
		return "either zero or more than one 'scene' element found.";
	}

	var scene = sceneElements[0];

	this.root = this.reader.getString(scene, 'root');
	this.axis_length = this.reader.getFloat(scene, 'axis_length');

	//add ao graph
	//graph.scene_root=this.root;
	//graph.scene_axis=this.axis_length;
	this.scene_info.root=this.root;
	this.scene_info.axis_lenght=this.axis_length;
	console.log("SCENE ........." );
	console.log("root = " + this.root + ", axis length = " + this.axis_length);

};



MySceneGraph.prototype.parseViews = function(rootElement)
{
	var views = rootElement.getElementsByTagName('views');

	if (views == null  || views.length==0){
		return "views element is missing.";
	}



	var view = views[0];
	this.default = this.reader.getString(view, 'default');

	//TESTE____________________________________________


	this.view_teste.add_default(this.default);

	//TESTE............................................

	var nnodes = views[0].children.length;
	for(var i = 0; i <nnodes ; i++)
	{

		perspective = view.children[i];
		perspec= new Perspective();
		this.id = this.reader.getString(perspective, 'id');
		this.near = this.reader.getFloat(perspective, 'near');
		this.far = this.reader.getFloat(perspective, 'far');
		this.angle = this.reader.getFloat(perspective, 'angle');
		perspec.add_Info(this.id, this.near, this.far, this.angle);

		console.log("VIEWS ........." );
		console.log(perspec.id + "  " + perspec.near+ "  " + perspec.far + "  " + perspec.angle + "\n");




		from = perspective.children[0];
		this.xF = this.reader.getFloat(from, 'x');
		this.yF = this.reader.getFloat(from, 'y');
		this.zF = this.reader.getFloat(from, 'z');
		perspec.add_From(this.xF,this.yF,this.zF);

		to = perspective.children[1];
		this.xT = this.reader.getFloat(to, 'x');
		this.yT = this.reader.getFloat(to, 'y');
		this.zT = this.reader.getFloat(to, 'z');

		perspec.add_To(this.xT,this.yT,this.zT);

		console.log("From: "+perspec.from.x + "  " + perspec.from.y + "  " + perspec.from.z + "\n To: " + perspec.to.x + "  " + perspec.to.y + "  " + perspec.to.z + "  ");

		this.view_teste.add_perspective(perspec);
	}
	//add ao graph
	//graph.views=view_teste;

};


MySceneGraph.prototype.parseIllumination = function(rootElement)
{
	var illuminations = rootElement.getElementsByTagName('illumination');

	if (illuminations == null  || illuminations.length==0){
		return "illumination element is missing.";
	}

	var  illumination = illuminations[0];
	this.doublesided = this.reader.getFloat(illumination, 'doublesided');
	this.local = this.reader.getFloat(illumination, 'local');

	console.log("Illuminations .........");
	//TESTE____________________________________________

	this.illumination_teste.doublesided = this.doublesided;
	this.illumination_teste.local = this.local;

	//console.log(this.doublesided + "   " + this.local);
	console.log(this.illumination_teste.doublesided + "   " + this.illumination_teste.local);


		ambient = illumination.children[0];

		this.rA = this.reader.getFloat(ambient, 'r');
		this.gA = this.reader.getFloat(ambient, 'g');
		this.bA = this.reader.getFloat(ambient, 'b');
		this.aA = this.reader.getFloat(ambient, 'a');

		this.illumination_teste.add_Ambient(this.rA,this.gA,this.bA,this.aA);

		background = illumination.children[1];

		this.rB = this.reader.getFloat(background, 'r');
		this.gB = this.reader.getFloat(background, 'g');
		this.bB = this.reader.getFloat(background, 'b');
		this.aB = this.reader.getFloat(background, 'a');

		this.illumination_teste.add_Background(this.rB,this.gB,this.bB,this.aB);


		console.log(this.illumination_teste.ambient.r + "  " + this.illumination_teste.ambient.g + "  " + this.illumination_teste.ambient.b + "  "+ this.illumination_teste.ambient.a+"\n");
		console.log(this.illumination_teste.background.r + "  " + this.illumination_teste.background.g + "  " + this.illumination_teste.background.b + "  "+ this.illumination_teste.background.a+"\n\n\n");

		//graph.illumination=illumination_teste;

};


MySceneGraph.prototype.parseLights = function(rootElement)
{
	var lights = rootElement.getElementsByTagName('lights');

	if (lights == null  || lights.length==0){
		return "lights element is missing.";
	}

	var  light = lights[0];



	console.log("Lights .........");

	var nnodes = lights[0].children.length;
	for(var i = 0; i <nnodes ; i++)
	{

		if(light.children[i].nodeName == "omni")
		{

		omni_light= new Omni();

		console.log("......OMNI.....");
		omni = light.children[i];
		this.id = this.reader.getString(omni, 'id');
		this.enabled = this.reader.getFloat(omni, 'enabled');

		omni_light.add_info(this.id,this.enabled);

		console.log(omni_light.id + "  " + omni_light.enabled);

		loc = omni.children[0];
		this.x = this.reader.getFloat(loc, 'x');
		this.y = this.reader.getFloat(loc, 'y');
		this.z = this.reader.getFloat(loc, 'z');
		this.w = this.reader.getFloat(loc, 'w');

		omni_light.add_location(this.x,this.y,this.z,this.w);

		console.log(omni_light.locationo.x + "  " + omni_light.locationo.y + "  " + omni_light.locationo.z + "  "+omni_light.locationo.w+"\n");



		ambient = omni.children[1];
		this.rA = this.reader.getFloat(ambient, 'r');
		this.gA = this.reader.getFloat(ambient, 'g');
		this.bA = this.reader.getFloat(ambient, 'b');
		this.aA = this.reader.getFloat(ambient, 'a');

		omni_light.add_ambient(this.rA,this.gA,this.bA,this.aA);

		console.log(omni_light.ambient.r + "  " + omni_light.ambient.g + "  " + omni_light.ambient.b + "  "+omni_light.ambient.a+"\n");


		diffuse = omni.children[2];
		this.rD = this.reader.getFloat(diffuse, 'r');
		this.gD = this.reader.getFloat(diffuse, 'g');
		this.bD	= this.reader.getFloat(diffuse, 'b');
		this.aD = this.reader.getFloat(diffuse, 'a');

		omni_light.add_diffuse(this.rD,this.gD,this.bD,this.aD);

		console.log(omni_light.diffuse.r + "  " + omni_light.diffuse.g + "  " + omni_light.diffuse.b + "  "+omni_light.diffuse.a+"\n");


		specular = omni.children[3];
		this.rS = this.reader.getFloat(specular, 'r');
		this.gS = this.reader.getFloat(specular, 'g');
		this.bS = this.reader.getFloat(specular, 'b');
		this.aS = this.reader.getFloat(specular, 'a');

		omni_light.add_specular(this.rS,this.gS,this.bS,this.aS);

		console.log(omni_light.specular.r + "  " + omni_light.specular.g + "  " + omni_light.specular.b + "  "+omni_light.specular.a+"\n");

		this.lights_teste.add_omni(omni_light);
		}
		else
		{
			console.log("......SPOT.....");
		spot = light.children[i];

		spot_light=new Spot();

		this.id = this.reader.getString(spot, 'id');
		this.enabled = this.reader.getFloat(spot, 'enabled');
		this.angle = this.reader.getFloat(spot, 'angle');
		this.exponent = this.reader.getFloat(spot, 'exponent');

		spot_light.add_info(this.id,this.enabled,this.angle,this.exponent);

		console.log(spot_light.id + "  " + spot_light.enabled + "  " +spot_light.angle + "  " + spot_light.exponent);

		target = spot.children[0];
		this.xt = this.reader.getFloat(target, 'x');
		this.yt = this.reader.getFloat(target, 'y');
		this.zt = this.reader.getFloat(target, 'z');

		spot_light.add_target(this.xt,this.yt,this.zt);

		console.log(spot_light.target.x + "  " + spot_light.target.y  + "  " + spot_light.target.z + "  "+"\n");

		loc = spot.children[1];
		this.x = this.reader.getFloat(loc, 'x');
		this.y = this.reader.getFloat(loc, 'y');
		this.z = this.reader.getFloat(loc, 'z');

		spot_light.add_location(this.x,this.y,this.z);

		console.log(spot_light.locations.x + "  " + spot_light.locations.y + "  " + spot_light.locations.z + "  "+"\n");


		ambient = spot.children[2];
		this.rA = this.reader.getFloat(ambient, 'r');
		this.gA = this.reader.getFloat(ambient, 'g');
		this.bA = this.reader.getFloat(ambient, 'b');
		this.aA = this.reader.getFloat(ambient, 'a');

		spot_light.add_ambient(this.rA,this.gA,this.bA,this.aA);

		console.log(spot_light.ambient.r + "  " + spot_light.ambient.g + "  " + spot_light.ambient.b + "  "+spot_light.ambient.a+"\n");


		diffuse = spot.children[3];
		this.rD = this.reader.getFloat(diffuse, 'r');
		this.gD = this.reader.getFloat(diffuse, 'g');
		this.bD	= this.reader.getFloat(diffuse, 'b');
		this.aD = this.reader.getFloat(diffuse, 'a');

		spot_light.add_diffuse(this.rD,this.gD,this.bD,this.aD);

		console.log(spot_light.diffuse.r + "  " + spot_light.diffuse.g + "  " + spot_light.diffuse.b + "  "+spot_light.diffuse.a+"\n");


		specular = spot.children[4];
		this.rS = this.reader.getFloat(specular, 'r');
		this.gS = this.reader.getFloat(specular, 'g');
		this.bS = this.reader.getFloat(specular, 'b');
		this.aS = this.reader.getFloat(specular, 'a');

		spot_light.add_specular(this.rS,this.gS,this.bS,this.aS);

		console.log(spot_light.specular.r + "  " + spot_light.specular.g + "  " + spot_light.specular.b + "  "+spot_light.specular.a+"\n");

		this.lights_teste.add_spot(spot_light);
		}

	}
	//graph.lights=lights_teste;
	//console.log("SUPER TESTE MAXIMOOOOOOOOO: " +graph.lights.omni_list[0].id);
};

MySceneGraph.prototype.parseTextures = function(rootElement)
{

	var textures = rootElement.getElementsByTagName('textures');

	if (textures == null  || textures.length==0){
		return "textures element is missing.";
	}

	var  texture = textures[0];
	console.log("Textures...........");
	var nnodes = texture.children.length;
	for(var i = 0; i <nnodes ; i++)
	{
		tex = texture.children[i];
		this.id = this.reader.getString(tex, 'id');
		this.file = this.reader.getString(tex, 'file');
		this.length_s = this.reader.getFloat(tex, 'length_s');
		this.length_t = this.reader.getFloat(tex, 'length_t');

		this.texture_teste.addTexture(this.id,this.file,this.length_s,this.length_t);
		console.log(this.texture_teste.textures[i].id	+ "  " + this.texture_teste.textures[i].file + "  " + this.texture_teste.textures[i].length_s + "  "+this.texture_teste.textures[i].length_t+"\n");
	}
	//graph.textures=texture_teste;
};

MySceneGraph.prototype.parseMaterialas = function(rootElement)
{
	var materials = rootElement.getElementsByTagName('materials');

	if (materials == null  || materials.length==0){
		return "materials element is missing.";
	}

	var  material = materials[0];
	console.log("Materials .........");

	var nnodes = material.children.length;

	for(var i = 0; i <nnodes ; i++)
	{
		matrial= new Material();
		mat = material.children[i];
		this.id = this.reader.getString(mat,'id');
		matrial.add_id(this.id);
		console.log(matrial.id);

		emission = mat.children[0];
		this.rE = this.reader.getFloat(emission, 'r');
		this.gE = this.reader.getFloat(emission, 'g');
		this.bE = this.reader.getFloat(emission, 'b');
		this.aE = this.reader.getFloat(emission, 'a');
		matrial.add_emission(this.rE,this.gE,this.bE,this.aE);
		console.log(matrial.emission.r + "  " + matrial.emission.g + "  " + matrial.emission.b + "  "+matrial.emission.a+"\n");

		ambient = mat.children[1];
		this.rA = this.reader.getFloat(ambient, 'r');
		this.gA = this.reader.getFloat(ambient, 'g');
		this.bA = this.reader.getFloat(ambient, 'b');
		this.aA = this.reader.getFloat(ambient, 'a');
		matrial.add_ambient(this.rA,this.gA,this.bA,this.aA);
		console.log(matrial.ambient.r + "  " + matrial.ambient.g + "  " + matrial.ambient.b + "  "+ matrial.ambient.a+"\n");

		diffuse = mat.children[2];
		this.rD = this.reader.getFloat(diffuse, 'r');
		this.gD = this.reader.getFloat(diffuse, 'g');
		this.bD	= this.reader.getFloat(diffuse, 'b');
		this.aD = this.reader.getFloat(diffuse, 'a');
		matrial.add_diffuse(this.rD,this.gD,this.bD,this.aD);
		console.log(matrial.diffuse.r + "  " +matrial.diffuse.g + "  " + matrial.diffuse.b + "  "+matrial.diffuse.a +"\n");

		specular = mat.children[3];
		this.rS = this.reader.getFloat(specular, 'r');
		this.gS = this.reader.getFloat(specular, 'g');
		this.bS = this.reader.getFloat(specular, 'b');
		this.aS = this.reader.getFloat(specular, 'a');
		matrial.add_specular(this.rS,this.gS,this.bS,this.aS);
		console.log(matrial.specular.r	+ "  " + matrial.specular.g + "  " + matrial.specular.b + "  "+ matrial.specular.a +"\n");

		shininess = mat.children[4];
		this.value = this.reader.getFloat(shininess, 'value');
		matrial.add_shininess(this.value);
		console.log(matrial.shininess);

		this.materiais.add_material(matrial);

	}
	//graph.materials=materiais;

}

MySceneGraph.prototype.parseTransformations = function(rootElement)
{
	var transformations = rootElement.getElementsByTagName('transformations');

	if (transformations == null  || transformations.length==0){
		return "transformations element is missing.";
	}

	var  transfor = transformations[0];
	console.log("Transformations .........");
	var translates=0;
	var rotates=0;
	var scales=0;
	var nnodes = transfor.children.length;
	for(var i = 0; i <nnodes ; i++)
	{
		var transform = new Transformation();
		transf = transfor.children[i];
		this.id = this.reader.getString(transf,'id');
		transform.add_id(this.id);
		console.log(transform.id);


		var n_childrens = transf.children.length;
		for(var j = 0; j < n_childrens ; j++)
		{
		child = transf.children[j];

		if(child.nodeName == "translate")
		{
		translate = transf.children[j];
		this.xT = this.reader.getFloat(translate, 'x');
		this.yT = this.reader.getFloat(translate, 'y');
		this.zT = this.reader.getFloat(translate, 'z');
		transform.add_translate(this.xT,this.yT,this.zT);
		console.log("translate: " + transform.translate[translates].x + "  " + transform.translate[translates].y + "  " + transform.translate[translates].z +"\n");
		translates++;
		}
		else if(child.nodeName == "rotate")
		{
		rotate = transf.children[j];
		this.axis = this.reader.getString(rotate, 'axis');
		this.angle = this.reader.getFloat(rotate, 'angle');
		transform.add_rotate(this.axis,this.angle);
		console.log("rotate: " + transform.rotate[rotates].axis + "  " +  transform.rotate[rotates].angle +"\n");
		rotates++;
		}
		else if(child.nodeName == "scale")
		{
		scale = transf.children[j];
		this.xS = this.reader.getFloat(scale, 'x');
		this.yS = this.reader.getFloat(scale, 'y');
		this.zS = this.reader.getFloat(scale, 'z');
		transform.add_scale(this.xS,this.yS,this.zS);
		console.log("scale: " + transform.scale[scales].x  + "  " + transform.scale[scales].y + "  " +transform.scale[scales].z +"\n");
		scales++;
		}

		}

		this.transformationst.add_transformation(transform);
		translates=0;
		rotates=0;
		scales=0;
	}
	//graph.transformations=transformationst;
}



MySceneGraph.prototype.parsePrimitives = function(rootElement)
{
	var primitives = rootElement.getElementsByTagName('primitives');

	if (primitives == null  || primitives.length==0){
		return "primitives element is missing.";
	}

	var  primitive = primitives[0];
	console.log("Primitives .........");
	//:::::::::::::::



	var nnodes = primitive.children.length;
	for(var i = 0; i <nnodes ; i++)
	{
		prim = primitive.children[i];
		this.id = this.reader.getString(prim,'id');
		//console.log(this.id);
		this.primitives_obj.add_Primitive(this.id);


		var n_childrens = prim.children.length;
		for(var j = 0; j < n_childrens ; j++)
		{
		child = prim.children[j];

		if(child.nodeName == "rectangle")
		{
		rectangle = prim.children[j];
		this.x1 = this.reader.getFloat(rectangle, 'x1');
		this.y1 = this.reader.getFloat(rectangle, 'y1');
		this.x2 = this.reader.getFloat(rectangle, 'x2');
		this.y2 = this.reader.getFloat(rectangle, 'y2');
		//console.log("rectangle: " +this.x1 + "  " + this.y1 + "  " + this.x2+ "  " + this.y2 +"\n");
		this.primitives_obj.primitives_list[i].add_Rectangle(this.x1, this.y1, this.x2, this.y2);

		}
		else if(child.nodeName == "triangle")
		{
		triangle = prim.children[j];
		this.x1 = this.reader.getFloat(triangle, 'x1');
		this.y1 = this.reader.getFloat(triangle, 'y1');
		this.z1 = this.reader.getFloat(triangle, 'z1');
		this.x2 = this.reader.getFloat(triangle, 'x2');
		this.y2 = this.reader.getFloat(triangle, 'y2');
		this.z2 = this.reader.getFloat(triangle, 'z2');
		this.x3 = this.reader.getFloat(triangle, 'x3');
		this.y3 = this.reader.getFloat(triangle, 'y3');
		this.z3 = this.reader.getFloat(triangle, 'z3');
		//console.log("triangle: \n"
		//+"p1: "+ this.x1 + "  " + this.y1 + "  " + this.z1 + "\n"
		//+"p2: "+ this.x2 + "  " + this.y2 + "  " + this.z2+"\n"
		//+"p3: "+ this.x3 + "  " + this.y3 + "  " + this.z3
		//);
		this.primitives_obj.primitives_list[i].add_Triangle(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, this.x3, this.y3, this.z3);

		}
		else if(child.nodeName == "cylinder")
		{
		cylinder = prim.children[j];
		this.base = this.reader.getFloat(cylinder, 'base');
		this.top = this.reader.getFloat(cylinder, 'top');
		this.height = this.reader.getFloat(cylinder, 'height');
		this.slices = this.reader.getFloat(cylinder, 'slices');
		this.stacks = this.reader.getFloat(cylinder, 'stacks');
		//console.log("cylinder: " +this.base + "  " + this.top_c + "  " + this.height + "  "+
		//this.slices+"  " + this.stacks +"\n");
		this.primitives_obj.primitives_list[i].add_Cylinder(this.base, this.top, this.height, this.slices, this.stacks);
		}
		else if(child.nodeName == "sphere")
		{
		sphere = prim.children[j];
		this.radius = this.reader.getFloat(sphere, 'radius');
		this.slices = this.reader.getFloat(sphere, 'slices');
		this.stacks = this.reader.getFloat(sphere, 'stacks');
		//console.log("sphere: " +this.radius + "  " + this.slices + "  " + this.stacks +"\n");
		this.primitives_obj.primitives_list[i].add_Sphere(this.radius, this.slices, this.stacks);
		}
		else if(child.nodeName == "torus")
		{
		torus = prim.children[j];
		this.inner = this.reader.getFloat(torus, 'inner');
		this.outer = this.reader.getFloat(torus, 'outer');
		this.slices = this.reader.getFloat(torus, 'slices');
		this.loops = this.reader.getFloat(torus, 'loops');
		//console.log("torus: " +this.inner + "  " + this.outer + "  " + this.slices + "  " + this.loops+"\n");
		this.primitives_obj.primitives_list[i].add_Torus(this.inner, this.outer, this.slices, this.loops);

		}

		}


	}

	//TESTE PRINT

	console.log(this.primitives_obj.primitives_list.length);

	for(var t = 0; t <this.primitives_obj.primitives_list.length ; t++)
	{
		primitive = this.primitives_obj.primitives_list[t];
		if(primitive.id == "torus")
		{
			console.log("torus: " + primitive.primitiveref.inner + "  " + primitive.primitiveref.outer + "  " + primitive.primitiveref.slices + "  " + primitive.primitiveref.loops+"\n");
		}
		else if(primitive.id == "sphere")
		{
			console.log("sphere: " +primitive.primitiveref.radius + "  " + primitive.primitiveref.slices + "  " + primitive.primitiveref.stacks +"\n");
		}
		else if(primitive.id == "cylinder")
		{
			console.log("cylinder: " +primitive.primitiveref.base + "  " + primitive.primitiveref.top + "  " + primitive.primitiveref.height + "  "+
			primitive.primitiveref.slices+"  " + primitive.primitiveref.stacks +"\n");
		}
		else if(primitive.id == "triangle")
		{
			console.log("triangle: \n"
		+"p1: "+ primitive.primitiveref.x1 + "  " + primitive.primitiveref.y1 + "  " + primitive.primitiveref.z1 + "\n"
		+"p2: "+ primitive.primitiveref.x2 + "  " + primitive.primitiveref.y2 + "  " + primitive.primitiveref.z2+"\n"
		+"p3: "+ primitive.primitiveref.x3 + "  " + primitive.primitiveref.y3 + "  " + primitive.primitiveref.z3
		);
		}else if(primitive.id == "rectangle")
		{
			console.log("rectangle: " +primitive.primitiveref.x1 + "  " + primitive.primitiveref.y1 + "  " + primitive.primitiveref.x2+ "  " + primitive.primitiveref.y2 +"\n");
		}



	}
	//____
	console.log("\n ENDIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");

	//graph.primitives=primitives_obj;

};

MySceneGraph.prototype.parseComponents = function(rootElement)
{

	var components = rootElement.getElementsByTagName('components');

	if (components == null  || components.length==0){
		return "components element is missing.";
	}

	var  component = components[0];
	console.log("\n \n components .........");
	var nnodes = component.children.length;




	for(var i = 0; i <nnodes ; i++)
	{
		comp = component.children[i];
		this.id = this.reader.getString(comp,'id');
		console.log(this.id + "\n");
		component_obj = new Component();
		component_obj.id = this.id;


		var Nchild = comp.children.length;
		console.log(Nchild);
		for(var j = 0; j <Nchild ; j++)
		{
			var child= comp.children[j];


			if(child.nodeName=="transformation") //tranformaçao
			{
				console.log("...Transformation..............\n");
				var Ntranf = child.children.length;
				//ids=0;
				//translates=0;
				//rotates=0;
				//scales=0;
				//transformation_obj = new Transformation_Components(); //vai
				componentTransformation = new Transformation();
				var transformation_matrix = mat4.create();
				for(var t = 0; t <Ntranf; t++)
				{

					transf=child.children[t]
					//TODO bloco id
					if(transf.nodeName=="transformationref")
					{
						transformationref = transf
						this.idT = this.reader.getString(transformationref, 'id');
						//transformation_obj.set_id(this.idT);
						//console.log("AQUIIIII" +transformation_obj.id[ids] +"\n");
						//ids++;
					}
					//TODO faz apartir de aqui, ja que fizeste os transformations
					//Usas o ... add_transformation(); para fazer push para a lista de transformacoes
					if(transf.nodeName=="translate")
					{
						translate = transf
						this.xT = this.reader.getFloat(translate, 'x');
						this.yT = this.reader.getFloat(translate, 'y');
						this.zT = this.reader.getFloat(translate, 'z');

						mat4.translate(transformation_matrix, transformation_matrix, [this.xT, this.yT, this.zT]);
						//transformation_obj.add_translate(this.xT,this.yT,this.zT);
						//console.log("translate: " +transformation_obj.translate_list[translates].x + "  " + transformation_obj.translate_list[translates].y + "  " + transformation_obj.translate_list[translates].z +"\n");
						//translates++;
					}
					if(transf.nodeName=="rotate")
					{
						rotate = transf
						this.axis = this.reader.getString(rotate, 'axis');
						this.angle = this.reader.getFloat(rotate, 'angle');
						//transformation_obj.add_rotate(this.axis,this.angle);
						//console.log("rotate: " +transformation_obj.rotate_list[rotates].axis+ "  " + transformation_obj.rotate_list[rotates].angle +"\n");
						var rotate_arr;
						if(this.axis == 'x')
							rotate_arr = [1,0,0];
						else if(this.axis == 'y')
							rotate_arr = [0,1,0];
						else if (this.axis == 'z')
							rotate_arr = [0,0,1];

						mat4.rotate(transformation_matrix, transformation_matrix, this.angle *(Math.PI / 180.0) ,rotate_arr);

						//rotates++;
					}
					if(transf.nodeName=="scale")
					{
						scale = transf
						this.xS = this.reader.getFloat(scale, 'x');
						this.yS = this.reader.getFloat(scale, 'y');
						this.zS = this.reader.getFloat(scale, 'z');
						//transformation_obj.add_scale(this.xS,this.yS,this.zS);

						mat4.scale(transformation_matrix, transformation_matrix, [this.xS,this.yS,this.zS]);
						//console.log("scale: " +transformation_obj.scale_list[scales].x+ "  " + transformation_obj.scale_list[scales].y + "  " + transformation_obj.scale_list[scales].z +"\n");
					}
					//TODO ATE AQUI
					componentTransformation.transformationMatrix = transformation_matrix;

				}
				component_obj.transformations=componentTransformation;
			}
			if(child.nodeName=="materials") //materiais
			{
				console.log("...Materials...\n");
				materials_obj = new Materials_Components();

				var Nmat = child.children.length;
				for(var t = 0; t <Nmat; t++)
				{
					material = child.children[t]
					this.idM= this.reader.getString(material, 'id');
					console.log(this.idM + "\n");
					material_obj = new Material_Components();
					material_obj.id =this.idM;

					materials_obj.materials_list.push(material_obj);
				}
				component_obj.materials = materials_obj;
			}
			if(child.nodeName=="texture") //texturas
			{
				console.log("...Texture...\n");
				textures_obj = new Materials_Components();

				texture= child;
				this.idT= this.reader.getString(texture, 'id');
				console.log(this.idT + "\n");
				textures_obj.id = this.idT;

				component_obj.texture = textures_obj;
			}
			if(child.nodeName=="children")  //filhos
			{
				console.log("...Children...\n");
				childrens_obj = new Children();

				var Nchildren = child.children.length;
				for(var c = 0; c <Nchildren; c++)
				{
					childsref = new ChildrenRef();

						children=child.children[c];
						if(children.nodeName=="componentref")
						{

							this.idC= this.reader.getString(children, 'id');
							//console.log("Component: "+this.idC+"\n");

							childsref.id = this.idC;
							childsref.primitive = null;
						}
						if(children.nodeName=="primitiveref")
						{

							this.idP= this.reader.getString(children, 'id');
							//console.log("Primitive: "+this.idP+"\n");
							//procurar primitive e cria-la

							var primitive_aux = this.getPrimitive(this.idP);
							childsref.id = null;
							childsref.primitive = primitive_aux;
						}
					childrens_obj.children_list.push(childsref);
				}
				component_obj.children=childrens_obj;
			}

			//chegou aqui, ja passou por todos os childrens de component

			//Depois de carregar todos os components, adicionar junto aos outros na lista

		}

		this.components_obj.components_list.push(component_obj);
	}




	//teste
	console.log("\n\n\n\n\n teste-------------");
	for(var g = 0; g <this.components_obj.components_list.length ; g++)
	{
		console.log(this.components_obj.components_list[g].id);
	}

	//graph.components=components_obj;


}


///////////
MySceneGraph.prototype.getPrimitive = function(primitiveID)
{
	var primref;
	for (var i = 0; i < this.primitives_obj.primitives_list.length; i++)
	{
		if(primitiveID == this.primitives_obj.primitives_list[i].id)
		{
			primref =this.primitives_obj.primitives_list[i].primitiveref;
			break;
		}
	}

var tempr;

	if(primref instanceof Rectangle)
	{
		tempr = new MyRectangle(this.scene, 1, 20, 20);
		return tempr;
	}



};



/////////////////
///////////
////////////////

/*
//TODO temporario e teste
MySceneGraph.prototype.displayScene = function()
{
	//com o root
	console.log("\n\n\n DRAW DRAW DRAWTESTE TESTE TESTE");
		console.log(this.components_obj.components_list[0].id);

	this.displayComponents(this.components_obj.components_list[0].id);

}


//1º chamada com o component root
MySceneGraph.prototype.displayComponents = function(component_name)
{
	//console.log("\n\n TESTE DRAW  " + component.children.children_list[0].id);

	//procura e seleciona o component a desenhar no momento
	var tempComponent;
	for (var ind = 0; ind < this.components_obj.components_list.length; ind++)
	{
		tempComponent = this.components_obj.components_list[ind];
		if(tempComponent.id == component_name)
			break;
	}


	if(tempComponent.children.children_list.length == 1)
	{
		//console.log(tempComponent.id);
		this.drawPrimitive(tempComponent.children.children_list[0].id);
	}
	else //chega aqui n é poara desenhar ja
	{
		for (var i = 0; i < tempComponent.children.children_list.length; i++)
							this.displayComponents(tempComponent.children.children_list[i].id);
	}



};
//TODO mudar isto para melhorar desempenho
MySceneGraph.prototype.drawPrimitive = function(prim_name)
{
	var primref;
	for (var i = 0; i < this.primitives_obj.primitives_list.length; i++)
	{
		if(prim_name == this.primitives_obj.primitives_list[i].id)
						{
							primref =this.primitives_obj.primitives_list[i].primitiveref;
							break;
						}
	}
if(primref instanceof Rectangle)
	{
		temp = new Sphere(this,1, 20, 20);
		temp.display();
	}




};
*/
//////////////////////
//////////////////////

/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);
	this.loadedOk=false;
};
