#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float sU;
uniform float sV;
uniform float dU;
uniform float dV;

varying vec2 vTextureCoord;


void main() {

	vec3 offset= vec3(0.0,0.0,0.0);
	if(((aTextureCoord.x > (sU/dU)) && (aTextureCoord.x < (sU+0.9)/dU)) && ((aTextureCoord.y > (sV/dV)) && (aTextureCoord.y <= (sV+0.9)/dV)) )
	{
			offset= vec3(0.0,0.0,1.0);
	}
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
  vTextureCoord = aTextureCoord;
}