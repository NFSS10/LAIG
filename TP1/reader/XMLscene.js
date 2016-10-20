
function XMLscene() {
    CGFscene.call(this);
}


XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);



    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	   this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.axis=new CGFaxis(this);

	this.luzesEstado;
  this.indice_View = 0;
};

XMLscene.prototype.setInterface = function (inter) {
this.interface=inter;
}

XMLscene.prototype.initLights = function () {

	this.lights[0].setPosition(2, 3, 3, 1);
    this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    this.lights[0].update();

};

XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
};

// Handler called when the graph is finally loaded.
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function ()
{
	this.gl.clearColor(this.graph.illumination_teste.background.r,this.graph.illumination_teste.background.g,this.graph.illumination_teste.background.b,this.graph.illumination_teste.background.a);
	this.setGlobalAmbientLight(this.graph.illumination_teste.ambient.r,this.graph.illumination_teste.ambient.g,this.graph.illumination_teste.ambient.b,this.graph.illumination_teste.ambient.a);
	this.lights[0].setVisible(true);
    this.lights[0].enable();

	//Liga as luzes que carregou
	this.init_All_Lights();

};

XMLscene.prototype.init_All_Lights = function ()
{
	var indice = 0;

	var n_omni = this.graph.lights_teste.omni_list.length;
	var n_spot = this.graph.lights_teste.spot_list.length;

	this.luzesEstado = new Array(n_omni+n_spot);

	for (var i=0; i< n_omni ; i++ , indice++)
	{
		var light =  this.graph.lights_teste.omni_list[i];

		this.lights[indice].setPosition(light.locationo.x,light.locationo.y,light.locationo.z,light.locationo.w);
		this.lights[indice].setAmbient(light.ambient.r,light.ambient.g,light.ambient.b,light.ambient.a);
		this.lights[indice].setDiffuse(light.diffuse.r,light.diffuse.g,light.diffuse.b,light.diffuse.a);
		this.lights[indice].setSpecular(light.specular.r,light.specular.g,light.specular.b,light.specular.a);

		if(light.enabled==1)
		{

		this.luzesEstado[indice]= true;
		}
		else
		{
		this.luzesEstado[indice]= false;
		}

		this.interface.addLightInterface(light.id,this.luzesEstado[indice],indice);

		if(light.enabled==1)
		{
			this.lights[indice].enable();
		}
		else
		{
			this.lights[indice].disable();
		}

		this.lights[indice].setVisible(true);
		this.lights[indice].update();

	}

	for (var i=0; i< n_spot ; i++ , indice++)
	{
		var light = this.graph.lights_teste.spot_list[i];
		//todo calcular direçao
		var spotDirectionx= light.locations.x-light.target.x;
		var spotDirectiony= light.locations.y-light.target.y;
		var spotDirectionz= light.locations.z-light.target.z;


		this.lights[indice].setSpotExponent(light.exponent);
		//TODO compor isto;
		this.lights[indice].setPosition(light.locations.x,light.locations.y,light.locations.z);
		this.lights[indice].setSpotDirection(spotDirectionx,spotDirectiony,spotDirectionz);
		this.lights[indice].setAmbient(light.ambient.r,light.ambient.g,light.ambient.b,light.ambient.a);
		this.lights[indice].setDiffuse(light.diffuse.r,light.diffuse.g,light.diffuse.b,light.diffuse.a);
		this.lights[indice].setSpecular(light.specular.r,light.specular.g,light.specular.b,light.specular.a);

		if(light.enabled==1)
		{

		this.luzesEstado[indice]= true;
		}
		else
		{
		this.luzesEstado[indice]= false;
		}

		if(light.enabled==1)
		{
			this.lights[indice].enable();
		}
		else
		{
			this.lights[indice].disable();
		}

		this.interface.addLightInterface(light.id,this.luzesEstado[indice],indice);

		this.lights[indice].setVisible(true);
		this.lights[indice].update();

	}


};

XMLscene.prototype.updateLuzes = function ()
{
	for (var i=0; i<this.luzesEstado.length; i++)
	{
		if(this.luzesEstado[i]==true)
		{
			this.lights[i].enable();
		}
		else
		{
			this.lights[i].disable();
		}
	}

	for (var i = 0; i<this.lights.length;i++)
	{
		this.lights[i].update();
	}
};

XMLscene.prototype.changeViews = function () {
  //Passa a primeira view
  this.indice_View++;

  //Volta à primeira view
  if(this.indice_View >= this.graph.view_teste.perspectives_list.length)
    this.indice_View = 0;

  var perspectiveTemp = this.graph.view_teste.perspectives_list[this.indice_View];
  var degToRad= Math.PI / 180.0;

    this.camera = new CGFcamera(perspectiveTemp.angle*degToRad
                                ,perspectiveTemp.near
                                ,perspectiveTemp.far
                                ,vec3.fromValues(perspectiveTemp.from.x,perspectiveTemp.from.y,perspectiveTemp.from.z)
                                ,vec3.fromValues(perspectiveTemp.to.x,perspectiveTemp.to.y,perspectiveTemp.to.z)
                                );

    this.interface.setActiveCamera(this.camera);
};

XMLscene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Draw axis
	this.axis.display();

	this.setDefaultAppearance();

	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.graph.loadedOk)
	{
		this.updateLuzes();
    this.graph.displayScene();
	};

};
