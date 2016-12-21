function Otrio(){

this.client = new Client();

pl_board = null;

playerTurn = 1; //1-> jogador1, Vermelho / 2 -> jogador2, Azul

selPiece = null;
posTomove = null;


}

Otrio.prototype.constructor=Otrio;



Otrio.prototype.getPl_Board = function(){
  var game=this;

  this.client.getPrologRequest("board", function(data) {
    game.pl_board=data.target.responseText;
  });
}


Otrio.prototype.move_Blue = function(){
  var game=this;

  this.client.getPrologRequest("board", function(data) {
    game.pl_board=data.target.responseText;
  });
}
