function MyUCube(scene) {
 	CGFobject.call(this, scene);

 	this.quad = new MyRectangle(this.scene,-0.5,-0.5,0.5,0.5);
	this.degToRad =  Math.PI / 180.0;
 };

 MyUCube.prototype = Object.create(CGFobject.prototype);
 MyUCube.prototype.constructor = MyUCube;

 MyUCube.prototype.display = function() {
 	// front face
 	this.scene.pushMatrix();
    this.scene.rotate(90 * this.degToRad, 0, 0, 1);
 	this.scene.translate(0, 0, 0.5);
 	
 	this.quad.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
    
 	this.scene.rotate(180 * this.degToRad, 1, 0, 0);
 	this.scene.rotate(90 * this.degToRad, 0, 0, 1);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// top face
 	this.scene.pushMatrix();
 	this.scene.rotate(-90 * this.degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
 	this.scene.rotate(90 * this.degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// right face
 	this.scene.pushMatrix();
 	this.scene.rotate(-90 * this.degToRad, 0, 1, 0);
 	this.scene.rotate(90 * this.degToRad, 0, 0, 1);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// left face
 	this.scene.pushMatrix();
 	this.scene.rotate(90 * this.degToRad, 0, 1, 0);
 	this.scene.rotate(90 * this.degToRad, 0, 0, 1);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();
 };