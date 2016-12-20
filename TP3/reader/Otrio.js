function Otrio(){

this.client = new Client();

pl_board = null;

}

Otrio.prototype.constructor=Otrio;



Otrio.prototype.getPl_Board = function(){
  var game=this;

  this.client.getPrologRequest("board", function(data) {
    game.pl_board=data.target.responseText;
  });
}