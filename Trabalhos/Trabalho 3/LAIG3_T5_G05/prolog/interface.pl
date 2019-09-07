:- ensure_loaded(draw).
:- ensure_loaded(condicoes).


%posicoes validas
posicaoValidaLin(0).
posicaoValidaLin(1).
posicaoValidaLin(2).
posicaoValidaCol(0).
posicaoValidaCol(1).
posicaoValidaCol(2).

translateCoord('a', 0).
translateCoord('b', 1).
translateCoord('c', 2).




%Pede ao utilizador as coordenadas e recolhe as mesmas
%___________________3 tamanhos diferentes  ___________________
getCoord(Tx, Y,Peca) :- 			
			getsize(Peca,Size),
			Size='3',
			write('Insira a coordenada desejada'), nl,
			write('Coluna ("a", "b" ou "c"): '),
			read(X),
			%
			translateCoord(X, Tx),
			posicaoValidaLin(Tx),
			write('Linha ("0", "1" ou "2"): '),
			read(Y),
			append([Tx],[Y],Coords),
			posicaoValidaCol(Y),
			jogadapossivelgrande(ListaJogadas),!,
			member(Coords,ListaJogadas),
			nl.

getCoord(Tx, Y,Peca) :-		
			getsize(Peca,Size),
			Size='2',
			write('Insira a coordenada desejada'), nl,
			write('Coluna ("a", "b" ou "c"): '),
			read(X),
			%
			translateCoord(X, Tx),
			posicaoValidaLin(Tx),
			write('Linha ("0", "1" ou "2"): '),
			read(Y),
			append([Tx],[Y],Coords),
			posicaoValidaCol(Y),
			jogadapossivelmedia(ListaJogadas),!,
			member(Coords,ListaJogadas),
			nl.
			
getCoord(Tx, Y,Peca) :- 
			getsize(Peca,Size),
			Size='1',
			write('Insira a coordenada desejada'), nl,
			write('Coluna ("a", "b" ou "c"): '),
			read(X),
			%
			translateCoord(X, Tx),
			posicaoValidaLin(Tx),
			write('Linha ("0", "1" ou "2"): '),
			read(Y),
			append([Tx],[Y],Coords),
			posicaoValidaCol(Y),
			jogadapossivelpequena(ListaJogadas),!,
			member(Coords,ListaJogadas),
			nl.
%___________________3 tamanhos diferentes  ___________________

%Pede para ler as coordenadas onde quer jogar
%X: coord x
%Y: coord y
%Peca: peca escolhida
readCoords(X,Y,Peca) :-getCoord(X,Y,Peca).
readCoords(X,Y,Peca) :- nl, nl, write('Posicao indisponivel ou ocupada'),nl, nl, readCoords(X,Y,Peca).


%Pede ao utilizador a peca que quer jogar
%Peca: peca escolhida
getPecaInterface(Peca,Set) :- write('----  Insira a peca desejada (corTamanho)!  ----'),nl,
							  write('Jogador 1 - pecas vermelhas (r3,r2,r1)'),nl,
							  write('Jogador 2 - pecas azuis (b3,b2,b1)'),nl,
							  write('Peca desejada: '),nl,
					          read(Peca),
					          verificaPecaSet(Peca,Set).
				 
getPecaInterface(Peca,Set) :-  nl,nl, write('Peca nao disponivel!'), nl,nl,  getPecaInterface(Peca,Set).

					 
					 
%Verifica se a Peca existe no Set
%Peca: peca a verficiar existencia
%Set: onde queremos ver se existe
verificaPecaSet(Peca,Set) :-   nth0(0,Set,RealSet,Resto1),
							   nth0(0,RealSet,Grandes,Resto2),	
							   nth0(1,RealSet,Medias,Resto3),	
							   nth0(2,RealSet,Pequenas,Resto4),
							   append(Grandes,Medias,PecasSet),
							   append(PecasSet,Pequenas,PecasCompleto),
							   delete(PecasCompleto,n3,Semn3),
							   delete(Semn3,n2,Semn3n2),
							   delete(Semn3n2,n1,PecasExistentes),
							   length(PecasExistentes,Tamanho),!,	
							   member(Peca,PecasExistentes).
							   
							   
							   
							   
%Pergunta o modo de jogo a jogar
%Tipo: modo de jogo escolhido
escolhetipojogo(Tipo):-write('Escolha o tipo de jogo'),nl,
					   write('dificuldade 1: 1-pvp 2-pvc 3-cvc'),nl,
					   write('dificuldade 2: 4-pvc 5-cvc'),
					   nl,
					   read(Tipo),
					   opcaovalida(Tipo).
					   
escolhetipojogo(Tipo):-write('Opcao Invalida!'),nl,escolhetipojogo(Tipo).





%Começa o tipo de jogo
play2(Tipo):- 
	   Tipo=1,
	   playpvp.
	   
play2(Tipo):- 
	   Tipo=2,
	   playpvcdif1.

play2(Tipo):- 
	   Tipo=3,
	   playcvcdif1.	   

play2(Tipo):- 
	   Tipo=4,
	   playpvcdif2.

play2(Tipo):- 
	   Tipo=5,
	   playcvcdif2.	   
	   							   
