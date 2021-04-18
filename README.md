# Gare
Jeu de simulation d'une gare

## Fonctionnement

	Arrivées :
	* Vous devez faire arriver des trains. Pour ça, vous devez vous référer à un train dans la colonne des arrivées.
	* Prenons "INTERCITE 1138 590 LE HAVRE"
	* INTERCITE est le type, 1138 est le numéro, 590 est à le moment de son arrivée, LE HAVRE est sa destination
	* Pour le faire arriver en gare, il faut choisir un quai de libre quand son moment d'arrivée arrivera.
	* Une fois le quai trouvé (prenons quai D), indiquer à l'ordi que vous vous l'y envoyer grâce à cette commande :
	* 1138 arriver D
	* normalement, une notification s'affiche
	* une fois le train arrivé, soit vous l'envoyez au hangar [1138 hangar] ou vous l'assigner à un train de départ.
	
	Quais (de haut en bas) :
	- D
	- C
	- B
	- A
	
	VARIABLES :
	- NUM :				-> Numéro du train
	- TYPE :			-> Type de train : INTERCITE, TGV et TER
	- TIME : 			-> « l'heure », c'est à dire la seconde selon l'horloge affichée
	
	COMMANDES :
	- NUM gare TYPE quai LETTRE	-> Amener un nouveau train à quai
	- NUM départ TIME		-> Lancer le départ d'un train (à partir de TIME sec)
	- NUM hangar			-> Envoyé un train arrivé au garage
	- NUM arriver LETTRE		-> Assigné un quai à un train qui arrive
	- NUM assigner numero NUM	-> Assigné à un train un nouveau numéro (utile pour s'adapter au planning)