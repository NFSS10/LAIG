/**
 * MyInterface
 * @constructor
 */


function MyInterface() {
	//call CGFinterface constructor
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui

	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); };
	// add a group of controls (and open/expand by defult)



	this.gui.add(this.scene,'score').listen();
	this.gui.add(this.scene,'clock').listen();
	this.gui.add(this.scene,'message').listen();
	this.gui.add(this.scene, 'ModoJogo', {'PvP':1,'PvC':2,'CvC':3});
	this.gui.add(this.scene, 'startGame');
	this.group=this.gui.addFolder("Luzes");
	this.gui.add(this.scene, 'undoMove');
	this.gui.add(this.scene, 'quit');

	this.group.open();


	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.addLightInterface = function(id,luzEstado,indice)
{


	this.group.add(this.scene.luzesEstado,indice,luzEstado).name(id);


}


MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);

	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars

	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp

	//MUDEI ESTA FUNCAO TAMBEM
	switch (event.keyCode)
	{
		case(86):
			this.scene.changeViews();
			break;
		case(118):
			this.scene.changeViews();
			break;
		case(77):
			this.scene.updateMaterial(10);
			break;
		case(109):
			this.scene.updateMaterial(10);
			break;
	};
};
