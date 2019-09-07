:- ensure_loaded(board).


%Traduz os simbolos para uma representação mais agradável
translate(r3,'|    R()   '). translate(g3,'|    G()   '). translate(b3,'|    B()   '). translate(p3,'|    P()   '). 
translate(r2,'|    RO    '). translate(g2,'|    GO    '). translate(b2,'|    BO    '). translate(p2,'|    PO    '). 
translate(r1,'|    R*    '). translate(g1,'|    G*    '). translate(b1,'|    B*    '). translate(p1,'|    P*    ').
translate(n3,'|    --    '). 
translate(n2,'|    --    '). 
translate(n1,'|    --    ').
	
%Seleciona a linha do tabuleiro de indice N, 0->topo, 1->meio, 2->baixo
escolhebloco(BlocoLinha,N) :- board(Board), nth0(N,Board,BlocoLinha).

%Desenham os conjuntos iniciais de peças, fora da zona de jogo, referente a cada jogador
printSetP3(Tam,Pos) :- write('  '), condPrintNum(Tam,Pos), p3Set(X), nth0(0,X,V), nth0(Tam,V,V2), nth0(Pos,V2,Elem), displayPiece(Elem), write('|+').
printSetP4(Tam,Pos) :- write('|+'), p4Set(X), nth0(0,X,V), nth0(Tam,V,V2), nth0(Pos,V2,Elem), displayPiece(Elem).
printSetP1 :- p1Set(X), nth0(N,X,T), display_bloco(T).
printSetP2 :- p2Set(X), nth0(N,X,T), display_bloco(T).

%Usado para desenhar os numeros do lado esquerdo
condPrintNum(X,N):- X \==1, write('   ').
condPrintNum(1,N):-write('  '), write(N).


semSet3(Tam,Pos) :- write('             '), condPrintNum(Tam,Pos), write('|+').
semSet4 :- write('|+').



%Desenha a peça
displayPiece(Piece) :- translate(Piece, Plem),
	write(Plem).

			
%desenha uma fila da lista obtida atraves de escolhe
display_row([]).
display_row([Elem|Rest]):-
	displayPiece(Elem),
	display_row(Rest).

%Desenha o bloco da linha
%com set3 e 4 
%display_bloco([], N, Pos):- write('     |----------|+|----------|----------|----------|+|----------|').

%normal
display_bloco([], N, Pos):- write('                |+|----------|----------|----------|+|').
display_bloco([Elem|Rest], N, Pos):-
	%printSetP3(Pos,N),
	semSet3(Pos,N),
	display_row(Elem),
	%printSetP4(Pos,N),
	semSet4,
	write('|'),
	nl,
	Pos1 is Pos +1,
	display_bloco(Rest, N,Pos1).

%Desenha o bloco (so com 1 argumento, usado para os conjuntos inicias de peças)
display_bloco([]):- write('                |||----------|----------|----------|||').
display_bloco([Elem|Rest]):-
	write('                ||'),
	display_row(Elem),
	write('|||'),
	nl,
	display_bloco(Rest).
	
%Desenha o tabuleiro de jogo
display_board([],N).
display_board([Board|Rest],N):-	
	Pos is 0,
	escolhebloco(X,N),
	display_bloco(X, N, Pos),
	nl,
	N1 is N+1,
	display_board(Rest,N1).
	 

%Desenha o tabuleiro completo
display:- board(X),
	nl, write('                        A          B          C       '),
	nl, write('                |||----------|----------|----------|||'),
	nl, printSetP1,
	nl, write('                |++++++++++++++++++++++++++++++++++++|'),
	%com set3 e 4: nl, write('     |----------|+|----------|----------|----------|+|----------'),
	nl, write('                |+|----------|----------|----------|+|'),
	nl,
	display_board(X,0),
		write('                |++++++++++++++++++++++++++++++++++++|'),
	nl, write('                |||----------|----------|----------|||'),
	nl, printSetP2.

