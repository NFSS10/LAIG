function Otrio(scene){

this.client = new Client();
this.scene=scene;

this.pl_board = null;
this.set1 = null;
this.set2 = null;

//vez do jogador
this.playerTurn = 1; //1-> jogador1, Vermelho / 2 -> jogador2, Azul
this.modoJogo = 1; //Modo de jogo 1 = PvP(predefinido) / 2 = PvC dif1  / 3 = PvC dif2 / 4 = CvC
this.player1Wins = 0;
this.player2Wins = 0;
this.undid=0;
this.posIniciais =[]; //Nao muda

this.pecasAzuisPequenas = [11,14,17];
this.pecasAzuisMedias = [10,13,16];
this.pecasAzuisGrandes =  [9,12,15];

this.pecasVermelhasPequenas = [20,23,26];
this.pecasVermelhasMedias = [19,22,25];
this.pecasVermelhasGrandes =  [18,21,24];

this.selectedPiecePC = null;
this.posTomovePC = null;

this.start=0;
this.gameStates = []; //Contem os estados das n jogadas
this.piecesThatMoved = [];  //Contem as jogadas por ordem ate ao momento

//Selecao com rato
this.selectedPiece = null;
this.posTomove = null;
this.undidpiece = null;
this.jogada=0;

//Global
//idObjectos.................
this.minPvermelhoPick = 18;
this.maxPvermelhoPick = 26;

this.minPazulPick = 9;
this.maxPazulPick = 17;

this.minTabuleiro = 0;
this.maxTabuleiro = 8;
//........................

this.initPosIniciais();


//this.initGame(); //.... remover daqui

}

Otrio.prototype.constructor=Otrio;



//Ao chamar, retoma ao estado anterior
Otrio.prototype.undoMove = function()
{


  if(this.gameStates.length>0)
  {


    for(var j=0; j<this.gameStates.length; j++)
    {
      for(var z=0; z<this.gameStates.length; z++)
      {
        if(z==j)
        {}
        else
        {
           if(this.gameStates[j].movedPiece==this.gameStates[z].movedPiece)
           {
             this.gameStates.splice(z, 1);
             z--;
           }
        }
      }
    }


    console.log("LENGTH: "+this.gameStates.length);
    this.resetgame();
    for (var i=0; i<this.gameStates.length-1; i++)
    {
      if(this.gameStates[i].playerTurn==2)
      {
          this.tristeVerm(this.gameStates[i].movedPiece,this.gameStates[i].movedPlace);
          //this.gameStates.pop();
          console.log("LENGTH2: "+this.gameStates.length);

      }
      else if(this.gameStates[i].playerTurn==1)
      {
          this.tristeAzul(this.gameStates[i].movedPiece,this.gameStates[i].movedPlace);
          //this.gameStates.pop();
          console.log("LENGTH2: "+this.gameStates.length);

      }
    }
    this.undidpiece = this.gameStates[this.gameStates.length-1].movedPiece;
    this.piecesThatMoved[this.undidpiece] = null;

    this.changePlayer();
    this.undid=1;
    this.gameStates.pop();
  }
}

//Adiciona o estado da jogada que se fez (por apos fazer jogada)
Otrio.prototype.addGameState = function(selectedPiece,posTomove)
{


	estadoJogo = new OtrioState(selectedPiece,posTomove);
	estadoJogo.playerTurn= this.playerTurn;
    estadoJogo.modoJogo=this.modoJogo;
    estadoJogo.player1Wins=this.player1Wins;
    estadoJogo.player2Wins=this.player2Wins;

    this.gameStates.push(estadoJogo);

}

Otrio.prototype.quit = function()
{
    this.resetgame();
    this.reset_Seleccoes();
	this.gameStates = [];
	this.piecesThatMoved =[];
	for(var i=0; i<this.scene.graph.components_info.components_list.length;i++)
	{
	  this.scene.graph.components_info.components_list[i].fullAnimation=null;
	}
    this.start=0;
}

Otrio.prototype.startGame = function()
{
    this.quit();
    this.start=1;
    this.modoJogo=this.scene.ModoJogo;
    this.playerTurn=1;
}


Otrio.prototype.tristeVerm = function(selectedPiece,posTomove)
{
   this.fazjogadaVerm(posTomove,selectedPiece);
   return;
}

Otrio.prototype.tristeAzul = function(selectedPiece,posTomove)
{
   this.fazjogadaAzul(posTomove,selectedPiece);
   return;
}


