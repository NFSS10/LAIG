:- ensure_loaded(util).

%Faz jogada do jogador X 
%X: coord x
%Y: coord y
%Peca: Peca a ser jogada
%Set: Set antes de remover peca
%NewSet: Set depois de removida peca
%___________________3 tamanhos diferentes  ___________________
jogadaX(X,Y,Peca,Set,NewSet):-getsize(Peca,Size),
									Size='1',!,
									board(Board),!,
									verificapeca(Set,Peca,2),!,
									removepeca(Set,Peca,2,NewSet),!,
									colocarpeca(X,Y,Peca,2,n1,Board,Newboard),
									retract(board(Board)),
									asserta(board(Newboard)).
								
						 
jogadaX(X,Y,Peca,Set,NewSet):-getsize(Peca,Size),
									Size='2',!,
									board(Board),!,
									verificapeca(Set,Peca,1),!,
									removepeca(Set,Peca,1,NewSet),!,
									colocarpeca(X,Y,Peca,1,n2,Board,Newboard),
									retract(board(Board)),
									asserta(board(Newboard)).
							
						 
jogadaX(X,Y,Peca,Set,NewSet):-getsize(Peca,Size),
									Size='3',!,
									board(Board),!,
									verificapeca(Set,Peca,0),!,
									removepeca(Set,Peca,0,NewSet),!,
									colocarpeca(X,Y,Peca,0,n3,Board,Newboard),
									retract(board(Board)),
									asserta(board(Newboard)).
%___________________3 tamanhos diferentes  ___________________
						 



						 
%Faz jogada do jogador 1 ou 2 
%X: coord x
%Y: coord y
%Peca: Peca a ser jogada
jogadajogador1(X,Y,Peca):-	p1Set(Set),!,
							jogadaX(X,Y,Peca,Set,NewSet),
							retract(p1Set(Set)),
							asserta(p1Set(NewSet)).
													
jogadajogador2(X,Y,Peca):-	p2Set(Set),!,
							jogadaX(X,Y,Peca,Set,NewSet),
							retract(p2Set(Set)),
							asserta(p2Set(NewSet)).
											

			 
						

%Devolve jogadas possiveis para uma peça tamanho X
%ListaJogadas: lista com as jogadas possiveis
%Elemento: n3, n2 ou n1
%Linha é: a linha em cada bloco (ex:0 para grande)
jogadapossivelX(ListaJogadas,Elemento,Linha):- board(Board),
									 nth0(0,Board,Bloco1,Resto1), 
									 nth0(Linha,Bloco1,Linha1,Resto2),
									 coordenadaslivre(Linha1,0,Elemento,ListaCoor1),
									 nth0(1,Board,Bloco2,Resto3), 
									 nth0(Linha,Bloco2,Linha2,Resto4),
									 coordenadaslivre(Linha2,1,Elemento,ListaCoor2),
									 nth0(2,Board,Bloco3,Resto5), 
									 nth0(Linha,Bloco3,Linha3,Resto6),
									 coordenadaslivre(Linha3,2,Elemento,ListaCoor3),
									 append(ListaCoor1,ListaCoor2,ListaMetade),
									 append(ListaMetade,ListaCoor3,ListaJogadas).
									 
%devolve em ListaJogadas a lista de jogadas permitidas para cada tipo de peça
jogadapossivelgrande(ListaJogadas):- jogadapossivelX(ListaJogadas,n3,0).	
jogadapossivelmedia(ListaJogadas):- jogadapossivelX(ListaJogadas,n2,1).	
jogadapossivelpequena(ListaJogadas):- jogadapossivelX(ListaJogadas,n1,2).				 
									 
									 
%Faz jogada random
escolherPeca(Set,Peca):- nth0(0,Set,RealSet,Resto1),
						 nth0(0,RealSet,Grandes,Resto2),	
						 nth0(1,RealSet,Medias,Resto3),	
						 nth0(2,RealSet,Pequenas,Resto4),
						 append(Grandes,Medias,PecasSet),
						 append(PecasSet,Pequenas,PecasCompleto),
						 delete(PecasCompleto,n3,Semn3),
						 delete(Semn3,n2,Semn3n2),
						 delete(Semn3n2,n1,PecasExistentes),
						 length(PecasExistentes,Tamanho),!,
						 random(0,Tamanho,Nrandom),
						 nth0(Nrandom,PecasExistentes,Peca,Resto5).
							   
							   					

												
