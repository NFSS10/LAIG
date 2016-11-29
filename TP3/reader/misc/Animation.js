var Animation = function(id,span)
{
	 if (this.constructor === Animation) {
      throw new Error("Can't instantiate abstract class!");
    }
	this.id=id;
	this.span=span;
	
};


Animation.prototype.update = function(currTime) { };