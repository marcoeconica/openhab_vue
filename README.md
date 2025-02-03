# ABCDomotics


# Aggiungere un item:
1. Registra l'item su openHab
2. Dagli una label che segua questa sintassi:
- [Categoria] [Location] [Aggettivi(opzionale)] separate da spazio
- [Categoria] -> Finestra, Serranda, Porta, etc.
- [Location] -> Soggiorno, Camera Matrimoniale, etc. (Deve essere presente in store.areas)
- [Aggettivi] -> qualsiasi keyword che vogliamo aggiungere ad un item per distinguerlo da altri item con la stessa categoria e location
- La label deve avere almeno uno spazio per essere letta correttamente
- Esempio: Serranda (Categoria) Soggiorno (Location) Nord (Aggettivo) -> Label: Serranda Soggiorno Nord

- Se la label deve essere di una sola parola, aggiungi uno spazio alla fine. Esempio: "Serranda "

3. con questa sintassi l'applicativo lavora in autonomia, non è necessario aggiungere nulla al codice, anche modificando da openHab l'item verrà aggiornato automaticamente








# prossimi passi
- test deploy
- geolocalizzazione
- notifiche push
- colori / logo / img