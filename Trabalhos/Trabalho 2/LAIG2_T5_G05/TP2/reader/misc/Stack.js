
function Stack()
{
	this.array= [];
};

Stack.prototype.push = function(elem)
{
	this.array.push(elem);
};

Stack.prototype.pop= function()
{
	this.array.pop();
};

Stack.prototype.top=function()
{
	return this.array[this.array.length-1];
};
