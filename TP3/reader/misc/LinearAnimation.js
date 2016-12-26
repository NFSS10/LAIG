var LinearAnimation = function(id,span,pontosControlo, idRep) {
    Animation.apply(this, arguments);
    this.id=id;
	this.span=span;
  	this.idReplay = idRep;
	this.pontosControlo=pontosControlo;

	this.distanciasVec=[];
    this.distanciaTotal =0;
    for(var i=0; i<pontosControlo.length-1; i++)
    {
    	dist = this.distancia2Pontos(pontosControlo[i],pontosControlo[i+1]);
    	this.distanciasVec.push(dist);
    }

	for(var i=0; i<this.distanciasVec.length; i++)
	{
		this.distanciaTotal+=this.distanciasVec[i];
	}
	this.distanciaPercorrida=0;
	this.velocidade = this.distanciaTotal/this.span;

	this.pontoControloAtual =0;
	this.currentPosition = new Ponto3(pontosControlo[0].x, pontosControlo[0].y, pontosControlo[0].z);
	this.currentAngle = 0;
	this.tempoDecorrido= null;

	this.start=0;
	this.acabou=0;
  this.terminouMov = 0;
};
LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.update = function(currTime) {

	var delta;

	if(this.start==0)
	{
		return;
	}
	if(this.tempoDecorrido==null)
	{

		delta=0;
	}
	else
	{

		delta= (currTime-this.tempoDecorrido)/1000
	}

	this.tempoDecorrido = currTime;

	this.distanciaPercorrida+=this.velocidade*(delta);

	if(this.distanciaPercorrida>this.distanciasVec[this.pontoControloAtual])
	{
		if(this.pontoControloAtual==this.pontosControlo.length-2)
		{
		    this.tempoDecorrido= null;
			this.acabou=1;

			this.currentPosition.x = this.pontosControlo[this.pontosControlo.length-1].x;
  			this.currentPosition.y = this.pontosControlo[this.pontosControlo.length-1].y;
   			this.currentPosition.z = this.pontosControlo[this.pontosControlo.length-1].z;
			return;
		}
		else
		{
			this.pontoControloAtual++;
			this.distanciaPercorrida=0;
		}


	}


    d = this.distanciaPercorrida / this.distanciasVec[this.pontoControloAtual];
    this.currentPosition.x = (this.pontosControlo[this.pontoControloAtual + 1].x * d) + ((1 - d) * this.pontosControlo[this.pontoControloAtual].x);
  	this.currentPosition.y = (this.pontosControlo[this.pontoControloAtual + 1].y * d) + ((1 - d) * this.pontosControlo[this.pontoControloAtual].y);
    this.currentPosition.z = (this.pontosControlo[this.pontoControloAtual + 1].z * d) + ((1 - d) * this.pontosControlo[this.pontoControloAtual].z);

	this.terminouMov = 1;

};


LinearAnimation.prototype.distancia2Pontos = function(ponto1,ponto2)
{
	deltaX = ponto1.x - ponto2.x;
	deltaY = ponto1.y - ponto2.y;
	deltaZ = ponto1.z - ponto2.z;

	dist = Math.sqrt(deltaX*deltaX + deltaY*deltaY + deltaZ*deltaZ);

	return dist;
}
