var CircularAnimation = function(id,span,centro,raio,startAng1,rotAng1, type) {

  this.type = type;

    this.degToRad= Math.PI / 180.0;
    Animation.apply(this, arguments);
    this.id=id;
	this.span=span;
	this.centro=centro;
	this.raio=raio;
	this.startAng1=startAng1;
	this.rotAng1=rotAng1;
	this.startAng= (startAng1 * this.degToRad);
	this.rotAng=rotAng1 * this.degToRad;


	this.currentAngle= this.startAng;

	this.deltaDist= this.rotAng/this.span;

	this.currentPosition = new Ponto3(this.centro.x+this.raio*Math.cos(this.startAng),this.centro.y,this.centro.z+this.raio*Math.sin(this.startAng));

	this.tempoDecorrido=0;

	this.lastCurrTime = null;

	this.start=0;
	this.acabou=0;



};
CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.update = function(currTime)
{
	var deltaTemp;

	if(this.start==0)
	{
		return;
	}

	if(this.lastCurrTime!=null)
	{

		deltaTemp= (currTime - this.lastCurrTime)/1000;
		this.tempoDecorrido += deltaTemp;
	}

	this.lastCurrTime= currTime;



	if (this.tempoDecorrido>=this.span)
	{


		this.currentPosition.x= this.centro.x+this.raio * Math.cos(this.startAng + this.rotAng);
		this.currentPosition.y= this.centro.y;
		this.currentPosition.z= this.centro.z+this.raio * Math.sin(this.startAng + this.rotAng);

		this.acabou=1;

		return;
	}

	this.currentAngle = this.startAng +(this.deltaDist * this.tempoDecorrido);

	this.currentPosition.x = this.centro.x + this.raio * Math.cos(this.currentAngle);
	this.currentPosition.y = this.centro.y;
	this.currentPosition.z = this.centro.z + this.raio * Math.sin(this.currentAngle);





}
