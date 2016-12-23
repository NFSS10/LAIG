:- ensure_loaded(main).

%Devolve o board
parse_input(board, X):- board(X).


%Verifica se é possivel o jogador a peca
%jogadaVermPossivel? 1 se sim, 0 se n
parse_input(jogadaVermPossivel(Peca), Res):- Res is 1, p1Set(Set), verificaPecaSet(Peca,Set).
parse_input(jogadaVermPossivel(Peca), Res):- Res is 0.

parse_input(jogadaAzulPossivel(Peca), Res):- Res is 1, p2Set(Set), verificaPecaSet(Peca,Set).
parse_input(jogadaAzulPossivel(Peca), Res):- Res is 0.



%Verifica se é possivel fazer a jogada para a casa selecionada
%G = grande, M = media, P = pequeno
%Res = 1 sucesso, Res = 0 falhou
parse_input(veriffazjogadaVermG(X, Y), Res):- Res is 1, append([X],[Y],Coords), jogadapossivelgrande(ListaJogadas),member(Coords,ListaJogadas).
parse_input(veriffazjogadaVermG(X, Y), Res):- Res is 0.
parse_input(veriffazjogadaVermM(X, Y), Res):- Res is 1, append([X],[Y],Coords), jogadapossivelmedia(ListaJogadas),member(Coords,ListaJogadas).
parse_input(veriffazjogadaVermM(X, Y), Res):- Res is 0.
parse_input(veriffazjogadaVermP(X, Y), Res):- Res is 1, append([X],[Y],Coords), jogadapossivelpequena(ListaJogadas),member(Coords,ListaJogadas).
parse_input(veriffazjogadaVermP(X, Y), Res):- Res is 0.

parse_input(veriffazjogadaAzulG(X, Y), Res):- Res is 1, append([X],[Y],Coords), jogadapossivelgrande(ListaJogadas),member(Coords,ListaJogadas).
parse_input(veriffazjogadaAzulG(X, Y), Res):- Res is 0.
parse_input(veriffazjogadaAzulM(X, Y), Res):- Res is 1, append([X],[Y],Coords), jogadapossivelmedia(ListaJogadas),member(Coords,ListaJogadas).
parse_input(veriffazjogadaAzulM(X, Y), Res):- Res is 0.
parse_input(veriffazjogadaAzulP(X, Y), Res):- Res is 1, append([X],[Y],Coords), jogadapossivelpequena(ListaJogadas),member(Coords,ListaJogadas).
parse_input(veriffazjogadaAzulP(X, Y), Res):- Res is 0.




%Faz a jogada
parse_input(fazjogadaVerm(X, Y, Peca), Res):-	Res is 1, jogadajogador1(X,Y,Peca).
parse_input(fazjogadaVerm(X, Y, Peca), Res):-	Res is 0.

parse_input(fazjogadaAzul(X, Y, Peca), Res):-	Res is 1, jogadajogador2(X,Y,Peca).
parse_input(fazjogadaAzul(X, Y, Peca), Res):-	Res is 0.


%Verifica se acabou (vitoria ou empate)
parse_input(verifVitoria, Res):-	Res is 0, verSeGanhou.
parse_input(verifVitoria, Res):-	Res is 1.



%reseta o tabuleiro e os sets.
parse_input(resetgame,Res):- Res is 1, resetgame.

%escolhe peca do set para jogar
parse_input(escolhePecaAzul, Peca):- p2Set(Set), escolherPeca(Set,Peca).

parse_input(escolhePecaVermelha, Peca):- p2Set(Set), escolherPeca(Set,Peca).

parse_input(jogadaComputador1(Peca), Coords):-	p2Set(Set), tentaMelhorJogadaB, jogadacomputadorB(Peca,Set,X,Y), append([Y],[X],Coords).

%fazjogadacomputador



%, jogadaComputadorX(Peca,Set,NewSet,X,Y), append([X,],[Y],coords).
