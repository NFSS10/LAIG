function Otrio()
{

this.client = new Client();

pl_board = null;

//vez do jogador
playerTurn = 1; //1-> jogador1, Vermelho / 2 -> jogador2, Azul

//Selecao com rato
selectedPiece = null;
posTomove = null;



//Global
//pecas.................
minPvermelhoPick = 18;
maxPvermelhoPick = 26;

minPazulPick = 9;
maxPazulPick = 17;
.......................

}

Otrio.prototype.constructor=Otrio;


Otrio.prototype.select_Piece = function(nSelected)
{
  //limpa seleções
  selPiece = null;
  posTomove = null;

  //So selectiona se for a vez do jogador correspondente
  //Se for a vez do azul e ele selecionar azul
  if(playerTurn == 1 && nSelected >= minPazulPick && nSelected <= maxPazulPick)
    selectedPiece = nSelected;

  //Se for a vez do azul e ele selecionar azul
  else if (playerTurn == 2 && nSelected >= minPvermelhoPick && nSelected <= maxPvermelhoPick)
    selectedPiece = nSelected;

}


//Prolog funções
Otrio.prototype.getPl_Board = function()
{
  var game=this;

  this.client.getPrologRequest("board", function(data) {
    game.pl_board=data.target.responseText;
  });
}
