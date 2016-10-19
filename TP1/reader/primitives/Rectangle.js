
 function Rectangle(scene,left_top_x,left_top_y ,right_bot_x,right_bot_y) {
 	CGFobject.call(this,scene);

   this.left_top_x=left_top_x;
   this.left_top_y=left_top_y;
   this.right_bot_x=right_bot_x;
   this.right_bot_y=right_bot_y;
   
	this.minS = 0;
	this.maxS = 1;
	this.minT = 0;
	this.maxT = 1;
   

 	this.initBuffers();
 };

 Rectangle.prototype = Object.create(CGFobject.prototype);
 Rectangle.prototype.constructor = Rectangle;

 Rectangle.prototype.initBuffers = function() {
 	this.vertices = [
 	this.left_top_x, this.right_bot_y, 0,
	this.right_bot_x, this.right_bot_y, 0,
	this.left_top_x, this.left_top_y, 0,
	this.right_bot_x, this.left_top_y, 0
 	];

 	this.indices = [
 	0, 1, 2, 
 	2, 1, 3
 	];

this.texCoords = [
 	this.minS,this.maxT,
 	this.maxS, this.maxT,
 	this.minS, this.minT,
 	this.maxS, this.minT
 	];

 this.normals=[
 	0,0,1,
 	0,0,1,
 	0,0,1,
 	0,0,1
 	];
	
 this.primitiveType = this.scene.gl.TRIANGLES;
 this.initGLBuffers();
 	
 	
 };
