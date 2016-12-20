%linha mesmo tamanho
%horizontal
condVitoria([b3,b3,b3]) :- nl,write(' ###   Jogador 2 ganhou !   ###'),nl.
condVitoria([r3,r3,r3]) :- nl,write(' ###   Jogador 1 ganhou !   ###'),nl.
condVitoria([b2,b2,b2]) :- nl,write(' ###   Jogador 2 ganhou !   ###'),nl.
condVitoria([r2,r2,r2]) :- nl,write(' ###   Jogador 1 ganhou !   ###'),nl.
condVitoria([b1,b1,b1]) :- nl,write(' ###   Jogador 2 ganhou !   ###'),nl.
condVitoria([r1,r1,r1]) :- nl,write(' ###   Jogador 1 ganhou !   ###'),nl.

%diferentes tamanhos
condVitoria([b3,b2,b1]) :- nl,write(' ###   Jogador 2 ganhou !   ###'),nl.
condVitoria([r3,r2,r1]) :- nl,write(' ###   Jogador 1 ganhou !   ###'),nl.
condVitoria([b1,b2,b3]) :- nl,write(' ###   Jogador 2 ganhou !   ###'),nl.
condVitoria([r1,r2,r3]) :- nl,write(' ###   Jogador 1 ganhou !   ###'),nl.



%concentrica
condVitoria([[b3,_,_],[b2,_,_],[b1,_,_]]) :- nl,write(' ###   Jogador 2 ganhou !   ###'),nl.
condVitoria([[_,b3,_],[_,b2,_],[_,b1,_]]) :- nl,write(' ###   Jogador 2 ganhou !   ###'),nl.
condVitoria([[_,_,b3],[_,_,b2],[_,_,b1]]) :- nl,write(' ###   Jogador 2 ganhou !   ###'),nl.
condVitoria([[r3,_,_],[r2,_,_],[r1,_,_]]) :- nl,write(' ###   Jogador 1 ganhou !   ###'),nl.
condVitoria([[_,r3,_],[_,r2,_],[_,r1,_]]) :- nl,write(' ###   Jogador 1 ganhou !   ###'),nl.
condVitoria([[_,_,r3],[_,_,r2],[_,_,r1]]) :- nl,write(' ###   Jogador 1 ganhou !   ###'),nl.

%Verifica se Sets estao vazios
condEmpate([
	[[n3,n3,n3],
	[n2,n2,n2],
	[n1,n1,n1]]
	]).

	
	
	
%Verifica se ganhou e termina o jogo caso alguem ganhe
verSeGanhou :- 	verConcentrica,
				verLinhaDifH,
				verLinhaIgualH,
				verLinhaDifV,
				verLinhaIgualV,
				verLinhaDiag,
				verEmpate.
	
	
	
	
	
	
	
	
	



%Tamanho: Tam, 0 grande, 1 medio, 2 pequeno
%Linha: Lin, 0, 1 ou 2
selectLinhaporTamHor(Tam, Lin, PiecesList) :- escolhebloco(BlocoLinha,Lin), nth0(Tam,BlocoLinha,PiecesList).

%Seleciona a peca do tabuleiro por tamanho
getPiece(Tam, Lin, Col, Piece) :- escolhebloco(BlocoLinha, Lin),
									nth0(Tam,BlocoLinha,PiecesList),
									nth0(Col,PiecesList,Piece).
											


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Mensagens
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
msgVitoria(L):-nl, nl, write('    ********    VITORIA!    ********'),nl,
							write(L),
							fail.
							
msgEmpate :-nl, write('---- Empate ---'), nl,
							fail.
%:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
											





%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Linha diagonal
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%-------- Tamanho igual -----------
%Res e lista com as pecas, por tam selecionado na diagonal (esq. para dir.)
selectLinhaporTamDListA(Tam, Res) :-  getPiece(Tam, 0,0, Piece), append([],[Piece],List),
								getPiece(Tam, 1,1, Piece2), append(List,[Piece2],List2),
								getPiece(Tam, 2,2, Piece3), append(List2,[Piece3],Res).
%Res e lista com as pecas, por tam selecionado na diagonal (dir. para esq.)	
selectLinhaporTamDListB(Tam, Res) :-  getPiece(Tam, 0,2, Piece), append([],[Piece],List),
								getPiece(Tam, 1,1, Piece2), append(List,[Piece2],List2),
								getPiece(Tam, 2,0, Piece3), append(List2,[Piece3],Res).
			


%-------- Tamanho diferente -----------
%Verifica se ganhou com linha diagonal
winCondLinhaMesmoTamD(Tam):- selectLinhaporTamDListA(Tam, Res),
							condVitoria(Res),
							!,
							msgVitoria(Res).
winCondLinhaMesmoTamD(Tam):- selectLinhaporTamDListB(Tam, Res),
							condVitoria(Res),
							!,
							msgVitoria(Res).
				
winCondLinhaMesmoTamD(Tam).
%:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::