/*
//O jogador no xmlscene vai selecionar o modo de jogo, e ele vai iniciar com esse modo de jogo, caso contrario inicia a 1
Otrio.prototype.initGame = function(modoJogo)
{

  // passar o que esta abaixo para o addstate
  this.modoJogo = modoJogo || 1;

  this.getPl_Board();
  estadoJogo = new OtrioState();

  estadoJogo.pl_board = this.pl_board;
  console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
  console.log(estadoJogo.pl_board + "\n\n");
}
*/





Otrio.prototype.declararVitoria = function()
{
  console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n");
  console.log("---------VITORIA--------");
  if(this.playerTurn==1)
  console.log("Jogador" + 2 + "\n\n\n");
  else
  console.log("Jogador" + 1 + "\n\n\n");
}



Otrio.prototype.fazJogada = function()
{
  this.getPl_Board(); //remover
  this.getPl_Board(); //Remover...
  if(this.selectedPiece != null)
  {
    if(this.playerTurn == 1)
      this.possivelJogarVerm();

    else if(this.playerTurn == 2)
      this.possivelJogarAzul();

  }
  if(this.selectedPiece != null && this.posTomove != null && this.modoJogo==1)
  {
    if(this.playerTurn == 1)
    {
      if(this.selectedPiece == 18 || this.selectedPiece == 21 || this.selectedPiece == 24)
        this.veriffazjogadaVermG(this.posTomove,this.selectedPiece);
      else if(this.selectedPiece == 19 || this.selectedPiece == 22 || this.selectedPiece == 25)
        this.veriffazjogadaVermM(this.posTomove,this.selectedPiece);
      else if(this.selectedPiece == 20 || this.selectedPiece == 23 || this.selectedPiece == 26)
        this.veriffazjogadaVermP(this.posTomove,this.selectedPiece);

    }
    else if(this.playerTurn == 2)
    {
      if(this.selectedPiece == 9 || this.selectedPiece == 12 || this.selectedPiece == 15)
         this.veriffazjogadaAzulG(this.posTomove,this.selectedPiece);
      else if(this.selectedPiece == 10 || this.selectedPiece == 13 || this.selectedPiece == 16)
         this.veriffazjogadaAzulM(this.posTomove,this.selectedPiece);
      else if(this.selectedPiece == 11 || this.selectedPiece == 14 || this.selectedPiece == 17)
         this.veriffazjogadaAzulP(this.posTomove,this.selectedPiece);

    }
  }
  if(this.selectedPiece != null && this.posTomove != null && this.modoJogo==2)
  {
    if(this.playerTurn == 1)
    {
      this.jogada=0;
      if(this.selectedPiece == 18 || this.selectedPiece == 21 || this.selectedPiece == 24)
        this.veriffazjogadaVermG(this.posTomove,this.selectedPiece);
      else if(this.selectedPiece == 19 || this.selectedPiece == 22 || this.selectedPiece == 25)
        this.veriffazjogadaVermM(this.posTomove,this.selectedPiece);
      else if(this.selectedPiece == 20 || this.selectedPiece == 23 || this.selectedPiece == 26)
        this.veriffazjogadaVermP(this.posTomove,this.selectedPiece);


    }

  }
  this.getPl_Board(); //Remover...
  this.getPl_Board(); //Remover...
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



Otrio.prototype.getTranslatedPos = function(pos)
{
  var strPiece;
  switch(pos)
  {
      case 0:
         strPiece= "(0,0)";
        break;
      case 1:
         strPiece= "(1,0)";
        break;
      case 2:
         strPiece= "(2,0)";
        break;
      case 3:
         strPiece= "(0,1)";
        break;
      case 4:
         strPiece= "(1,1)";
        break;
      case 5:
         strPiece= "(2,1)";
        break;
      case 6:
         strPiece= "(0,2)";
        break;
      case 7:
         strPiece= "(1,2)";
        break;
      case 8:
         strPiece= "(2,2)";
        break;

  }
 return strPiece;
}


//Usado para selecionar peca e posicao do tabuleiro
Otrio.prototype.select_Obj = function(nSelected)
{
  this.posTomove = null;
  if(this.start==1)
  {
    if(this.modoJogo==1)
    {
        if (this.playerTurn == 1 && nSelected >= this.minPvermelhoPick && nSelected <= this.maxPvermelhoPick && this.piecesThatMoved[nSelected]==null)
        {
          this.selectedPiece = nSelected;
          return true;
        }

        else if(this.playerTurn == 2 && nSelected >= this.minPazulPick && nSelected <= this.maxPazulPick  && this.piecesThatMoved[nSelected]==null)
        {
          this.selectedPiece = nSelected;
          return true;
        }

        if (this.selectedPiece != null && nSelected >= this.minTabuleiro && nSelected <= this.maxTabuleiro)
        {
          this.posTomove = nSelected;
          return true;
        }
         return false;
    }
    else if(this.modoJogo==2)
    {
      /*
      if(this.selectedPiece==11 || this.selectedPiece==14 || this.selectedPiece==17 ||
      this.selectedPiece==10 || this.selectedPiece==13 || this.selectedPiece==16 ||
      this.selectedPiece==9 || this.selectedPiece==12 || this.selectedPiece==15)
      {
        console.log("ENTRAAAAAAA");
        this.reset_Seleccoes();
        this.jogada=0;
        this.changePlayer();
      }*/
         if (this.playerTurn == 1 && nSelected >= this.minPvermelhoPick && nSelected <= this.maxPvermelhoPick && this.piecesThatMoved[nSelected]==null)
        {
          this.selectedPiece = nSelected;
          return true;
        }

        if (this.playerTurn == 2)
        {
          this.escolhePecaAzul();
          return true;
        }
        if (this.playerTurn == 1 && this.selectedPiece != null && nSelected >= this.minTabuleiro && nSelected <= this.maxTabuleiro)
        {
          this.posTomove = nSelected;
          return true;
        }

         return false;
    }
  }
 return false;
}



Otrio.prototype.initPosIniciais = function()
{
  this.posIniciais[9]= [-17,0,-7.5];
  this.posIniciais[10]=[-17,0,-7.5];
  this.posIniciais[11]=[-17,0,-7.5];


  this.posIniciais[12]=[-17,0,0];
  this.posIniciais[13]=[-17,0,0];
  this.posIniciais[14]=[-17,0,0];

  this.posIniciais[15]=[-17,0,7.5];
  this.posIniciais[16]=[-17,0,7.5];
  this.posIniciais[17]=[-17,0,7.5];

  this.posIniciais[0]=[-8,0,-8];
  this.posIniciais[1]=[0,0,-8];
  this.posIniciais[2]=[8,0,-8];
  this.posIniciais[3]=[-8,0,0];
  this.posIniciais[4]=[0,0,0];
  this.posIniciais[5]=[8,0,0];
  this.posIniciais[6]=[-8,0,8];
  this.posIniciais[7]=[0,0,8];
  this.posIniciais[8]=[8,0,8];

  this.posIniciais[18]= [17,0,-7.5];
  this.posIniciais[19]=[17,0,-7.5];
  this.posIniciais[20]=[17,0,-7.5];


  this.posIniciais[21]=[17,0,0];
  this.posIniciais[22]=[17,0,0];
  this.posIniciais[23]=[17,0,0];

  this.posIniciais[24]=[17,0,7.5];
  this.posIniciais[25]=[17,0,7.5];
  this.posIniciais[26]=[17,0,7.5];

}


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////                            Prolog                            ////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

Otrio.prototype.escolhePecaAzul = function()
{
    var game=this;

  this.client.getPrologRequest("escolhePecaAzul", function(data) {
      pecaEscolhida = data.target.responseText

      if(pecaEscolhida== "b1")
      {
        game.selectedPiece=game.pecasAzuisPequenas[game.pecasAzuisPequenas.length-1];
        game.pecasAzuisPequenas.pop();
      }
      if(pecaEscolhida== "b2")
      {
        game.selectedPiece=game.pecasAzuisMedias[game.pecasAzuisMedias.length-1];
        game.pecasAzuisMedias.pop();
      }
      if(pecaEscolhida== "b3")
      {
        game.selectedPiece=game.pecasAzuisGrandes[game.pecasAzuisGrandes.length-1];
        game.pecasAzuisGrandes.pop();
      }
      game.fazjogadaPc(pecaEscolhida);



    });

}


Otrio.prototype.fazjogadaPc = function(Piece)
{
  var game = this;
  var str;

  str = "jogadaComputador1("+Piece+")";

    this.client.getPrologRequest(str, function(data) {
      game.jogada=1;
      game.posTomove= parsePos(data.target.responseText);
      game.changePlayer();


     // game.reset_Seleccoes();


    });

}



Otrio.prototype.getPl_Board = function(){
  var game=this;

  this.client.getPrologRequest("board", function(data) {
    game.pl_board=data.target.responseText;
  });

}




Otrio.prototype.verificaVitoria = function()
{
    var game=this;

  this.client.getPrologRequest("verifVitoria", function(data) {
      if(data.target.responseText == 1)
        game.declararVitoria();


    });

}

Otrio.prototype.resetgame = function()
{
    var game=this;

  this.client.getPrologRequest("resetgame", function(data) {
      if(data.target.responseText == 1)
      console.log("Reseted");
    });

}




Otrio.prototype.fazjogadaVerm = function(posTomove,selectedPiece)
{
   var game = this;
   var str = "fazjogadaVerm";
   var strPiece;
   var strPiece2;

      switch(posTomove)
      {
          case 0:
             strPiece= "(0,0,";
            break;
          case 1:
             strPiece= "(1,0,";
            break;
          case 2:
             strPiece= "(2,0,";
            break;
          case 3:
             strPiece= "(0,1,";
            break;
          case 4:
             strPiece= "(1,1,";
            break;
          case 5:
             strPiece= "(2,1,";
            break;
          case 6:
             strPiece= "(0,2,";
            break;
          case 7:
             strPiece= "(1,2,";
            break;
          case 8:
             strPiece= "(2,2,";
            break;

      }


        if(selectedPiece== 18 || selectedPiece== 21 || selectedPiece == 24)
          strPiece2 = strPiece +  "r3)";
        else if(selectedPiece == 19 ||selectedPiece == 22 ||selectedPiece == 25)
          strPiece2 = strPiece +  "r2)";
        else if(selectedPiece == 20 ||selectedPiece == 23 ||selectedPiece == 26)
          strPiece2 = strPiece +  "r1)";



  str = str + strPiece2;
  game.client.getPrologRequest(str, function(data) {
    if(data.target.responseText == 1)
    {
      game.addGameState(selectedPiece,posTomove);
      game.piecesThatMoved[selectedPiece]=selectedPiece;
      game.verificaVitoria();
      game.reset_Seleccoes();
      game.jogada=0;
    }
    });
}


Otrio.prototype.fazjogadaAzul = function(posTomove,selectedPiece)
{
   var game = this;
   var str = "fazjogadaAzul";
   var strPiece;
   var strPiece2;

   if(posTomove != null && selectedPiece !=null)
   {
      switch(posTomove)
      {
          case 0:
             strPiece= "(0,0,";
            break;
          case 1:
             strPiece= "(1,0,";
            break;
          case 2:
             strPiece= "(2,0,";
            break;
          case 3:
             strPiece= "(0,1,";
            break;
          case 4:
             strPiece= "(1,1,";
            break;
          case 5:
             strPiece= "(2,1,";
            break;
          case 6:
             strPiece= "(0,2,";
            break;
          case 7:
             strPiece= "(1,2,";
            break;
          case 8:
             strPiece= "(2,2,";
            break;

      }

      if(selectedPiece != null)
      {
        if(selectedPiece == 9 || selectedPiece == 12 || this.selectedPiece == 15)
          strPiece2 = strPiece+ "b3)";
        else if(selectedPiece == 10 || selectedPiece == 13 || selectedPiece == 16)
          strPiece2 = strPiece+"b2)";
        else if(selectedPiece == 11 || selectedPiece == 14 || selectedPiece == 17)
          strPiece2 = strPiece+ "b1)";
      }

   }


  str = str + strPiece2;
  this.client.getPrologRequest(str, function(data) {
    if(data.target.responseText == 1)
    {
      game.addGameState(selectedPiece,posTomove);
      game.piecesThatMoved[selectedPiece]=selectedPiece;
      game.verificaVitoria();
      game.reset_Seleccoes();
      game.jogada=0;


    }
    });
}





Otrio.prototype.veriffazjogadaVermG = function(posTomove,selectedPiece)
{
   var game = this;
   var str = "veriffazjogadaVermG";
   var strPiece;

   if(posTomove != null)
     strPiece = this.getTranslatedPos(posTomove);

  str = str + strPiece;
  this.client.getPrologRequest(str, function(data) {
    if(data.target.responseText == 1)
    {
      game.fazjogadaVerm(posTomove,selectedPiece);
      game.changePlayer();
      game.jogada=1;
      game.undid=0;
    }
    else if(data.target.responseText == 0)
      console.log("posicao ocupada");
    });
}

Otrio.prototype.veriffazjogadaVermM = function(posTomove,selectedPiece)
{
   var game = this;
   var str = "veriffazjogadaVermM";
   var strPiece;

   if(posTomove != null)
     strPiece = this.getTranslatedPos(posTomove);

  str = str + strPiece;
  this.client.getPrologRequest(str, function(data) {
    if(data.target.responseText == 1)
    {
      game.fazjogadaVerm(posTomove,selectedPiece);
      game.changePlayer();
      game.jogada=1;
      game.undid=0;

    }
    else if(data.target.responseText == 0)
      console.log("posicao ocupada");
    });
}

Otrio.prototype.veriffazjogadaVermP = function(posTomove,selectedPiece)
{
   var game = this;
   var str = "veriffazjogadaVermP";
   var strPiece;

   if(posTomove != null)
     strPiece = this.getTranslatedPos(posTomove);

  str = str + strPiece;
  this.client.getPrologRequest(str, function(data) {
    if(data.target.responseText == 1)
    {
      game.fazjogadaVerm(posTomove,selectedPiece);
      game.changePlayer();
      game.jogada=1;
      game.undid=0;
    }
    else if(data.target.responseText == 0)
      console.log("posicao ocupada");
    });
}









Otrio.prototype.veriffazjogadaAzulG = function(posTomove,selectedPiece)
{
   var game = this;
   var str = "veriffazjogadaAzulG";
   var strPiece;

   if(posTomove != null)
     strPiece = this.getTranslatedPos(posTomove);

  str = str + strPiece;
  this.client.getPrologRequest(str, function(data) {
    if(data.target.responseText == 1)
    {
      game.fazjogadaAzul(posTomove,selectedPiece);
      game.changePlayer();
      game.jogada=1;
      game.undid=0;
    }
    else if(data.target.responseText == 0)
      console.log("posicao ocupada");
    });
}

Otrio.prototype.veriffazjogadaAzulM = function(posTomove,selectedPiece)
{
   var game = this;
   var str = "veriffazjogadaAzulM";
   var strPiece;

   if(posTomove != null)
     strPiece = this.getTranslatedPos(posTomove);

  str = str + strPiece;
  this.client.getPrologRequest(str, function(data) {
    if(data.target.responseText == 1)
    {
      game.fazjogadaAzul(posTomove,selectedPiece);
      game.changePlayer();
      game.jogada=1;
      game.undid=0;
    }
    else if(data.target.responseText == 0)
      console.log("posicao ocupada");
    });
}

Otrio.prototype.veriffazjogadaAzulP = function(posTomove,selectedPiece)
{
   var game = this;
   var str = "veriffazjogadaAzulP";
   var strPiece;

   if(posTomove != null)
     strPiece = this.getTranslatedPos(posTomove);

  str = str + strPiece;
  this.client.getPrologRequest(str, function(data) {
    if(data.target.responseText == 1)
    {
      game.fazjogadaAzul(posTomove,selectedPiece);
      game.changePlayer();
      game.jogada=1;
      game.undid=0;
    }
    else if(data.target.responseText == 0)
      console.log("posicao ocupada");
    });
}





Otrio.prototype.possivelJogarVerm = function()
{
  if(this.selectedPiece >= this.minPazulPick && this.selectedPiece <= this.maxPazulPick) //Corrige bug jogadaPC causado por delay do prolog
  {
        this.reset_Seleccoes();
        return;
  }
   var game = this;
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
  this.client.getPrologRequest(str, function(data) {
    if(data.target.responseText == 1)
      console.log("É possivel jogar essa peça");
    else
      console.log("NÃO é possivel jogar essa peça");
    });
}


Otrio.prototype.possivelJogarAzul = function()
{
  if(this.selectedPiece >= this.minPvermelhoPick && this.selectedPiece <= this.maxPvermelhoPick) //Corrige bug jogadaPC causado por delay do prolog
  {
        this.reset_Seleccoes();
        return;
  }
   var game = this;
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
  this.client.getPrologRequest(str, function(data) {
    if(data.target.responseText == 1)
        console.log("É possivel jogar essa peça");
    else
        console.log("NÃO é possivel jogar essa peça");
    });
}

function parsePos(pos)
{
  var parsedPos;

  switch(pos)
  {
      case "[0,0]":
         parsedPos= 0;
        break;
      case "[0,1]":
         parsedPos= 1;
        break;
      case "[0,2]":
         parsedPos= 2;
        break;
      case "[1,0]":
         parsedPos= 3;
        break;
      case "[1,1]":
         parsedPos= 4;
        break;
      case "[1,2]":
         parsedPos= 5;
        break;
      case "[2,0]":
         parsedPos= 6;
        break;
      case "[2,1]":
         parsedPos= 7;
        break;
      case "[2,2]":
         parsedPos= 8;
        break;

  }
  return parsedPos;
}
