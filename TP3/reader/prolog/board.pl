:- use_module(library(lists)).

:-dynamic(board/1).
:-dynamic(p1Set/1).
:-dynamic(p2Set/1).
:-dynamic(p3Set/1).
:-dynamic(p4Set/1).

%Tabuleiro
board([
	[[n3,n3,n3],
	[n2,n2,n2],
	[n1,n1,n1]],
	
	[[n3,n3,n3],
	[n2,n2,n2],
	[n1,n1,n1]],
	
	[[n3,n3,n3],
	[n2,n2,n2],
	[n1,n1,n1]]
]).


%Conjunto das peças iniciais dos jogadores
%Conjunto das peças do jogador 1
p1Set([
	[[r3,r3,r3],
	[r2,r2,r2],
	[r1,r1,r1]]
	]).
	
%Conjunto das peças do jogador 2
p2Set([
	[[b3,b3,b3],
	[b2,b2,b2],
	[b1,b1,b1]]
	]).	

%Conjunto das peças do jogador 3
p3Set([
	[[g3,g3,g3],
	[g2,g2,g2],
	[g1,g1,g1]]
	]).

%Conjunto das peças do jogador 4
p4Set([
	[[p3,p3,p3],
	[p2,p2,p2],
	[p1,p1,p1]]
	]).		

%Inicial
p1Setinicial([
 	[[r3,r3,r3],
 	[r2,r2,r2],
 	[r1,r1,r1]]
 	]).
 
 p2Setinicial([
 	[[b3,b3,b3],
 	[b2,b2,b2],
	[b1,b1,b1]]
	]).	
	
boardinicial([
	[[n3,n3,n3],
	[n2,n2,n2],
	[n1,n1,n1]],
	
	[[n3,n3,n3],
	[n2,n2,n2],
	[n1,n1,n1]],
	
	[[n3,n3,n3],
	[n2,n2,n2],
	[n1,n1,n1]]
]).
	
	
	
	