%Faz jogada do computador X 
%Peca: Peca a ser jogada
%Set: Set antes de remover peca
%NewSet: Set depois de removida peca
%___________________3 tamanhos diferentes  ___________________												
jogadacomputadorX(Peca,Set,NewSet):- 
								getsize(Peca,Size),
								Size='3',!,
								jogadapossivelgrande(ListaJogadas),
								length(ListaJogadas,Tamanho),
							    random(0,Tamanho,Nrandom),
								nth0(Nrandom,ListaJogadas,Jogada,Resto1),
								nth0(0,Jogada,X,Resto2),
								nth0(1,Jogada,Y,Resto3),
								jogadaX(X,Y,Peca,Set,NewSet).

jogadacomputadorX(Peca,Set,NewSet):- 
								getsize(Peca,Size),
								Size='2',!,
								jogadapossivelmedia(ListaJogadas),
								length(ListaJogadas,Tamanho),
							    random(0,Tamanho,Nrandom),
								nth0(Nrandom,ListaJogadas,Jogada,Resto1),
								nth0(0,Jogada,X,Resto2),
								nth0(1,Jogada,Y,Resto3),
								jogadaX(X,Y,Peca,Set,NewSet).

jogadacomputadorX(Peca,Set,NewSet):- 
								getsize(Peca,Size),
								Size='1',!,
								jogadapossivelpequena(ListaJogadas),
								length(ListaJogadas,Tamanho),
							    random(0,Tamanho,Nrandom),
								nth0(Nrandom,ListaJogadas,Jogada,Resto1),
								nth0(0,Jogada,X,Resto2),
								nth0(1,Jogada,Y,Resto3),
								jogadaX(X,Y,Peca,Set,NewSet).								
%___________________3 tamanhos diferentes  ___________________
								
								
%Funcao aux para jogada random
jogadacomputadorA(Peca,Set):- 
					         jogadacomputadorX(Peca,Set,NewSet),
							 retract(p1Set(Set)),
							 asserta(p1Set(NewSet)),!.
                      
jogadacomputadorB(Peca,Set):- 
					         jogadacomputadorX(Peca,Set,NewSet),
							 retract(p2Set(Set)),
							 asserta(p2Set(NewSet)),!.					  
				  
				  
				  
				  
%Funcao faz jogada computador
%Dificuldade 2
jogadacomputador1dif2:-
				   p1Set(Set),!,
				   tentaMelhorJogadaR,!,
				   escolherPeca(Set,Peca),!,
				   jogadacomputadorA(Peca,Set).
				   
jogadacomputador2dif2:-
				   p2Set(Set),!,
				   tentaMelhorJogadaB,!,
				   escolherPeca(Set,Peca),!,
				   jogadacomputadorB(Peca,Set).
				   
				   
jogadacomputador1dif1:-
				   p1Set(Set),!,
				   escolherPeca(Set,Peca),!,
				   jogadacomputadorA(Peca,Set).
				
				
%Dificuldade 1
jogadacomputador2dif1:-
				   p2Set(Set),!,
				   escolherPeca(Set,Peca),!,
				   jogadacomputadorB(Peca,Set).
						   

				
				
%Ciclos de jogo		
%Player vs Player		
playpvp :- nl, display,
		   p1Set(Set1),
		   p2Set(Set2),
		   nl,
		   write('JOGADOR 1: '),
		   nl,
		   nl,
		   getPecaInterface(Peca1,Set1),
		   readCoords(X1,Y1,Peca1),
		   jogadajogador1(X1,Y1,Peca1),
		   display,!,
		   verSeGanhou, !,
		   nl,
		   write('JOGADOR 2: '),
		   nl,
		   nl,
		   getPecaInterface(Peca2,Set2),
		   readCoords(X2,Y2,Peca2),
		   jogadajogador2(X2,Y2,Peca2),
		   display,!,
		   nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,
		   verSeGanhou,  !,
		   playpvp.

		   
%Player vs CPU dificuldade 1	   
playpvcdif1 :- nl, display,
		   p1Set(Set1),
		   nl,
		   write('JOGADOR 1: '),
		   nl,
		   nl,
		   getPecaInterface(Peca1,Set1),
		   readCoords(X1,Y1,Peca1),
		   jogadajogador1(X1,Y1,Peca1),!,
		   verSeGanhou,  !,
		   nl,
		   jogadacomputador2dif1,
		   display,!,
		   nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,
		   verSeGanhou,  !,
		   playpvcdif1.
		   

