/**
 * MyTriangle
 * @constructor
 */
function MyTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3, minS, maxS, minT, maxT)
{
    CGFobject.call(this, scene);

    this.x1 = x1;
  	this.x2 = x2;
  	this.x3 = x3;
  	this.y1 = y1;
  	this.y2 = y2;
  	this.y3 = y3;
  	this.z1 = z1;
  	this.z2 = z2;
  	this.z3 = z3;

    this.minS = minS || 0;
    this.maxS = maxS || 1;
    this.minT = minT || 0;
    this.maxT = maxT || 1;

    this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;

MyTriangle.prototype.initBuffers = function()
{
  this.vertices = [
      this.x1, this.y1, this.z1,
      this.x2, this.y2, this.z2,
      this.x3, this.y3, this.z3
  ];

  this.indices = [
      0, 1, 2
  ];

  this.primitiveType = this.scene.gl.TRIANGLES;

  var nX = (this.y2-this.y1)*(this.z3-this.z1) - (this.z2-this.z1)*(this.y3-this.y1);
  var nY = (this.z2-this.z1)*(this.x3-this.x1) - (this.x2-this.x1)*(this.z3-this.z1);
  var nZ = (this.x2-this.x1)*(this.y3-this.y1) - (this.y2-this.y1)*(this.x3-this.x1);

  this.normals = [
      nX, nY, nZ,
      nX, nY, nZ,
      nX, nY, nZ
  ];


  var ab = Math.sqrt(Math.pow(this.x2-this.x1, 2) + Math.pow(this.y2-this.y1, 2) + Math.pow(this.z2-this.z1, 2));
  var bc = Math.sqrt(Math.pow(this.x2-this.x3, 2) + Math.pow(this.y2-this.y3, 2) + Math.pow(this.z2-this.z3, 2));
  var ac = Math.sqrt(Math.pow(this.x1-this.x3, 2) + Math.pow(this.y1-this.y3, 2) + Math.pow(this.z1-this.z3, 2));
  var b = Math.acos((Math.pow(bc, 2) + Math.pow(ab, 2) - Math.pow(ac, 2))/(2*ab*bc));

  var t1 = (ab - bc*Math.cos(b))/ab;
  var t2 = bc*Math.sin(b)/ab;

  this.texCoords = [
      this.minS, this.minT,
      this.maxS, this.minT,
      t1, t2
  ];

  this.initGLBuffers();
};
