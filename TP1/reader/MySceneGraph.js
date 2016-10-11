
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
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
	var view_teste = new Views();
	view_teste.default = this.default;
	//TESTE............................................

	var nnodes = views[0].children.length;
	for(var i = 0; i <nnodes ; i++)
	{
	
		perspective = view.children[i];
		
		this.id = this.reader.getString(perspective, 'id');
		this.near = this.reader.getFloat(perspective, 'near');
		this.far = this.reader.getFloat(perspective, 'far');
		this.angle = this.reader.getFloat(perspective, 'angle');
		
		console.log("VIEWS ........." );
		console.log(this.id + "  " + this.near+ "  " + this.far + "  " + this.angle + "\n");




		from = perspective.children[0];
		this.xF = this.reader.getFloat(from, 'x');
		this.yF = this.reader.getFloat(from, 'y');
		this.zF = this.reader.getFloat(from, 'z');
	
		to = perspective.children[1];
		this.xT = this.reader.getFloat(to, 'x');
		this.yT = this.reader.getFloat(to, 'y');
		this.zT = this.reader.getFloat(to, 'z');

		console.log("From: "+this.xF + "  " + this.yF+ "  " + this.zF + "\nTo: " + this.xT + "  " + this.yT + "  " + this.zT + "  ");

		
		//TESTE____________________________________________
		console.log("\n\n\n ..........Teste.........");

		view_teste.addPerspective_Info(this.id, this.near, this.far, this.angle);
		view_teste.addPerspective_From(this.xF,this.yF,this.zF);
		view_teste.addPerspective_To(this.xT,this.yT,this.zT)

		console.log(view_teste.perspectives_list[0].id);
		console.log(view_teste.perspectives_list[0].near);
		console.log(view_teste.perspectives_list[0].far);
		console.log(view_teste.perspectives_list[0].angle);
		console.log("\n");
		console.log(view_teste.perspectives_list[0].from.x);
		console.log(view_teste.perspectives_list[0].from.y);
		console.log(view_teste.perspectives_list[0].from.z);
		console.log("\n");
		console.log(view_teste.perspectives_list[0].to.x);
		console.log(view_teste.perspectives_list[0].to.y);
		console.log(view_teste.perspectives_list[0].to.z);


		/*console.log(view_teste.perspectives_list[1]);
		console.log(view_teste.perspectives_list[2]);
		console.log(view_teste.perspectives_list[3]);
		console.log("\n");
		console.log(view_teste.perspectives_list[4]);
		console.log(view_teste.perspectives_list[5]);
		console.log(view_teste.perspectives_list[6]);
		console.log("\n");
		console.log(view_teste.perspectives_list[7]);
		console.log(view_teste.perspectives_list[8]);
		console.log(view_teste.perspectives_list[9]);
		*/
		console.log("\n\n----fim fim fim---\n\n\n\n");
		//TESTE............................................

	}
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
	console.log(this.doublesided + "   " + this.local);

	
		ambient = illumination.children[0];
		
		this.rA = this.reader.getFloat(ambient, 'r');
		this.gA = this.reader.getFloat(ambient, 'g');
		this.bA = this.reader.getFloat(ambient, 'b');
		this.aA = this.reader.getFloat(ambient, 'a');
		
		
		background = illumination.children[1];
		
		this.rB = this.reader.getFloat(background, 'r');
		this.gB = this.reader.getFloat(background, 'g');
		this.bB = this.reader.getFloat(background, 'b');
		this.aB = this.reader.getFloat(background, 'a');
		
		console.log(this.rA + "  " + this.gA + "  " + this.bA + "  "+this.aA+"\n");
		console.log(this.rB + "  " + this.gB + "  " + this.bB + "  "+this.aB+"\n\n\n");

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
			console.log("......OMNI.....");
		omni = light.children[i];
		this.id = this.reader.getString(omni, 'id');
		this.enabled = this.reader.getFloat(omni, 'enabled');
		
		console.log(this.id + "  " + this.enabled);
		
		loc = omni.children[0];
		this.x = this.reader.getFloat(loc, 'x');
		this.y = this.reader.getFloat(loc, 'y');
		this.z = this.reader.getFloat(loc, 'z');
		this.w = this.reader.getFloat(loc, 'w');
		console.log(this.x + "  " + this.y + "  " + this.z + "  "+this.w+"\n");
		
		
		ambient = omni.children[1];
		this.rA = this.reader.getFloat(ambient, 'r');
		this.gA = this.reader.getFloat(ambient, 'g');
		this.bA = this.reader.getFloat(ambient, 'b');
		this.aA = this.reader.getFloat(ambient, 'a');
		console.log(this.rA + "  " + this.gA + "  " + this.bA + "  "+this.aA+"\n");
		
		
		diffuse = omni.children[2];
		this.rD = this.reader.getFloat(diffuse, 'r');
		this.gD = this.reader.getFloat(diffuse, 'g');
		this.bD	= this.reader.getFloat(diffuse, 'b');
		this.aD = this.reader.getFloat(diffuse, 'a');
		console.log(this.rD + "  " + this.gD + "  " + this.bD + "  "+this.aD+"\n");
		
		
		specular = omni.children[3];
		this.rS = this.reader.getFloat(specular, 'r');
		this.gS = this.reader.getFloat(specular, 'g');
		this.bS = this.reader.getFloat(specular, 'b');
		this.aS = this.reader.getFloat(specular, 'a');
		console.log(this.rS	+ "  " + this.gS + "  " + this.bS + "  "+this.aS+"\n");
		}
		else
		{
			console.log("......SPOT.....");
		spot = light.children[i];
		this.id = this.reader.getString(spot, 'id');
		this.enabled = this.reader.getFloat(spot, 'enabled');
		this.angle = this.reader.getFloat(spot, 'angle');
		this.exponent = this.reader.getFloat(spot, 'exponent');
		
		console.log(this.id + "  " + this.enabled + "  " +this.angle + "  " + this.exponent);
		
		target = spot.children[0];
		this.xt = this.reader.getFloat(target, 'x');
		this.yt = this.reader.getFloat(target, 'y');
		this.zt = this.reader.getFloat(target, 'z');
		console.log(this.xt + "  " + this.yt + "  " + this.zt + "  "+"\n");
		
		loc = spot.children[1];
		this.x = this.reader.getFloat(loc, 'x');
		this.y = this.reader.getFloat(loc, 'y');
		this.z = this.reader.getFloat(loc, 'z');
		console.log(this.x + "  " + this.y + "  " + this.z + "  "+"\n");
		
		
		ambient = spot.children[2];
		this.rA = this.reader.getFloat(ambient, 'r');
		this.gA = this.reader.getFloat(ambient, 'g');
		this.bA = this.reader.getFloat(ambient, 'b');
		this.aA = this.reader.getFloat(ambient, 'a');
		console.log(this.rA + "  " + this.gA + "  " + this.bA + "  "+this.aA+"\n");
		
		
		diffuse = spot.children[3];
		this.rD = this.reader.getFloat(diffuse, 'r');
		this.gD = this.reader.getFloat(diffuse, 'g');
		this.bD	= this.reader.getFloat(diffuse, 'b');
		this.aD = this.reader.getFloat(diffuse, 'a');
		console.log(this.rD + "  " + this.gD + "  " + this.bD + "  "+this.aD+"\n");
		
		
		specular = spot.children[4];
		this.rS = this.reader.getFloat(specular, 'r');
		this.gS = this.reader.getFloat(specular, 'g');
		this.bS = this.reader.getFloat(specular, 'b');
		this.aS = this.reader.getFloat(specular, 'a');
		console.log(this.rS	+ "  " + this.gS + "  " + this.bS + "  "+this.aS+"\n");
		}

	}
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
		console.log(this.id	+ "  " + this.file + "  " + this.length_s + "  "+this.length_t+"\n");
	}
	
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
		mat = material.children[i];
		this.id = this.reader.getString(mat,'id');
		console.log(this.id);
		
		emission = mat.children[0];
		this.rE = this.reader.getFloat(emission, 'r');
		this.gE = this.reader.getFloat(emission, 'g');
		this.bE = this.reader.getFloat(emission, 'b');
		this.aE = this.reader.getFloat(emission, 'a');
		console.log(this.rE + "  " + this.gE + "  " + this.bE + "  "+this.aE+"\n");
		
		ambient = mat.children[1];
		this.rA = this.reader.getFloat(ambient, 'r');
		this.gA = this.reader.getFloat(ambient, 'g');
		this.bA = this.reader.getFloat(ambient, 'b');
		this.aA = this.reader.getFloat(ambient, 'a');
		console.log(this.rA + "  " + this.gA + "  " + this.bA + "  "+this.aA+"\n");
		
		diffuse = mat.children[2];
		this.rD = this.reader.getFloat(diffuse, 'r');
		this.gD = this.reader.getFloat(diffuse, 'g');
		this.bD	= this.reader.getFloat(diffuse, 'b');
		this.aD = this.reader.getFloat(diffuse, 'a');
		console.log(this.rD + "  " + this.gD + "  " + this.bD + "  "+this.aD+"\n");
		
		specular = mat.children[3];
		this.rS = this.reader.getFloat(specular, 'r');
		this.gS = this.reader.getFloat(specular, 'g');
		this.bS = this.reader.getFloat(specular, 'b');
		this.aS = this.reader.getFloat(specular, 'a');
		console.log(this.rS	+ "  " + this.gS + "  " + this.bS + "  "+this.aS+"\n");
		
		shininess = mat.children[4];
		this.value = this.reader.getFloat(shininess, 'value');
		console.log(this.value);
		
	}
}
	