%Player vs CPU dificuldade 2		   
playpvcdif2 :- nl, display,
		   p1Set(Set1),
		   nl,
		   write('JOGADOR 1: '),
		   nl,
		   nl,
		   getPecaInterface(Peca1,Set1),
		   readCoords(X1,Y1,Peca1),
		   jogadajogador1(X1,Y1,Peca1),!,
		   verSeGanhou,  !,
		   nl,
		   jogadacomputador2dif2,
		   display,!,
		   nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,
		   verSeGanhou,  !,
		   playpvcdif2.
		   

%CPU vs CPU dificuldade 1		   
playcvcdif1 :- jogadacomputador1dif1,
		   nl,
		   write('Computador 1: '),
		   display,!, nl,nl,
		   verSeGanhou,!,
		   jogadacomputador2dif1,
		   nl,
		   write('Computador 2: '),
		   display,!, nl,nl,
		   verSeGanhou,!,
		   playcvcdif1.
		   
		   
%CPU vs CPU dificuldade 2	   
playcvcdif2 :- jogadacomputador1dif2,
		   nl,
		   write('Computador 1: '),
		   display,!, nl,nl,
		   verSeGanhou,!,
		   jogadacomputador2dif2,
		   nl,
		   write('Computador 2: '),
		   display,!, nl,nl,
		   verSeGanhou,!,
		   playcvcdif2.
					
				
				
				
				
				
						
%Tenta fazer a jogada para ganhar
%___________________3 tamanhos diferentes  ___________________
melhJog(X,Y,Peca, LastBoard, NewBoard):-getsize(Peca,Size),
									Size='1',!,
									board(LastBoard),!,
									verificapeca(Set,Peca,2),!,
									removepeca(Set,Peca,2,NewSet),!,
									colocarpecaB(X,Y,Peca,2,n1,LastBoard,Newboard),
									retract(board(LastBoard)),
									asserta(board(Newboard)).
								
						 
melhJog(X,Y,Peca, LastBoard, NewBoard):-getsize(Peca,Size),
									Size='2',!,
									board(LastBoard),!,
									verificapeca(Set,Peca,1),!,
									removepeca(Set,Peca,1,NewSet),!,
									colocarpecaB(X,Y,Peca,1,n2,LastBoard,Newboard),
									retract(board(LastBoard)),
									asserta(board(Newboard)).
							
						 
melhJog(X,Y,Peca, LastBoard, NewBoard):-getsize(Peca,Size),
									Size='3',!,
									board(LastBoard),!,
									verificapeca(Set,Peca,0),!,
									removepeca(Set,Peca,0,NewSet),!,
									colocarpecaB(X,Y,Peca,0,n3,LastBoard,Newboard),
									retract(board(LastBoard)),
									asserta(board(Newboard)).
%___________________3 tamanhos diferentes  ___________________									

						 
%Tenta para os varios tamanhos e cores		
blueG :- jogadapossivelgrande(L),percorreListaJog(L, b3).
blueM :- jogadapossivelmedia(L),percorreListaJog(L, b2).
blueP :- jogadapossivelpequena(L),percorreListaJog(L, b1).
redG :- jogadapossivelgrande(L),percorreListaJog(L, r3).
redM :- jogadapossivelmedia(L),percorreListaJog(L, r2).
redP :- jogadapossivelpequena(L),percorreListaJog(L, r1).	


tentaMelhorJogadaB :- blueG,blueM,blueP.
tentaMelhorJogadaR :- redG,redM,redP.

%PercorreLista de jogadas
percorreListaJog([], Peca).
percorreListaJog([Elem|Rest], Peca):-	
	testaJogada([Elem|Rest], Peca),
	percorreListaJog(Rest, Peca).
	
%Testa a jogada
testaJogada([], Peac).
testaJogada([Elem|Rest], Peca):- nth0(0,[Elem|Rest],Par),
							nth0(0,Par,X),
							nth0(1,Par,Y),
							melhJog(X,Y,Peca, LastBoard, NewBoard),
							verSeGanhou,
							retract(board(NewBoard)),
							assert(board(LastBoard)).					
							
							
							
 