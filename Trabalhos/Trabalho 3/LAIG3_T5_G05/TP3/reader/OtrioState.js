function OtrioState(selectedPiece,posTomove){


this.playerTurn;
this.modoJogo;
this.player1Wins;
this.player2Wins;

this.movedPiece=selectedPiece;
this.movedPlace=posTomove;

}

OtrioState.prototype.constructor=OtrioState;
