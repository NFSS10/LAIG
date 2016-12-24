function Patch(scene, orderU, orderV, partsU, partsV, controlPoints) {
	
	
	var controlvertexes = []
	this.pointIndex=0;				
	for(var i= 0; i< orderU+1; i++)
	{
		var array =  [];
		for(var t=0; t< orderV+1; t++)
		{
			var vertex = controlPoints[this.pointIndex];
			arraypontos=[vertex.x,vertex.y,vertex.z,1];
			array.push(arraypontos);
			this.pointIndex++;
			
		}
		controlvertexes.push(array);
	}
	
	var knots1 = this.getKnotsVector(orderU); 
	var knots2 = this.getKnotsVector(orderV); 
	var nurbsSurface = new CGFnurbsSurface(orderU,orderV, knots1, knots2, controlvertexes); 
	
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	CGFnurbsObject.call(this, scene, getSurfacePoint, partsU, partsV );		
}

Patch.prototype = Object.create(CGFnurbsObject.prototype);
Patch.prototype.constructor = Patch;


Patch.prototype.getKnotsVector = function(degree) { 
	
	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
}
