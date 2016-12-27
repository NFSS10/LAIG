
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

  this.clock="              0:00";
  this.clockMinutes=0;
  this.clockseconds1=0;
  this.clockseconds2=0;
  this.clockTrueSeconds=0;
  this.clockAux=0;
  this.message = "Prima startGame ";
  this.setUpdatePeriod(30);
  this.lightsGUI = [];
  this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

  this.score="SCORE";

  this.gl.clearDepth(100.0);
  this.gl.enable(this.gl.DEPTH_TEST);
  this.gl.enable(this.gl.CULL_FACE);
  this.gl.depthFunc(this.gl.LEQUAL);

  this.axis=new CGFaxis(this);
  this.maxJogada=30;


  this.luzesEstado;
  this.indice_View1 = 0;
  this.indice_View2 = 1; //Usado para mudar as views atraves da tecla 'V'
  this.indiceMaterial =0; //Usado para mudar os materiais atraves da tecla 'M'


  //....
  this.distanciaFromPercorrida=0;
  this.distanciaToPercorrida=0;
  this.velocidade=0.6;
  this.distanciaFromTotal = 0;
  this.distanciaToTotal = 0;

  this.replay = false;
  this.currReplays = [];
  this.ModoJogo = 1;


  this.jogo = new Otrio(this);


  this.setPickEnabled(true);

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
  //this.lights[0].setVisible(true);
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


    //this.lights[indice].setVisible(true);
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

  this.indice_View1++;
  this.indice_View2++;
  this.distanciaFromPercorrida=0;
  this.distanciaToPercorrida=0;
  this.distanciaFromTotal = 0;
  this.distanciaToTotal = 0;

};


XMLscene.prototype.changeSmoothViews = function (prevPerspective, nextPerspective) {

	this.distanciaFromPercorrida+=this.velocidade;
	this.distanciaToPercorrida+=this.velocidade;


	deltaFromX = prevPerspective.from.x - nextPerspective.from.x;
	deltaFromY = prevPerspective.from.y - nextPerspective.from.y;
	deltaFromZ = prevPerspective.from.z - nextPerspective.from.z;

	deltaToX = prevPerspective.to.x - nextPerspective.to.x;
	deltaToY = prevPerspective.to.y - nextPerspective.to.y;
	deltaToZ = prevPerspective.to.z - nextPerspective.to.z;

	this.distanciaFromTotal = Math.sqrt(deltaFromX*deltaFromX + deltaFromY*deltaFromY + deltaFromZ*deltaFromZ);
	this.distanciaToTotal = Math.sqrt(deltaToX*deltaToX + deltaToY*deltaToY + deltaToZ*deltaToZ);


	if(this.distanciaFromPercorrida > this.distanciaFromTotal)
	{
		return;
	}

	var degToRad= Math.PI / 180.0;



    dfrom = this.distanciaFromPercorrida / this.distanciaFromTotal;
	dto = this.distanciaToPercorrida / this.distanciaToTotal;

    this.currentFromPositionX = (nextPerspective.from.x * dfrom) + ((1 - dfrom) * prevPerspective.from.x);
  	this.currentFromPositionY = (nextPerspective.from.y * dfrom) + ((1 - dfrom) * prevPerspective.from.y);
    this.currentFromPositionZ = (nextPerspective.from.z * dfrom) + ((1 - dfrom) * prevPerspective.from.z);

	this.currentToPositionX = (nextPerspective.to.x * dto) + ((1 - dto) * prevPerspective.to.x);
  	this.currentToPositionY = (nextPerspective.to.y * dto) + ((1 - dto) * prevPerspective.to.y);
    this.currentToPositionZ = (nextPerspective.to.z * dto) + ((1 - dto) * prevPerspective.to.z);

	  this.camera = new CGFcamera(nextPerspective.angle*degToRad
    ,nextPerspective.near
    ,nextPerspective.far
    ,vec3.fromValues(this.currentFromPositionX,
					this.currentFromPositionY,
					this.currentFromPositionZ)
    ,vec3.fromValues(this.currentToPositionX,
					this.currentToPositionY,
					this.currentToPositionZ)
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


XMLscene.prototype.updateClock = function(currTime)
{
	if(this.jogo.modoJogo==1 && this.jogo.start==1)
	{
		this.clockAux+=1/30;


		if(this.clockAux>=1)
		{
			this.clockseconds1++;
			this.clockTrueSeconds++;
			this.clockAux=0;
		}
		if(this.clockseconds1>=10)
		{
			this.clockseconds2++;
			this.clockseconds1=0;
		}
		if(this.clockseconds2>=6)
		{
			this.clockMinutes++;
			this.clockseconds2=0;
		}
		if(this.clockTrueSeconds>=this.maxJogada)
		{
			this.clockAux=0;
			this.clockseconds1=0;
			this.clockseconds2=0;
			this.clockMinutes=0;
			this.clockTrueSeconds=0;
			this.jogo.reset_Seleccoes();
			this.jogo.changePlayer();
		}
		this.clock= "              "+this.clockMinutes+":"+this.clockseconds2+this.clockseconds1;
	}
	else
	{
		this.clock="              0:00";
	}
}

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
 // this.axis.display();

  this.setDefaultAppearance();

  // ---- END Background, camera and axis setup

  // it is important that things depending on the proper loading of the graph
  // only get executed after the graph has loaded correctly.
  // This is one possible way to do it
  if (this.graph.loadedOk)
  {
  	this.logPicking();
  	this.clearPickRegistration();
  	this.graph.pickID=-1;

  	if(this.indice_View1 > this.graph.views_info.perspectives_list.length-1)
  	{
  		this.indice_View1=0;
  	}

  	prevPerspective = this.graph.views_info.perspectives_list[this.indice_View1];

  	if(this.indice_View2>this.graph.views_info.perspectives_list.length-1)
  	{
  		this.indice_View2=0;
  	}
      nextPerspective = this.graph.views_info.perspectives_list[this.indice_View2];
      this.changeSmoothViews(prevPerspective, nextPerspective);
      if(this.jogo.start==1)
      {
      	if(this.jogo.playerTurn==1)
      	this.message= "Player 1 a jogar."
      	else
      	this.message= "Player 2 a jogar."
      }
  	this.score="        P1: "+this.jogo.player1Wins+" - "+this.jogo.player2Wins+" :P2";



  	this.updateLuzes();
      this.graph.displayScene();
  }

  //this.plane.display();

};

XMLscene.prototype.logPicking = function ()
{

	if (this.pickMode == false)
		{
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];

          //Seleciona o objecto
          console.log("Picked object: " + obj + ", with pick id " + customId);

          this.playerAction(customId)


				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}
	}
}

