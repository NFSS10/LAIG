#ifdef GL_ES
precision highp float;
#endif


varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec4 cl1;
uniform vec4 cl2;
uniform vec4 clS;
uniform float dU;
uniform float dV;
uniform float sU;
uniform float sV;


void main() {

  vec4 corinicial = texture2D(uSampler, vTextureCoord);

  if(((vTextureCoord.x > (sU/dU)) && (vTextureCoord.x < (sU+1.0)/dU)) && ((vTextureCoord.y > (sV/dV)) && (vTextureCoord.y < (sV+1.0)/dV)) )
  {
  	
	gl_FragColor=clS* corinicial;
  }
  else
  {
  if ((mod(dU*vTextureCoord.x, 2.0) < 1.0) ^^ (mod(dV*vTextureCoord.y, 2.0) < 1.0))
  {
  	gl_FragColor=cl1* corinicial;
  }
  else
  {
	gl_FragColor=cl2* corinicial;
  }
  }

}