/**
* MyParaquedista
* @constructor
*/
function MyParaquedista(scene) {
	CGFobject.call(this,scene);

	this.cilindro = new MyCylinder(this.scene,1,1,1,20,20);
	this.tronco = new MyCylinder(this.scene,1.7,1.2,1,20,20);
	this.cabeca = new MySphere(this.scene, 0.3, 30, 30);
	
	this.tex =new CGFappearance(this.scene);
	this.tex.setDiffuse(0.9,0.9,0.9,1);
	this.tex.setSpecular(0.1,0.1,0.1,1);
	this.tex.setShininess(10);
	this.tex.loadTexture("./textures//pretotex.jpg");
	
};

MyParaquedista.prototype = Object.create(CGFobject.prototype);
MyParaquedista.prototype.constructor = MyParaquedista;


MyParaquedista.prototype.display = function()
 {
	 this.tex.apply();
	//cabeca
	this.scene.pushMatrix();
	this.scene.translate(-0.8,1.3,0);
	this.cabeca.display();
	this.scene.popMatrix();
	 
	 
	//bracos
	this.scene.pushMatrix();
	this.scene.translate(-0.8,1,0.3);
	this.scene.rotate(75*(Math.PI / 180.0),1,0,0);
	this.scene.scale(0.09,0.09,0.6);
	this.cilindro.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(-0.8,1,-0.3);
	this.scene.rotate(105*(Math.PI / 180.0),1,0,0);
	this.scene.scale(0.09,0.09,0.6);
	this.cilindro.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(-0.8,0.5,-0.5);
	this.scene.rotate(-105*(Math.PI / 180.0),1,0,0);
	this.scene.scale(0.076,0.075,0.7);
	this.cilindro.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(-0.8,0.5,0.5);
	this.scene.rotate(-75*(Math.PI / 180.0),1,0,0);
	this.scene.scale(0.076,0.075,0.7);
	this.cilindro.display();
	this.scene.popMatrix();
	 
	//pernas
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.15);
	this.scene.rotate(-90*(Math.PI / 180.0),0,1,0);
	this.scene.scale(0.12,0.12,0.8);
	this.cilindro.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(0,0,-0.15);
	this.scene.rotate(-90*(Math.PI / 180.0),0,1,0);
	this.scene.scale(0.12,0.12,0.8);
	this.cilindro.display();
	this.scene.popMatrix();
	//...
	this.scene.pushMatrix();
	this.scene.translate(0,-0.7,0.15);
	this.scene.rotate(-90*(Math.PI / 180.0),1,0,0);
	this.scene.scale(0.09,0.1,0.7);
	this.cilindro.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(0,-0.7,-0.15);
	this.scene.rotate(-90*(Math.PI / 180.0),1,0,0);
	this.scene.scale(0.09,0.1,0.7);
	this.cilindro.display();
	this.scene.popMatrix();
	
	
	//tronco
	this.scene.pushMatrix();
	this.scene.translate(-0.8,0,0);
	this.scene.rotate(-90*(Math.PI / 180.0),1,0,0);
	this.scene.scale(0.17,0.2,1);
	this.tronco.display();
	this.scene.popMatrix();
	
	

}