MySceneGraph.prototype.parseTransformations = function(rootElement)
{
	var transformations = rootElement.getElementsByTagName('transformations');
	
	if (transformations == null  || transformations.length==0){
		return "transformations element is missing.";
	}
	
	var  transformation = transformations[0];
	console.log("Transformations .........");
	
	var nnodes = transformation.children.length;
	for(var i = 0; i <nnodes ; i++)
	{
		transf = transformation.children[i];
		this.id = this.reader.getString(transf,'id');
		console.log(this.id);
		
		
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
		console.log("translate: " +this.xT + "  " + this.yT + "  " + this.zT +"\n");
		}
		else if(child.nodeName == "rotate")
		{
		rotate = transf.children[j];
		this.axis = this.reader.getString(rotate, 'axis');
		this.angle = this.reader.getFloat(rotate, 'angle');
		console.log("rotate: " +this.axis + "  " + this.angle +"\n");
		}
		else if(child.nodeName == "scale")
		{
		scale = transf.children[j];
		this.xS = this.reader.getFloat(scale, 'x');
		this.yS = this.reader.getFloat(scale, 'y');
		this.zS = this.reader.getFloat(scale, 'z');
		console.log("scale: " +this.xS + "  " + this.yS + "  " + this.zS +"\n");
		}
		}
		
		
	}
}
	
	
	
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
		console.log(this.id);
		
		
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
		console.log("rectangle: " +this.x1 + "  " + this.y1 + "  " + this.x2+ "  " + this.y2 +"\n");
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
		console.log("triangle: \n" 
		+"p1: "+ this.x1 + "  " + this.y1 + "  " + this.z1 + "\n" 
		+"p2: "+ this.x2 + "  " + this.y2 + "  " + this.z2+"\n"
		+"p3: "+ this.x3 + "  " + this.y3 + "  " + this.z3
		);
		
		}
		else if(child.nodeName == "cylinder")
		{
		cylinder = prim.children[j];
		this.base = this.reader.getFloat(cylinder, 'base');
		this.top_c = this.reader.getFloat(cylinder, 'top');
		this.height = this.reader.getFloat(cylinder, 'height');
		this.slices = this.reader.getFloat(cylinder, 'slices');
		this.stacks = this.reader.getFloat(cylinder, 'stacks');
		console.log("cylinder: " +this.base + "  " + this.top_c + "  " + this.height + "  "+
		this.slices+"  " + this.stacks +"\n");
		}
		else if(child.nodeName == "sphere")
		{
		sphere = prim.children[j];
		this.radius = this.reader.getFloat(sphere, 'radius');
		this.slices = this.reader.getFloat(sphere, 'slices');
		this.stacks = this.reader.getFloat(sphere, 'stacks');
		console.log("sphere: " +this.radius + "  " + this.slices + "  " + this.stacks +"\n");
		}
		else if(child.nodeName == "torus")
		{
		torus = prim.children[j];
		this.inner = this.reader.getFloat(torus, 'inner');
		this.outer = this.reader.getFloat(torus, 'outer');
		this.slices = this.reader.getFloat(torus, 'slices');
		this.loops = this.reader.getFloat(torus, 'loops');
		console.log("torus: " +this.inner + "  " + this.outer + "  " + this.slices + "  " + this.loops+"\n");
		}
		
		
		
		}
		
		
	}
};
	
