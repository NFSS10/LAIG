
function MySceneGraph(filename, scene) {
	this.loadedOk = null;

	// Establish bidirectional references between scene and graph
	this.scene = scene;
	this.scene.graph=this;


	//construtores
	this.scene_info=new Scene();
	this.views_info = new Views();
	this.illumination_info = new Illumination();
	this.lights_info= new Lights();
	this.textures_info = new Textures();
	this.materials_info= new Materials();
	this.transformations_info = new Transformations();
	this.primitives_info = new Primitives();
	this.components_info = new Components();

	//graus para radianos
	this.degToRad= Math.PI / 180.0;

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
	}*/

	//Scene
	var sceneError = this.parseScene(rootElement);
	if (sceneError != null) {
		this.onXMLError(sceneError);
		return;
	}

	//Views
	var viewsError = this.parseViews(rootElement);
	if (viewsError != null) {
		this.onXMLError(viewsError);
		return;
	}

	//Illumination
	var illuminationError = this.parseIllumination(rootElement);
	if (illuminationError != null) {
		this.onXMLError(illuminationError);
		return;
	}

	//Lights
	var lightError = this.parseLights(rootElement);
	if (lightError != null) {
		this.onXMLError(lightError);
		return;
	}

	//Textures
	var texturesError = this.parseTextures(rootElement);
	if (texturesError != null) {
		this.onXMLError(texturesError);
		return;
	}

	//Materials
	var materialsError = this.parseMaterials(rootElement);
	if (materialsError != null) {
		this.onXMLError(materialsError);
		return;
	}

	//Transformations
	var transformationsError = this.parseTransformations(rootElement);
	if (transformationsError != null) {
		this.onXMLError(transformationsError);
		return;
	}

	//Primitives
	var primitivesError = this.parsePrimitives(rootElement);
	if (primitivesError != null) {
		this.onXMLError(primitivesError);
		return;
	}

	//Components
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

/** Carrega a informação de "Scene" do ficheiro*/
MySceneGraph.prototype.parseScene= function(rootElement) {

	var sceneElements =  rootElement.getElementsByTagName('scene');
	if (sceneElements == null || sceneElements.length==0){
		return "scene element is missing.";
	}

	if (sceneElements.length != 1) {
		return "either zero or more than one 'scene' element found.";
	}

	var scene = sceneElements[0];

	this.scene_info.root = this.reader.getString(scene, 'root');
	this.scene_info.axis_lengh = this.reader.getFloat(scene, 'axis_length');

	console.log("SCENE ........." );
	console.log("root = " + this.root + ", axis length = " + this.axis_length);

};


/** Carrega a informação de "Views" do ficheiro*/
MySceneGraph.prototype.parseViews = function(rootElement)
{
	var views = rootElement.getElementsByTagName('views');

	if (views == null  || views.length==0){
		return "views element is missing.";
	}

	var view = views[0];

	this.views_info.add_default(this.reader.getString(view, 'default'));

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

		this.views_info.add_perspective(perspec);
	}
};

/** Carrega a informação de "Illumination" do ficheiro*/
MySceneGraph.prototype.parseIllumination = function(rootElement)
{
	var illuminations = rootElement.getElementsByTagName('illumination');

	if (illuminations == null  || illuminations.length==0){
		return "illumination element is missing.";
	}

	var  illumination = illuminations[0];
	this.illumination_info.doublesided = this.reader.getFloat(illumination, 'doublesided');
	this.illumination_info.local = this.reader.getFloat(illumination, 'local');

	console.log("Illuminations .........");
	console.log(this.illumination_info.doublesided + "   " + this.illumination_info.local);


	ambient = illumination.children[0];
	this.rA = this.reader.getFloat(ambient, 'r');
	this.gA = this.reader.getFloat(ambient, 'g');
	this.bA = this.reader.getFloat(ambient, 'b');
	this.aA = this.reader.getFloat(ambient, 'a');
	this.illumination_info.add_Ambient(this.rA,this.gA,this.bA,this.aA);

	background = illumination.children[1];
	this.rB = this.reader.getFloat(background, 'r');
	this.gB = this.reader.getFloat(background, 'g');
	this.bB = this.reader.getFloat(background, 'b');
	this.aB = this.reader.getFloat(background, 'a');
	this.illumination_info.add_Background(this.rB,this.gB,this.bB,this.aB);

	console.log(this.illumination_info.ambient.r + "  " + this.illumination_info.ambient.g + "  " + this.illumination_info.ambient.b + "  "+ this.illumination_info.ambient.a+"\n");
	console.log(this.illumination_info.background.r + "  " + this.illumination_info.background.g + "  " + this.illumination_info.background.b + "  "+ this.illumination_info.background.a+"\n\n\n");

};

