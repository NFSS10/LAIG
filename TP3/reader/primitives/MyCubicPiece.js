function MyCubicPiece(scene) {
 	CGFobject.call(this, scene);

 	this.quad = new MyUCube(this.scene);
	this.degToRad =  Math.PI / 180.0;
 };

 MyCubicPiece.prototype = Object.create(CGFobject.prototype);
 MyCubicPiece.prototype.constructor = MyCubicPiece;

 MyCubicPiece.prototype.display = function() {
 	// front face
 	this.scene.pushMatrix();
 	this.scene.translate(0, 0, 1);
 	this.scene.scale(3, 1, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();

 	this.scene.translate(0, 0, -1);
 	this.scene.scale(3, 1,  0.5);
 	this.scene.rotate(90 * this.degToRad, 0, 0, 1);
 	this.quad.display();
 	this.scene.popMatrix();

 	// top face
 	this.scene.pushMatrix();
 	this.scene.translate(1.25, 0,0);
 	this.scene.scale(0.5, 1,  1.5);
 	this.scene.rotate(90 * this.degToRad, 0, 0, 1);
 	this.quad.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
 	this.scene.translate(-1.25, 0, 0);
 	this.scene.scale(0.5, 1,  1.5);
 	this.scene.rotate(90 * this.degToRad, 0, 0, 1);
 	this.quad.display();
 	this.scene.popMatrix();

    
 
 };