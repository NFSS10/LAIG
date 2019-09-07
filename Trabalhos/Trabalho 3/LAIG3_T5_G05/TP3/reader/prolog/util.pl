%Da replace na lista dado o indx(I) e o valor pretendido(X) devolva a lista modificada

replace([_|T], 0, X, [X|T]).
replace([H|T], I, X, [H|R]):- I > 0,	
							  I1 is I-1,
							  replace(T, I1, X, R).




%Coloca peca na ListaSai(tabuleiro) e retorna  ListaSai2(tabueiro modificado) sendo X,Y as coordenadas, P a peça, Elem (n1,n2,n3) conforme o tamanho da peça, Fila indica Y em cada bloco ex:0 para grande.

colocarpecaaux(X,Y,P,Fila,Elem,ListaSai,ListaSai2):-nth0(Y,ListaSai,Elemento,Resto), 
										nth0(Fila,Elemento,Elemento2,Resto2),
										nth0(X,Elemento2,Elemento3,Resto3),
										Elemento3=Elem,
										replace(Elemento2, X, P, Lis),
										replace(Elemento,Fila,Lis,List),
										replace(ListaSai,Y,List,ListaSai2).

colocarpeca(X,Y,P,Fila,Elem,ListaSai,ListaSai2):-colocarpecaaux(X,Y,P,Fila,Elem,ListaSai,ListaSai2).									
colocarpeca(X,Y,P,Fila,Elem,ListaSai,ListaSai2):- nl, write('Posicao ocupada!'),fail.

%Nao mostra mensagem de erro
colocarpecaB(X,Y,P,Fila,Elem,ListaSai,ListaSai2):-colocarpecaaux(X,Y,P,Fila,Elem,ListaSai,ListaSai2).



getcolor(Peca,Cor):- atom_chars(Peca,Char),
					nth0(0,Char,Cor,Resto2).

getsize(Peca,Tamanho):- atom_chars(Peca,Char),
					nth0(1,Char,Tamanho,Resto2).

					
					
					
					
%Verifica se a peca existe no Set
verificapeca(Set,Peca,Tamanho):- 
							   nth0(0,Set,Lista,Resto2),
							   nth0(Tamanho,Lista,Lista2,Resto3),
							   member(Peca,Lista2).
							   
verificapeca(Set,Peca,Tamanho):- nl, write('Peca indisponivel para jogar'),fail.
							   
							   

%Modifica a primeira ocurrencia de Old na lista Old por New e devolve a lista New -> changeFst(Old,ListaOld,New,ListaNew).

changeFst(Old,[Old|Olds],New,[New|Olds]).
changeFst(Old,[E|Olds],New,[E|News]):-
   dif(Old, E),
   changeFst(Old,Olds,New,News).

 
%Remove peca do Set e devolve o set modificado 

removepeca(Set,Peca,Tamanho,Newset):- nth0(0,Set,Lista,Resto2),
							 nth0(Tamanho,Lista,Lista2,Resto3),
							 changeFst(Peca,Lista2,n3,Newlist),
							 replace(Lista, Tamanho, Newlist, NNewlist),
							 replace(Set, 0, NNewlist, Newset).
	

							
%Lista o indice de um elemento numa lista

indexOf([Element|_], Element, 0).
indexOf([_|Tail], Element, Index):-
  indexOf(Tail, Element, Index1),
  Index is Index1+1.			 

  

%interpola x com cada elemento da lista e retorna ListaSaida

interpolate(X,[],[]).
interpolate(X,[Element|Tail],ListaSaida):-append([],[[Element,X]],Lista),
											interpalate(X,Tail,Lista,ListaSaida).		

interpalate(_,[],List,List).
interpalate(X,[Element|Tail],Lista,ListaSaida):-append(Lista,[[Element,X]],List),
											interpalate(X,Tail,List,ListaSaida).											
									

%devove coordenadas livres duma linha, Elemento= n1,n2,n3 conforme tamanho, Y =0,1,2 conforme o Y no tabuleiro,devolve Listacoor

coordenadaslivre(Linha,Y,Elemento,ListaCoor) :- findall(Index,indexOf(Linha,Elemento,Index),Bag),
													 interpolate(Y,Bag,ListaCoor).
										