/** Carrega a informação de "Lights" do ficheiro*/
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

			this.lights_info.add_omni(omni_light);
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
			this.lights_info.add_spot(spot_light);
		}
	}

};

/** Carrega a informação de "Textures" do ficheiro*/
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
		realTexture = new CGFtexture(this.scene, this.file, this.length_s,this.length_t);
		this.textures_info.addTexture(this.id,this.file,this.length_s,this.length_t,realTexture);
		console.log(this.textures_info.textures[i].id	+ "  " + this.textures_info.textures[i].file + "  " + this.textures_info.textures[i].length_s + "  "+this.textures_info.textures[i].length_t+"\n");
	}
};

/** Carrega a informação de "Materials" do ficheiro*/
MySceneGraph.prototype.parseMaterials = function(rootElement)
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
		var materialappearance = new CGFappearance(this.scene);
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
		materialappearance.setEmission(this.rE, this.gE, this.bE, this.aE);

		ambient = mat.children[1];
		this.rA = this.reader.getFloat(ambient, 'r');
		this.gA = this.reader.getFloat(ambient, 'g');
		this.bA = this.reader.getFloat(ambient, 'b');
		this.aA = this.reader.getFloat(ambient, 'a');
		matrial.add_ambient(this.rA,this.gA,this.bA,this.aA);
		console.log(matrial.ambient.r + "  " + matrial.ambient.g + "  " + matrial.ambient.b + "  "+ matrial.ambient.a+"\n");
		materialappearance.setAmbient(this.rA, this.gA, this.bA, this.aA);

		diffuse = mat.children[2];
		this.rD = this.reader.getFloat(diffuse, 'r');
		this.gD = this.reader.getFloat(diffuse, 'g');
		this.bD	= this.reader.getFloat(diffuse, 'b');
		this.aD = this.reader.getFloat(diffuse, 'a');
		matrial.add_diffuse(this.rD,this.gD,this.bD,this.aD);
		console.log(matrial.diffuse.r + "  " +matrial.diffuse.g + "  " + matrial.diffuse.b + "  "+matrial.diffuse.a +"\n");
		materialappearance.setDiffuse(this.rD, this.gD, this.bD, this.aD);

		specular = mat.children[3];
		this.rS = this.reader.getFloat(specular, 'r');
		this.gS = this.reader.getFloat(specular, 'g');
		this.bS = this.reader.getFloat(specular, 'b');
		this.aS = this.reader.getFloat(specular, 'a');
		matrial.add_specular(this.rS,this.gS,this.bS,this.aS);
		console.log(matrial.specular.r	+ "  " + matrial.specular.g + "  " + matrial.specular.b + "  "+ matrial.specular.a +"\n");
		materialappearance.setSpecular(this.rS, this.gS, this.bS, this.aS);

		shininess = mat.children[4];
		this.value = this.reader.getFloat(shininess, 'value');
		matrial.add_shininess(this.value);
		console.log(matrial.shininess);
		materialappearance.setShininess(this.value);


		matrial.realMaterial= materialappearance;
		this.materials_info.add_material(matrial);
	}
};

/** Carrega a informação de "Transformations" do ficheiro*/
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
		var matrix = mat4.create();

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

				//criar matriz
				var  translate_xyz = [];
				translate_xyz[0]= this.xT;
				translate_xyz[1]= this.yT;
				translate_xyz[2]= this.zT;

				mat4.translate(matrix, matrix, translate_xyz);
			}
			else if(child.nodeName == "rotate")
			{
				rotate = transf.children[j];
				this.axis = this.reader.getString(rotate, 'axis');
				this.angle = this.reader.getFloat(rotate, 'angle');
				transform.add_rotate(this.axis,this.angle);
				console.log("rotate: " + transform.rotate[rotates].axis + "  " +  transform.rotate[rotates].angle +"\n");
				rotates++;

				//criar matriz
				var rotation_array= null;
				if(this.axis=="x")
					rotation_array=[1,0,0];
				else if(this.axis=="y")
					rotation_array=[0,1,0];
				else if(this.axis=="z")
					rotation_array=[0,0,1];

				mat4.rotate(matrix,matrix,this.angle*this.degToRad,rotation_array);
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

				//criar matrix
				var  scale_xyz = [];
				scale_xyz[0]= this.xS;
				scale_xyz[1]= this.yS;
				scale_xyz[2]= this.zS;

				mat4.scale(matrix, matrix,scale_xyz);
			}

		}
		transform.realMatrix=matrix;
		this.transformations_info.add_transformation(transform);
		translates=0;
		rotates=0;
		scales=0;
	}
};


