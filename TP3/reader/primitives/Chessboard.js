/**
 * Chessboard
 * @constructor
 */
function Chessboard(scene,du,dv,textureref,su,sv,c1,c2,cs) {
    CGFobject.call(this, scene);
    this.scene=scene;

    this.shader = new CGFshader(scene.gl, "./shaders/board.vert", "./shaders/board.frag");
    this.plane = new Plane(this.scene, 1, 1, 100, 100);

	console.log("CHESSSSSSSSSSS: " + du +"  "+ dv +"  "+ texture +"  "+ su +"  "+ sv +"  " +c1.r +"  " + c2 +"  " + cs.g +" \n ")
    for(var i=0; i< this.scene.graph.textures_info.textures.length ;i++)
	{
		if(this.scene.graph.textures_info.textures[i].id==textureref)
		{
			this.texture=this.scene.graph.textures_info.textures[i].realTexture;
		}
	}


    this.shader.setUniformsValues({uSampler : 0,
                                  cl1 : [c1.r, c1.g, c1.b, c1.a],
                                  cl2 : [c2.r, c2.g, c2.b, c2.a],
                                  clS : [cs.r, cs.g, cs.b, cs.a],
                                  dU:du,
                                  dV:dv,
                                  sU:su,
                                  sV:sv,
                                  });

};

Chessboard.prototype = Object.create(CGFobject.prototype);
Chessboard.prototype.constructor = Chessboard;

Chessboard.prototype.display = function() {

    this.texture.bind(0);

    this.scene.setActiveShader(this.shader);
    this.plane.display();
    this.scene.setActiveShader(this.scene.defaultShader);

};