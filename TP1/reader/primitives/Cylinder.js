/**
* Cylinder
* @constructor
*/
function MyCylinder(scene, base, top, height, slices, stacks) {
	CGFobject.call(this,scene);

	this.surface = new MyCylinderSurface(scene, base, top, height, slices, stacks);
	this.base = new MyCylinderBase(scene, base, slices);
	this.top = new MyCylinderBase(scene, top, slices);
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;


MyCylinder.prototype.display = function() {

	this.surface.display();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.base.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.top.display();
	this.scene.popMatrix();
}