%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Concentrica
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Verifica se existe vitoria onde as pecas estao concentricas
%Lin: 0, 1 ou 2
winCondConcentrica(Lin) :- escolhebloco(BlocoLinha,Lin),
							condVitoria(BlocoLinha),
							!,
							msgVitoria(BlocoLinha).
winCondConcentrica(Lin).							
%:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::








%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Linha vertical
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%----------- Tamanho igual ----------------
winCondLinhaMesmoTamV(Tam,Col) :- getPiece(Tam, 0,Col, Piece), append([],[Piece],List),
								getPiece(Tam, 1,Col, Piece2), append(List,[Piece2],List2),
								getPiece(Tam, 2,Col, Piece3), append(List2,[Piece3],PiecesList),
								condVitoria(PiecesList),
								!,
								msgVitoria(PiecesList).
winCondLinhaMesmoTamV(Tam,Lin).



%---------------- Tamanho diferente -------------
winCondLinhaDifV(Col) :- getPiece(0, 0,Col, Piece), append([],[Piece],List),
								getPiece(1, 1,Col, Piece2), append(List,[Piece2],List2),
								getPiece(2, 2,Col, Piece3), append(List2,[Piece3],PiecesList),
								condVitoria(PiecesList),
								!,
								msgVitoria(PiecesList).
winCondLinhaDifV(Col).
%:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::





%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Linha horizontal
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%----------- Tamanho igual ------------
%Verifica se existe vitoria com linha horizontal (Tam: tamanho da peca a verificar, Lin: linha a verificar)
%Na mesma linha tem 3 tamanhos diferentes
%Tam: 0 - grande, 1 - medio, 2 - pequeno
%Lin: 0, 1 ou 2
winCondLinhaMesmoTamH(Tam,Lin) :- selectLinhaporTamHor(Tam, Lin, PiecesList),
							condVitoria(PiecesList),
							!,
							msgVitoria(PiecesList).
winCondLinhaMesmoTamH(Tam,Lin).



%----------- Tamanho diferente ---------------
winCondLinhaDifHA(Lin) :- getPiece(0, Lin,0, Piece), append([],[Piece],List),
								getPiece(1, Lin,1, Piece2), append(List,[Piece2],List2),
								getPiece(2, Lin,2, Piece3), append(List2,[Piece3],PiecesList),
								condVitoria(PiecesList),
								!,
								msgVitoria(PiecesList).
winCondLinhaDifHA(Lin).


winCondLinhaDifHB(Lin) :- getPiece(0, Lin,2, Piece), append([],[Piece],List),
								getPiece(1, Lin,1, Piece2), append(List,[Piece2],List2),
								getPiece(2, Lin,0, Piece3), append(List2,[Piece3],PiecesList),
								condVitoria(PiecesList),
								!,
								msgVitoria(PiecesList).
winCondLinhaDifHB(Lin).
%:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::








%Verificacao de empate
empS1 :- p1Set(Ja), condEmpate(Ja).
empS2 :- p2Set(Jb), condEmpate(Jb).
empate :-  empS1,  empS2, !.


%Ve se ha empate
verEmpate :- empate, !,	msgEmpate.
verEmpate.
					

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Verificam as varias condicoes
%... mudar para ciclo talvez...
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
verLinhaIgualV :-	winCondLinhaMesmoTamV(0,0),
					winCondLinhaMesmoTamV(0,1),
					winCondLinhaMesmoTamV(0,2),
					winCondLinhaMesmoTamV(1,0),
					winCondLinhaMesmoTamV(1,1),
					winCondLinhaMesmoTamV(1,2),
					winCondLinhaMesmoTamV(2,0),
					winCondLinhaMesmoTamV(2,1),
					winCondLinhaMesmoTamV(2,2).	
					
verLinhaDifV :- winCondLinhaDifV(0),
				winCondLinhaDifV(1),
				winCondLinhaDifV(2),
				winCondLinhaDifV(0),
				winCondLinhaDifV(1),
				winCondLinhaDifV(2).
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
				
verLinhaIgualH :-	winCondLinhaMesmoTamH(0,0),
					winCondLinhaMesmoTamH(0,1),
					winCondLinhaMesmoTamH(0,2),
					winCondLinhaMesmoTamH(1,0),
					winCondLinhaMesmoTamH(1,1),
					winCondLinhaMesmoTamH(1,2),
					winCondLinhaMesmoTamH(2,0),
					winCondLinhaMesmoTamH(2,1),
					winCondLinhaMesmoTamH(2,2).

verLinhaDifH :- winCondLinhaDifHB(0),
				winCondLinhaDifHB(1),
				winCondLinhaDifHB(2),
				winCondLinhaDifHA(0),
				winCondLinhaDifHA(1),
				winCondLinhaDifHA(2).
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

verConcentrica :- winCondConcentrica(0),
					winCondConcentrica(1),
					winCondConcentrica(2).
					
					
verLinhaDiag :- winCondLinhaMesmoTamD(0),
				winCondLinhaMesmoTamD(1),
				winCondLinhaMesmoTamD(2).
				

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%