/** Carrega a informação de "Primitives" do ficheiro*/
MySceneGraph.prototype.parsePrimitives = function(rootElement)
{
	var primitives = rootElement.getElementsByTagName('primitives');

	if (primitives == null  || primitives.length==0){
		return "primitives element is missing.";
	}

	var  primitive = primitives[0];
	console.log("Primitives .........");

	var nnodes = primitive.children.length;
	for(var i = 0; i <nnodes ; i++)
	{
		prim = primitive.children[i];
		this.id = this.reader.getString(prim,'id');
		//console.log(this.id);
		this.primitives_info.add_Primitive(this.id);


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
				this.primitives_info.primitives_list[i].add_Rectangle(this.x1, this.y1, this.x2, this.y2);

				rectangle_primitive= new MyRectangle(this.scene,this.x1,this.y1,this.x2,this.y2);
				this.primitives_info.primitives_list[i].realPrimitive=rectangle_primitive;

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

				triangle_primitive= new MyTriangle(this.scene,this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, this.x3, this.y3, this.z3);
				this.primitives_info.primitives_list[i].add_Triangle(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, this.x3, this.y3, this.z3);
				this.primitives_info.primitives_list[i].realPrimitive=triangle_primitive;
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
				this.primitives_info.primitives_list[i].add_Cylinder(this.base, this.top, this.height, this.slices, this.stacks);
				cylinder_primitive= new MyCylinder(this.scene, this.base, this.top, this.height, this.slices, this.stacks);
				this.primitives_info.primitives_list[i].realPrimitive=cylinder_primitive;
			}
			else if(child.nodeName == "sphere")
			{
				sphere = prim.children[j];
				this.radius = this.reader.getFloat(sphere, 'radius');
				this.slices = this.reader.getFloat(sphere, 'slices');
				this.stacks = this.reader.getFloat(sphere, 'stacks');
				//console.log("sphere: " +this.radius + "  " + this.slices + "  " + this.stacks +"\n");
				this.primitives_info.primitives_list[i].add_Sphere(this.radius, this.slices, this.stacks);
				sphere_primitive= new MySphere(this.scene, this.radius, this.slices ,this.stacks);
				this.primitives_info.primitives_list[i].realPrimitive=sphere_primitive;
			}
			else if(child.nodeName == "torus")
			{
				torus = prim.children[j];
				this.inner = this.reader.getFloat(torus, 'inner');
				this.outer = this.reader.getFloat(torus, 'outer');
				this.slices = this.reader.getFloat(torus, 'slices');
				this.loops = this.reader.getFloat(torus, 'loops');
				//console.log("torus: " +this.inner + "  " + this.outer + "  " + this.slices + "  " + this.loops+"\n");
				this.primitives_info.primitives_list[i].add_Torus(this.inner, this.outer, this.slices, this.loops);
				torus_primitive= new MyTorus(this.scene, this.inner, this.outer,this.slices,this.loops);
				this.primitives_info.primitives_list[i].realPrimitive=torus_primitive;
			}
		}

	}

	//TESTE PRINT____________________________

	console.log(this.primitives_info.primitives_list.length);

	for(var t = 0; t <this.primitives_info.primitives_list.length ; t++)
	{
		primitive = this.primitives_info.primitives_list[t];
		if(primitive.id == "torus")
			console.log("torus: " + primitive.primitiveref.inner + "  " + primitive.primitiveref.outer + "  " + primitive.primitiveref.slices + "  " + primitive.primitiveref.loops+"\n");
		else if(primitive.id == "sphere")
			console.log("sphere: " +primitive.primitiveref.radius + "  " + primitive.primitiveref.slices + "  " + primitive.primitiveref.stacks +"\n");
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
		}
		else if(primitive.id == "rectangle")
			console.log("rectangle: " +primitive.primitiveref.x1 + "  " + primitive.primitiveref.y1 + "  " + primitive.primitiveref.x2+ "  " + primitive.primitiveref.y2 +"\n");

	}

