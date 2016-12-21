:- ensure_loaded(main).

%Devolve o board
parse_input(board, X):- board(X).

%jogadaVermPossivel? 1 se sim, 0 se n
parse_input(jogadaVermPossivel(Peca), Res):- Res is 1, p1Set(Set), verificaPecaSet(Peca,Set).
parse_input(jogadaVermPossivel(Peca), Res):- Res is 0.

%jogadaAzulPossivel? 1 se sim, 0 se n
parse_input(jogadaAzulPossivel(Peca), Res):- Res is 1, p2Set(Set), verificaPecaSet(Peca,Set).
parse_input(jogadaAzulPossivel(Peca), Res):- Res is 0.