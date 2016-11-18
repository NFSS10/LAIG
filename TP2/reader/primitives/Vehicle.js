function Vehicle(scene) {
     CGFobject.call(this, scene);

	 this.scene=scene;
	
     this.controlvertexes = [];
	 this.ponto1 = new Ponto3(0,0,0);
	 this.controlvertexes.push(this.ponto1);
	 this.ponto2 = new Ponto3(-0.25,0,-0.5);
	 this.controlvertexes.push(this.ponto2);
	 this.ponto3 = new Ponto3(-0.5,0,-1);
	 this.controlvertexes.push(this.ponto3);
	 
	 this.ponto4 = new Ponto3(0,0,0);
	 this.controlvertexes.push(this.ponto4);
	 this.ponto5 = new Ponto3(0,0.6,-0.5);
	 this.controlvertexes.push(this.ponto5);
	 this.ponto6 = new Ponto3(0,1,-1);
	 this.controlvertexes.push(this.ponto6);
	 
	 this.ponto7 = new Ponto3(0,0,0);
	 this.controlvertexes.push(this.ponto7);
	 this.ponto8 = new Ponto3(0.25,0,-0.5);
	 this.controlvertexes.push(this.ponto8);
	 this.ponto9 = new Ponto3(0.5,0,-1);
	 this.controlvertexes.push(this.ponto9);
	 
	 this.bico= new Patch(this.scene,2,2,20,20,this.controlvertexes);
	 this.cilindro= new MyCylinder(this.scene,0.45,0.8,9,20,20);
     
};

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;

Vehicle.prototype.display = function() {

	this.scene.translate(0,0,5);
	
	this.scene.pushMatrix();
	this.bico.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI, 0, 0, 1);
	this.bico.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate( 0, 0, -10);
	this.cilindro.display();
	this.scene.popMatrix();
	
	
};