console.log("\n ENDIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
};

/** Carrega a informação de "Componets" do ficheiro*/
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
				ids=0;
				translates=0;
				rotates=0;
				scales=0;
				transformation_obj = new Transformation_Components();
				var matrix= mat4.create();

				for(var t = 0; t <Ntranf; t++)
				{

					transf=child.children[t]

					if(transf.nodeName=="transformationref")
					{
						transformationref = transf
						this.idT = this.reader.getString(transformationref, 'id');
						transformation_obj.set_id(this.idT);
						console.log("AQUIIIII" +transformation_obj.id[ids] +"\n");
						ids++;

						for(var z=0; z<this.transformations_info.transformations.length;z++)
						{
							if(this.idT==this.transformations_info.transformations[z].id)
								mat4.multiply(matrix,matrix,this.transformations_info.transformations[z].realMatrix);
						}
					}
					if(transf.nodeName=="translate")
					{
						translate = transf
						this.xT = this.reader.getFloat(translate, 'x');
						this.yT = this.reader.getFloat(translate, 'y');
						this.zT = this.reader.getFloat(translate, 'z');
						transformation_obj.add_translate(this.xT,this.yT,this.zT);
						console.log("translate: " +transformation_obj.translate_list[translates].x + "  " + transformation_obj.translate_list[translates].y + "  " + transformation_obj.translate_list[translates].z +"\n");
						translates++;

						//fazer matriz;
						var  translate_xyz = [];
						translate_xyz[0]= this.xT;
						translate_xyz[1]= this.yT;
						translate_xyz[2]= this.zT;

						mat4.translate(matrix, matrix, translate_xyz);
					}
					if(transf.nodeName=="rotate")
					{
						rotate = transf
						this.axis = this.reader.getString(rotate, 'axis');
						this.angle = this.reader.getFloat(rotate, 'angle');
						transformation_obj.add_rotate(this.axis,this.angle);
						console.log("rotate: " +transformation_obj.rotate_list[rotates].axis+ "  " + transformation_obj.rotate_list[rotates].angle +"\n");
						rotates++;

						//fazer matriz;
						var rotation_array= null;
						if(this.axis=="x")
							rotation_array=[1,0,0];
						else if(this.axis=="y")
							rotation_array=[0,1,0];
						else if(this.axis=="z")
							rotation_array=[0,0,1];

						mat4.rotate(matrix,matrix,this.angle*this.degToRad,rotation_array);
					}
					if(transf.nodeName=="scale")
					{
						scale = transf
						this.xS = this.reader.getFloat(scale, 'x');
						this.yS = this.reader.getFloat(scale, 'y');
						this.zS = this.reader.getFloat(scale, 'z');
						transformation_obj.add_scale(this.xS,this.yS,this.zS);
						console.log("scale: " +transformation_obj.scale_list[scales].x+ "  " + transformation_obj.scale_list[scales].y + "  " + transformation_obj.scale_list[scales].z +"\n");

						//fazer matriz

						var  scale_xyz = [];
						scale_xyz[0]= this.xS;
						scale_xyz[1]= this.yS;
						scale_xyz[2]= this.zS;

						mat4.scale(matrix, matrix,scale_xyz);
					}
				}
				transformation_obj.realMatrix=matrix;
				component_obj.transformations=transformation_obj;
			}
			if(child.nodeName=="materials") //materials_info
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

					//descobrir real material

					for(var z=0; z<this.materials_info.materials.length; z++)
					{
						if(this.idM==this.materials_info.materials[z].id)
							material_obj.realMaterial=this.materials_info.materials[z].realMaterial;
					}

					materials_obj.materials_list.push(material_obj);
				}
				component_obj.materials = materials_obj;
			}

			if(child.nodeName=="texture") //texturas
			{
				console.log("...Texture...\n");
				textures_obj = new Texture_Components();

				texture= child;
				this.idT= this.reader.getString(texture, 'id');
				console.log(this.idT + "\n");
				textures_obj.id = this.idT;

				for(var y=0; y< this.textures_info.textures.length; y++)
				{
					if(this.idT==this.textures_info.textures[y].id)
						textures_obj.realTexture=this.textures_info.textures[y].realTexture;
				}
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
						childsref.idC = this.idC;
					}
					if(children.nodeName=="primitiveref")
					{

						this.idP= this.reader.getString(children, 'id');
						console.log("Primitive: "+this.idP+"\n");

						childsref.idP = this.idP;

						for(var z=0; z< this.primitives_info.primitives_list.length;z++)
						{
							if(this.idP==this.primitives_info.primitives_list[z].id)
								childsref.realPrimitive=this.primitives_info.primitives_list[z].realPrimitive;
						}
					}
					childrens_obj.children_list.push(childsref);
				}
				component_obj.children=childrens_obj;
			}
			//chegou aqui, ja passou por todos os childrens de component
			//Depois de carregar todos os components, adicionar junto aos outros na lista
		}
		this.components_info.components_list.push(component_obj);
	}

	//teste___________________
	console.log("\n\n\n\n\n teste-------------");
	for(var g = 0; g <this.components_info.components_list.length ; g++)
		console.log(this.components_info.components_list[g].id);
}


