/**
 * Triangle
 * @constructor
 */
function MyTriangle(scene, x1,y1,z1,x2,y2,z2, x3,y3,z3) {
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

    this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;

MyTriangle.prototype.initBuffers = function() {
   
    this.vertices = [
        this.x1, this.y1, this.z1,
        this.x2, this.y2, this.z2,
        this.x3, this.y3, this.z3
    ];

    this.indices = [
        0, 1, 2,
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;


    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
    ];


    var properties = this.getVectorsProperties(this.makeVector(this.point2, this.point1),
        this.makeVector(this.point2, this.point3));


    this.texCoords = [
      0, 0,
      properties[0], 0,
      properties[0] - properties[1] * Math.cos(properties[2]), properties[1] * Math.sin(properties[2])
    ]

    this.initGLBuffers();
};


MyTriangle.prototype.makeVector = function(point1, point2) {
    return new Point3(point2.x - point1.x, point2.y - point1.y, point2.z - point1.z)
}

MyTriangle.prototype.dotProduct = function(point1, point2) {
    return (point1.x * point2.x) + (point1.y * point2.y) + (point1.z * point2.z);
}

MyTriangle.prototype.calculateLength = function(vec) {
    return Math.sqrt((vec.x * vec.x) + (vec.y * vec.y) + (vec.z * vec.z));
}

MyTriangle.prototype.getVectorsProperties = function(vec1, vec2) {
    var length1 = this.calculateLength(vec1);
    var length2 = this.calculateLength(vec2);
    var dot = this.dotProduct(vec1, vec2);
    var angle = Math.acos(dot / (length1 * length2));

    return [length1, length2, angle];
}
