function Vehicle(scene) {
     CGFobject.call(this, scene);

	 this.scene=scene;
	 
	this.texParaquedas =new CGFappearance(this.scene);
	this.texParaquedas.setDiffuse(0.9,0.9,0.9,1);
	this.texParaquedas.setSpecular(0.7,0.7,0.7,1);
	this.texParaquedas.setShininess(10);
	this.texParaquedas.loadTexture("./textures//paraquedasTex.jpg");
	
	this.texCabo =new CGFappearance(this.scene);
	this.texCabo.setDiffuse(0.9,0.9,0.9,1);
	this.texCabo.setSpecular(0.1,0.1,0.1,1);
	this.texCabo.setShininess(10);
	this.texCabo.loadTexture("./textures//caboTex.jpg");
	
	
	this.texMotor =new CGFappearance(this.scene);
	this.texMotor.setDiffuse(0.4,0.4,0.4,1);
	this.texMotor.setSpecular(0.9,0.9,0.9,1);
	this.texMotor.setShininess(10);
	this.texMotor.loadTexture("./textures//motortex.jpg");
	
     this.controlvertexes = [];
	 
	 this.ponto1 = new Ponto3(15,5,0);
	 this.controlvertexes.push(this.ponto1);
	 this.ponto2 = new Ponto3(5,20,-5);
	 this.controlvertexes.push(this.ponto2);
	 this.ponto3 = new Ponto3(5,40,-5);
	 this.controlvertexes.push(this.ponto3);
	 this.ponto4 = new Ponto3(15,55,0);
	 this.controlvertexes.push(this.ponto4);
	 
	 this.ponto5 = new Ponto3(15,5,0);
	 this.controlvertexes.push(this.ponto5);
	 this.ponto6 = new Ponto3(10,20,15);
	 this.controlvertexes.push(this.ponto6);
	 this.ponto7 = new Ponto3(10,40,15);
	 this.controlvertexes.push(this.ponto7);
	 this.ponto8 = new Ponto3(15,55,0);
	 this.controlvertexes.push(this.ponto8);
	 
	 this.ponto6 = new Ponto3(20,5,0);
	 this.controlvertexes.push(this.ponto6);
	 this.ponto7 = new Ponto3(25,20,15);
	 this.controlvertexes.push(this.ponto7);
	 this.ponto8 = new Ponto3(25,40,15);
	 this.controlvertexes.push(this.ponto8);
	 this.ponto9 = new Ponto3(20,55,0);
	  this.controlvertexes.push(this.ponto9);
	 
	 this.ponto10 = new Ponto3(20,5,0);
	 this.controlvertexes.push(this.ponto10);
	 this.ponto11 = new Ponto3(30,20,4);
	 this.controlvertexes.push(this.ponto11);
	 this.ponto12 = new Ponto3(30,40,4);
	 this.controlvertexes.push(this.ponto12);
	 this.ponto13 = new Ponto3(20,55,0);
	 this.controlvertexes.push(this.ponto13);
	 
	 this.paraquedas= new Patch(this.scene,3,3,20,20,this.controlvertexes);
	 this.cabo= new MyCylinder(this.scene,0.01,0.01,2.75,20,20);
	 this.cilindro= new MyCylinder(this.scene,1,1,1,30,30);
	 this.paraquedista = new MyParaquedista(this.scene);
     
};

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;

Vehicle.prototype.display = function() {

	
	
	this.scene.pushMatrix();
	this.scene.translate(-1.75,3,3);
	this.scene.rotate(-90*(Math.PI / 180.0),1,0,0);
	this.scene.scale(0.1,0.1,0.1);
	this.texParaquedas.apply();
	this.paraquedas.display();
	this.scene.popMatrix();
	
	

	this.scene.pushMatrix();
	this.scene.translate(0, 0.9, 0.7);
	this.scene.rotate(-50*(Math.PI / 180.0),1,0,0);
	this.scene.rotate(-5*(Math.PI / 180.0),0,1,0);
	this.texCabo.apply();
	this.cabo.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(0, 0.9, 0.7);
	this.scene.rotate(-50*(Math.PI / 180.0),1,0,0);
	this.scene.rotate(5*(Math.PI / 180.0),0,1,0);
	this.cabo.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(0.25, 3, -2.45);
	this.scene.rotate(50*(Math.PI / 180.0),1,0,0);
	this.scene.rotate(-5*(Math.PI / 180.0),0,1,0);
	this.texCabo.apply();
	this.cabo.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(-0.25, 3, -2.45);
	this.scene.rotate(50*(Math.PI / 180.0),1,0,0);
	this.scene.rotate(5*(Math.PI / 180.0),0,1,0);
	this.texCabo.apply();
	this.cabo.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(0.05,0.47,0);
	this.scene.rotate(-90*(Math.PI / 180.0),0,1,0);
	this.scene.scale(0.83,0.83,0.5);
	this.texMotor.apply();
	this.cilindro.display();
	this.scene.popMatrix();
	
	
	this.scene.pushMatrix();
	this.scene.translate(1,0,0);
	this.paraquedista.display();
	this.scene.popMatrix();

	
};