MySceneGraph.prototype.displayScene = function()
{
	var transformations_infoack = new Stack();
	var materialStack = new Stack();
	var textureStack = new Stack();
	var root = this.components_info.components_list[0].id;
	transformations_infoack.push(mat4.create());
	this.displayComponents(root,transformations_infoack,materialStack,textureStack);
}

MySceneGraph.prototype.displayComponents = function(rootElement, transformations_infoack, materialStack, textureStack )
{
	var node;
	for(var i=0 ; i<this.components_info.components_list.length; i++)
	{
		if(this.components_info.components_list[i].id==rootElement)
			node=this.components_info.components_list[i];
	}
	if (node.children.children_list[0].idP!=null)// se a children for primitiva desenha;
	{
		//Transformaçao
		transformation = mat4.create();
		mat4.multiply(transformation,transformations_infoack.top(),node.transformations.realMatrix);
		transformations_infoack.push(transformation);

		//material
		var material_id = node.materials.materials_list[this.scene.indiceMaterial % node.materials.materials_list.length].id;
		if(material_id=="inherit")
			materialStack.push(materialStack.top());
		else
			materialStack.push(node.materials.materials_list[this.scene.indiceMaterial % node.materials.materials_list.length].realMaterial);

		//texturas
		var texture_id= node.texture.id;
		if(texture_id=="inherit")
			textureStack.push(textureStack.top());
		else if(texture_id=="none")
			textureStack.push("none");
		else
			textureStack.push(node.texture.realTexture);

		if(textureStack.top() != "none")
			materialStack.top().setTexture(textureStack.top());

		this.scene.pushMatrix();
		this.scene.multMatrix(transformations_infoack.top());


		materialStack.top().apply();
		node.children.children_list[0].realPrimitive.display();


		this.scene.popMatrix();

		transformations_infoack.pop();
		materialStack.pop()
		textureStack.pop();

	}
	else//component
	{
		//transformacoes
		transformation = mat4.create();
		mat4.multiply(transformation,transformations_infoack.top(),node.transformations.realMatrix);
		transformations_infoack.push(transformation);

		//material
		var material_id = node.materials.materials_list[this.scene.indiceMaterial % node.materials.materials_list.length].id;
		if(material_id=="inherit")
			materialStack.push(materialStack.top());
		else
			materialStack.push(node.materials.materials_list[this.scene.indiceMaterial % node.materials.materials_list.length].realMaterial);

		//texturas
		var texture_id= node.texture.id;
		if(texture_id=="inherit")
			textureStack.push(textureStack.top());
		else if(texture_id=="none")
			textureStack.push("none");
		else
			textureStack.push(node.texture.realTexture);

		//Percorre as children
		for(var i=0; i<node.children.children_list.length; i++)
			this.displayComponents(node.children.children_list[i].idC, transformations_infoack, materialStack, textureStack);

		transformations_infoack.pop();
		materialStack.pop();
		textureStack.pop();
	}
};


/*
* Callback to be executed on any read error
*/

MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);
	this.loadedOk=false;
};
