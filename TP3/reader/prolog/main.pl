:- ensure_loaded(interface).
:- ensure_loaded(logic).
:- use_module(library(random)).
 
%Opccoes de jogo validas
opcaovalida(1).
opcaovalida(2).
opcaovalida(3).
opcaovalida(4).
opcaovalida(5).


	   
%verifica se a opcao foi correta e avanca se sim 
play:- escolhetipojogo(Tipo),!,
	   play2(Tipo).


%Comando para iniciar o jogo	   
playGame:-play.
	   
playGame:- display, nl,write('____GAME OVER____'),nl,nl,
 			resetgame,
 			playGame.
 
 
%Reset ao que é necessario para poder jogar novamente apos ter acabado
resetgame:- board(Board2),
 			boardinicial(Board),
 			retract(board(Board2)),
 			asserta(board(Board)),
 			p1Setinicial(P1Set),
 			asserta(p1Set(P1Set)),
 			p2Setinicial(P2Set),
 			asserta(p2Set(P2Set)). 

			
			
			
			
			
			
			
			
			

