
function XMLscene() {
  CGFscene.call(this);
}


XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
  CGFscene.prototype.init.call(this, application);

  this.enableTextures(true);

  this.initCameras();

  this.initLights();

  this.gl.clearColor(0.0, 0.0, 0.0, 1.0);



  this.gl.clearDepth(100.0);
  this.gl.enable(this.gl.DEPTH_TEST);
  this.gl.enable(this.gl.CULL_FACE);
  this.gl.depthFunc(this.gl.LEQUAL);

  this.axis=new CGFaxis(this);

  this.luzesEstado;
  this.indice_View = 0; //Usado para mudar as views atraves da tecla 'V'
  this.indiceMaterial =0; //Usado para mudar os materiais atraves da tecla 'M'

  this.text = new CGFappearance(this);
  this.text.loadTexture("./textures/rockettex.jpg");
  this.setUpdatePeriod(30);
  this.pontos=[];
  ponto1= new Ponto3(0,0,0);
  this.pontos.push(ponto1);
  ponto2= new Ponto3(0,1,0);
  this.pontos.push(ponto2);
  ponto3= new Ponto3(0,2,0);
  this.pontos.push(ponto3);
  ponto4= new Ponto3(2,0,0);
  this.pontos.push(ponto4);
  ponto5= new Ponto3(2,1,2);
  this.pontos.push(ponto5);
  ponto6= new Ponto3(2,2,0);
  this.pontos.push(ponto6);

  this.plane = new Vehicle(this);
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
  this.gl.clearColor(this.graph.illumination_info.background.r,this.graph.illumination_info.background.g,this.graph.illumination_info.background.b,this.graph.illumination_info.background.a);
  this.setGlobalAmbientLight(this.graph.illumination_info.ambient.r,this.graph.illumination_info.ambient.g,this.graph.illumination_info.ambient.b,this.graph.illumination_info.ambient.a);
  this.lights[0].setVisible(true);
  this.lights[0].enable();

  //Liga as luzes que carregou
  this.init_All_Lights();

};

/** Inicia todas as luzes da cena */
XMLscene.prototype.init_All_Lights = function ()
{
  var indice = 0;

  var n_omni = this.graph.lights_info.omni_list.length;
  var n_spot = this.graph.lights_info.spot_list.length;

  this.luzesEstado = new Array(n_omni+n_spot);

  for (var i=0; i< n_omni ; i++ , indice++)
  {
    var light =  this.graph.lights_info.omni_list[i];

    this.lights[indice].setPosition(light.locationo.x,light.locationo.y,light.locationo.z,light.locationo.w);
    this.lights[indice].setAmbient(light.ambient.r,light.ambient.g,light.ambient.b,light.ambient.a);
    this.lights[indice].setDiffuse(light.diffuse.r,light.diffuse.g,light.diffuse.b,light.diffuse.a);
    this.lights[indice].setSpecular(light.specular.r,light.specular.g,light.specular.b,light.specular.a);

    if(light.enabled==1)
    {
      this.luzesEstado[indice]= true;
      this.lights[indice].enable();
    }
    else
    {
      this.luzesEstado[indice]= false;
      this.lights[indice].disable();
    }
    this.interface.addLightInterface(light.id,this.luzesEstado[indice],indice); //Adiciona à gui


    this.lights[indice].setVisible(true);
    this.lights[indice].update();

  }

  for (var i=0; i< n_spot ; i++ , indice++)
  {
    var light = this.graph.lights_info.spot_list[i];

    var spotDirectionx= light.target.x-light.locations.x;
    var spotDirectiony= light.target.y-light.locations.y;
    var spotDirectionz= light.target.z-light.locations.z;


    this.lights[indice].setSpotExponent(light.exponent);

    this.lights[indice].setPosition(light.locations.x,light.locations.y,light.locations.z);
    this.lights[indice].setSpotDirection(spotDirectionx,spotDirectiony,spotDirectionz);
    this.lights[indice].setAmbient(light.ambient.r,light.ambient.g,light.ambient.b,light.ambient.a);
    this.lights[indice].setDiffuse(light.diffuse.r,light.diffuse.g,light.diffuse.b,light.diffuse.a);
    this.lights[indice].setSpecular(light.specular.r,light.specular.g,light.specular.b,light.specular.a);
	this.lights[indice].setSpotCutOff((Math.PI / 180.0)*light.angle);


    if(light.enabled==1)
    {
      this.luzesEstado[indice]= true;
      this.lights[indice].enable();
    }
    else
    {
      this.luzesEstado[indice]= false;
      this.lights[indice].disable();
    }

    this.interface.addLightInterface(light.id,this.luzesEstado[indice],indice);

    this.lights[indice].setVisible(true);
    this.lights[indice].update();

  }


};


/** Verifica os estados das luzes e atualiza-as*/
XMLscene.prototype.updateLuzes = function ()
{
  for (var i=0; i<this.luzesEstado.length; i++)
  {
    if(this.luzesEstado[i]==true)
      this.lights[i].enable();
    else
      this.lights[i].disable();
  }

  for (var i = 0; i<this.lights.length;i++)
    this.lights[i].update();
};


/** Chamada quando se pressiona a tecla "V"
Muda de view
*/
XMLscene.prototype.changeViews = function () {
  //Passa a primeira view
  this.indice_View++;

  //Volta à primeira view
  if(this.indice_View >= this.graph.views_info.perspectives_list.length)
  this.indice_View = 0;

  var perspectiveTemp = this.graph.views_info.perspectives_list[this.indice_View];
  var degToRad= Math.PI / 180.0;

  this.camera = new CGFcamera(perspectiveTemp.angle*degToRad
    ,perspectiveTemp.near
    ,perspectiveTemp.far
    ,vec3.fromValues(perspectiveTemp.from.x,perspectiveTemp.from.y,perspectiveTemp.from.z)
    ,vec3.fromValues(perspectiveTemp.to.x,perspectiveTemp.to.y,perspectiveTemp.to.z)
  );

  this.interface.setActiveCamera(this.camera);
};

/** Chamada quando se pressiona a tecla "M"
Muda de material
*/
XMLscene.prototype.updateMaterial = function () {
  //Passa o primeiro material
  this.indiceMaterial++;

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

  //this.plane.display();

};

XMLscene.prototype.update = function(currTime) {
  if (this.graph.loadedOk)
  {
    for(var i =0; i< this.graph.components_info.components_list.length; i++)
    {
      if(this.graph.components_info.components_list[i].fullAnimation!=null)
      {
         for( var v=0; v < this.graph.components_info.components_list[i].fullAnimation.animations.length; v++)
          {
           this.graph.components_info.components_list[i].fullAnimation.animations[v].update(currTime);
          }
        
      }
    }
  }
   
}