MySceneGraph.prototype.parseComponents = function(rootElement)
{
	var components = rootElement.getElementsByTagName('components');
	
	if (components == null  || components.length==0){
		return "components element is missing.";
	}
	
	var  component = components[0];
	console.log("components .........");	
	var nnodes = component.children.length;
	
	for(var i = 0; i <nnodes ; i++)
	{
		comp = component.children[i];
		this.id = this.reader.getString(comp,'id');
		console.log(this.id + "\n");
		//aqui;
		var Nchild = comp.children.length;
		for(var j = 0; j <Nchild ; j++)
		{
			var child= comp.children[j];
			
			
			if(child.nodeName=="transformation") //tranformaçao
			{
				console.log("...Transformation...\n");
				var Ntranf = child.children.length;
				for(var t = 0; t <Ntranf; t++)
				{
					
					transf=child.children[t]
	
					if(transf.nodeName=="transformationref")
					{	
						transformationref = transf
						this.idT = this.reader.getString(transformationref, 'id');
						console.log(this.idT);
					}
					if(transf.nodeName=="translate")
					{
						translate = transf
						this.xT = this.reader.getFloat(translate, 'x');
						this.yT = this.reader.getFloat(translate, 'y');
						this.zT = this.reader.getFloat(translate, 'z');
						console.log("translate: " +this.xT + "  " + this.yT + "  " + this.zT +"\n");
					}
					if(transf.nodeName=="rotate")
					{
						rotate = transf
						this.axis = this.reader.getString(rotate, 'axis');
						this.angle = this.reader.getFloat(rotate, 'angle');
						console.log("rotate: " +this.axis + "  " + this.angle +"\n");
					}
					if(transf.nodeName=="scale")
					{
						scale = transf
						this.xS = this.reader.getFloat(scale, 'x');
						this.yS = this.reader.getFloat(scale, 'y');
						this.zS = this.reader.getFloat(scale, 'z');
						console.log("scale: " +this.xS + "  " + this.yS + "  " + this.zS +"\n");
					}
				}
			}
			if(child.nodeName=="materials") //materiais
			{
				console.log("...Materials...\n");
				var Nmat = child.children.length;
				for(var t = 0; t <Nmat; t++)
				{
					material = child.children[t]
					this.idM= this.reader.getString(material, 'id');
					console.log(this.idM + "\n");
				}
				
			}
			if(child.nodeName=="texture") //texturas
			{
				console.log("...Texture...\n");
				texture= child;
				this.idT= this.reader.getString(texture, 'id');
				console.log(this.idT + "\n");
			}
			if(child.nodeName=="children")  //filhos
			{
				console.log("...Children...\n");
				var Nchild = child.children.length;
				for(var c = 0; c <Nchild; c++)
				{
						children=child.children[c];
						if(children.nodeName=="componentref")
						{
							
							this.idC= this.reader.getString(children, 'id');
							console.log("Component: "+this.idC+"\n");
							
						}
						if(children.nodeName=="primitiveref")
						{
							
							this.idP= this.reader.getString(children, 'id');
							console.log("Primitive: "+this.idP+"\n");
							
						}
						
				}
			}
		}
		
		
	}
}
	
	
	
	
	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