XMLscene.prototype.playerAction = function (selObjId)
{
  var changecambool = this.jogo.select_Obj(selObjId);
  //if(changecambool)
    //this.changeViews();

  this.jogo.fazJogada();


}



XMLscene.prototype.replayMoves = function()
{
    this.replay = true;
    //Limpa
    for(var i=0; i<this.graph.components_info.components_list.length; i++)
      this.graph.components_info.components_list[i].fullAnimation=null;


      //Passar por todos os components que foram jogados e meter a animacao de novo
      for (var k = 0; k < this.jogo.gameStates.length; k++)
      {
        this.currReplays.push(this.jogo.gameStates[k].movedPiece);

        for(var j=0; j<this.graph.components_info.components_list.length; j++)
        {
          if(this.jogo.gameStates[k].movedPiece == this.graph.components_info.components_list[j].replayID)
          {
            var pontosControlo= [];
            ponto1= new Ponto3(0,0,0);
            ponto2= new Ponto3(0,5,0);
            ponto3= new Ponto3(this.jogo.posIniciais[this.jogo.gameStates[k].movedPlace][0]-this.jogo.posIniciais[this.jogo.gameStates[k].movedPiece][0],5,this.jogo.posIniciais[this.jogo.gameStates[k].movedPlace][2]-this.jogo.posIniciais[this.jogo.gameStates[k].movedPiece][2]);
            ponto4= new Ponto3(this.jogo.posIniciais[this.jogo.gameStates[k].movedPlace][0]-this.jogo.posIniciais[this.jogo.gameStates[k].movedPiece][0],0,this.jogo.posIniciais[this.jogo.gameStates[k].movedPlace][2]-this.jogo.posIniciais[this.jogo.gameStates[k].movedPiece][2]);

            pontosControlo.push(ponto1);
            pontosControlo.push(ponto2);
            pontosControlo.push(ponto3);
            pontosControlo.push(ponto4);

            animation= new LinearAnimation("Lanimation",2,pontosControlo, this.jogo.gameStates[k].movedPiece);

            this.graph.components_info.components_list[j].animations.push(animation);
            this.graph.components_info.components_list[j].fullAnimation= new FullAnimation(this.graph.components_info.components_list[j].animations);
          }
        }
      }
}


XMLscene.prototype.undoMove = function()
{
  console.log("\n\n\n\n\n\n UNDO");
	this.jogo.undoMove();
}

XMLscene.prototype.quit = function()
{
  console.log("\n\n\n\n\n QUIT");
  this.jogo.quit();
}

XMLscene.prototype.changeVisual = function()
{
  this.graph.changed=0;
}


XMLscene.prototype.startGame = function()
{
  console.log("\n\n\n\n\n\n startGame");
  this.jogo.startGame();

}


XMLscene.prototype.update = function(currTime) {

  if (this.graph.loadedOk)
  {

    if(this.currReplays.length == 0 || this.currReplays == null)
        this.replay = false;

    for(var i =0; i< this.graph.components_info.components_list.length; i++)
    {
      if(this.graph.components_info.components_list[i].fullAnimation!=null)
      {
         for( var v=0; v < this.graph.components_info.components_list[i].fullAnimation.animations.length; v++)
          {
          //Replay, jogadas ao mesmo tempo
    /*Comentar*/if(!this.replay)
                this.graph.components_info.components_list[i].fullAnimation.animations[v].update(currTime);
              /*Comentar daqui...*/
              else
              {
                if(this.graph.components_info.components_list[i].fullAnimation.animations[v].acabou == 0 && this.currReplays != null && this.graph.components_info.components_list[i].fullAnimation.animations[v].idReplay != null)
                   if(this.graph.components_info.components_list[i].fullAnimation.animations[v].idReplay == this.currReplays[0])
                   {
                     this.graph.components_info.components_list[i].fullAnimation.animations[v].update(currTime);

                     if(this.graph.components_info.components_list[i].fullAnimation.animations[v].acabou == 1)
                      this.currReplays.shift();
                    }
              }
              /*... ate aqui*/


          }

      }
    }
  }


	this.updateClock(currTime);

}
