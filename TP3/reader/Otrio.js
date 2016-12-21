function Otrio(){

this.client = new Client();

this.pl_board = null;

this.modoJogo = 1 //Modo de jogo 1 = PvP / 2 = PvC dif1  / 3 = PvC dif2 / 4 = CvC

//vez do jogador
this.playerTurn = 1; //1-> jogador1, Vermelho / 2 -> jogador2, Azul

//Selecao com rato
this.selectedPiece = null;
this.posTomove = null;



//Global
//idObjectos.................
this.minPvermelhoPick = 18;
this.maxPvermelhoPick = 26;

this.minPazulPick = 9;
this.maxPazulPick = 17;

this.minTabuleiro = 0;
this.maxTabuleiro = 8;
//........................

this.engineResponse = null;

}

Otrio.prototype.constructor=Otrio;


Otrio.prototype.fazJogada = function()
{
  //Fazer a jogada
  if(this.selectedPiece != null && this.posTomove != null)
  {
    //TODO prolog
    console.log("\nJogada:\n moveu peca:" + this.selectedPiece + " para pos: " + this.posTomove +"\n\n");

    if(this.playerTurn == 1)
    {
      res = this.possivelJogarVerm();
      console.log("É possivel jogar vermelho" + res);
    }
    else if(this.playerTurn == 2)
    {
      res = this.possivelJogarAzul();
      console.log("É possivel jogar Azul" + res);
    }

    this.changePlayer();
    this.reset_Seleccoes();
  }

}


//Reset das selecoes
Otrio.prototype.reset_Seleccoes = function()
{
  this.selectedPiece = null;
  this.posTomove = null;
}

//Muda jogador
Otrio.prototype.changePlayer = function()
{
  if(this.playerTurn == 1)
    this.playerTurn = 2;
  else if(this.playerTurn == 2)
      this.playerTurn = 1;
}


//Usado para selecionar peca e posicao do tabuleiro
Otrio.prototype.select_Obj = function(nSelected)
{
  this.posTomove = null;

  //Peca............
  //So selectiona se for a vez do jogador correspondente
  //Se for a vez do azul e ele selecionar azul
  if (this.playerTurn == 1 && nSelected >= this.minPvermelhoPick && nSelected <= this.maxPvermelhoPick)
  {
    this.selectedPiece = nSelected;
    return true;
  }

  //Se for a vez do azul e ele selecionar azul
  else if(this.playerTurn == 2 && nSelected >= this.minPazulPick && nSelected <= this.maxPazulPick)
  {
    this.selectedPiece = nSelected;
    return true;
  }


  //tabuleiro
  //So atribui valor do tabuleiro caso ja tenha peca selecionada
  if (this.selectedPiece != null && nSelected >= this.minTabuleiro && nSelected <= this.maxTabuleiro)
  {
    this.posTomove = nSelected;
    return true;
  }



return false;

}




///////////////////////////
//        Prolog        //
//////////////////////////

Otrio.prototype.getPl_Board = function(){
  var game=this;

  this.client.getPrologRequest("board", function(data) {
    game.pl_board=data.target.responseText;
  });

}

Otrio.prototype.possivelJogarVerm = function()
{
   var game = this;
   var res;
   var str = "jogadaVermPossivel";
   var strPiece;

  if(this.selectedPiece != null)
  {
    if(this.selectedPiece == 18 || this.selectedPiece == 21 || this.selectedPiece == 24)
      strPiece = "(r3)";
    else if(this.selectedPiece == 19 || this.selectedPiece == 22 || this.selectedPiece == 25)
      strPiece = "(r2)";
    else if(this.selectedPiece == 20 || this.selectedPiece == 23 || this.selectedPiece == 26)
      strPiece = "(r1)";
  }

  str = str + strPiece;
  console.log("Peca " + strPiece);

  //Verifica se é possivel jogar a peca
  this.client.getPrologRequest(str, function(data) {
    game.engineResponse = data.target.responseText;
    });

res = this.engineResponse;
this.engineResponse = null;

return res;
}


Otrio.prototype.possivelJogarAzul = function()
{
   var game = this;
   var res;
   var str = "jogadaAzulPossivel";
   var strPiece;

  if(this.selectedPiece != null)
  {
    if(this.selectedPiece == 9 || this.selectedPiece == 12 || this.selectedPiece == 15)
      strPiece = "(b3)";
    else if(this.selectedPiece == 10 || this.selectedPiece == 13 || this.selectedPiece == 16)
      strPiece = "(b2)";
    else if(this.selectedPiece == 11 || this.selectedPiece == 14 || this.selectedPiece == 17)
      strPiece = "(b1)";
  }

  str = str + strPiece;
  console.log("Peca " + strPiece);

  //Verifica se é possivel jogar a peca
  this.client.getPrologRequest(str, function(data) {
    game.engineResponse = data.target.responseText;
    });

res = this.engineResponse;
this.engineResponse = null;

return res;
}
