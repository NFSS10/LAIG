
 function Cilindro(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 Cilindro.prototype = Object.create(CGFobject.prototype);
 Cilindro.prototype.constructor = Cilindro;

 Cilindro.prototype.initBuffers = function() {

 	this.vertices = [];
 	this.texCoords = [];
 	this.normals = [];

	var inq=2*Math.PI/this.slices;
	var ang=0.0;
	var xCoord=0;
	var yCoord=0;
	for (var i = 0; i < this.stacks + 1; i++)
	{	
		ang=0.0;
		for (var j = 0; j < this.slices; j++)
		{
			this.vertices.push(Math.cos(ang), Math.sin(ang), i / this.stacks);
			this.normals.push(Math.cos(ang), Math.sin(ang),0);
			
			this.texCoords.push(xCoord, yCoord);
			xCoord+=1/this.slices;
			
			ang += inq;
		}
		xCoord = 0;
		yCoord+= 1/this.stacks;
	}

	//Indices
	this.indices = [];
	var a;
	for (var stack = 0; stack < this.stacks; stack++)
	{
		for (var slice = 0; slice < this.slices; slice++)
		{
			if (slice == this.slices - 1)
			{	
				a = stack * this.slices + slice;
				this.indices.push(a,  a + 1 - this.slices, (((stack + 1) * this.slices + slice) + 1) - this.slices);
				this.indices.push(a, (((stack + 1) * this.slices + slice) + 1) - this.slices, ((stack + 1) * this.slices + slice));
			}
			else
			{
				a = stack * this.slices + slice;
				this.indices.push(a, a + 1, ((stack + 1) * this.slices + slice) + 1);
				this.indices.push(a, ((stack + 1) * this.slices + slice) + 1, ((stack + 1) * this.slices + slice));
			}
		}

	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
