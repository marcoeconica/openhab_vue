import { reactive } from 'vue'
import { authStore } from './store/auth.js'

export const store = reactive({
  areas: [
    {
      name: 'Soggiorno',
      img: '/img/soggiorno.webp',
      items:[]
    },
    {
      name: 'Cucina',
      img: '/img/cucina.webp',
      items:[]
    },
    {
      name: 'Bagno Principale',
      img: '/img/bagno_principale.webp',
      items:[]
    },
    {
    name: 'Camera Matrimoniale',
    img: '/img/camera_matrimoniale.webp',
    items: []
    },
    {
      name: 'Camera Ospiti',
      img: '/img/camera_singola.webp',
      items: []
    },
    {
      name: 'Camera Bambini',
      img: '/img/camera_bambini.webp',
      items: []
    },
    {
      name: 'Camera Bambini A',
      img: '/img/camera_bambini.webp',
      items: []
    },
    {
      name: 'Camera Bambini B',
      img: '/img/camera_bambini.webp',
      items: []
    },
    {
      name: 'Camera Bambini 2',
      img: '/img/camera_bambini.webp',
      items: []
    },
    {
      name: 'Camera Bambini 2A',
      img: '/img/camera_bambini.webp',
      items: []
    },
    {
      name: 'Camera Bambini 2B',
      img: '/img/camera_bambini.webp',
      items: []
    },
    {
      name: 'Camera Singola',
      img: '/img/camera_singola.webp',
      items: []
    },
    {
      name: 'Camera Singola A',
      img: '/img/camera_singola.webp',
      items: []
    },
    {
      name: 'Camera Singola B',
      img: '/img/camera_singola.webp',
      items: []
    },
    {
      name: 'Camera Singola C',
      img: '/img/camera_singola.webp',
      items: []
    },
    {
      name: 'Bagno Servizio',
      img: '/img/bagno_ospiti.webp',
      items: []
    },
    {
      name: 'Bagno Ospiti',
      img: '/img/bagno_ospiti.webp',
      items: []
    },
    {
      name: 'Bagno Tavernetta',
      img: '/img/bagno_ospiti.webp',
      items: []
    },
    {
      name: 'Sala da Pranzo',
      img: '/img/sala_da_pranzo.webp',
      items: []
    },
    {
      name: 'Dispensa',
      img: '/img/dispensa.webp',
      items: []
    },
    {
      name: 'Studio',
      img: '/img/studio.webp',
      items: []
    },
    {
      name: 'Studio A',
      img: '/img/studio.webp',
      items: []
    },
    {
      name: 'Studio B',
      img: '/img/studio.webp',
      items: []
    },
    {
      name: 'Studio C',
      img: '/img/studio.webp',
      items: []
    },
    {
      name: 'Sala Giochi',
      img: '/img/tavernetta.webp',
      items: []
    },
    {
      name: 'Palestra',
      img: '/img/palestra.webp',
      items: []
    },
    {
      name: 'Sala Hobby',
      img: '/img/sala_hobby.webp',
      items: []
    },
    {
      name: 'Cantina',
      img: '/img/cantina.webp',
      items: []
    },
    {
      name: 'Lavanderia',
      img: '/img/lavanderia.webp',
      items: []
    },
    {
      name: 'Ripostiglio',
      img: '/img/ripostiglio.webp',
      items: []
    },
    {
      name: 'Ripostiglio A',
      img: '/img/ripostiglio.webp',
      items: []
    },
    {
      name: 'Ripostiglio B',
      img: '/img/ripostiglio.webp',
      items: []
    },
    {
      name: 'Garage',
      img: '/img/garage.webp',
      items: []
    },
    //******************************************** */
    {
      name: 'Mansarda',
      img: '/img/mansarda.webp',
      items: []
    },
    {
      name: 'Veranda',
      img: '/img/veranda.webp',
      items: []
    },
    {
      name: 'Giardino',
      img: '/img/giardino.webp',
      items: []
    },
    {
      name: 'Piscina',
      img: '/img/piscina.webp',
      items: []
    },
    {
      name: 'Spa',
      img: '/img/spa.webp',
      items: []
    },
    {
      name: 'Tavernetta',
      img: '/img/tavernetta.webp',
      items: []
    },
    {
      name: 'Sala Eventi',
      img: '/img/sala_eventi.webp',
      items: []
    },
    {
      name: 'Ingresso',
      img: '/img/ingresso.webp',
      items: []
    },
    {
      name: 'Corridoio A',
      img: '/img/corridoio_a.webp',
      items: []
    },
    {
      name: 'Corridoio B',
      img: '/img/corridoio_b.webp',
      items: []
    },
    {
      name: 'Corridoio C',
      img: '/img/corridoio_c.webp',
      items: []
    },
    {
      name: 'Corridoio D',
      img: '/img/corridoio_d.webp',
      items: []
    }
    ],
  items: [],
  state: {  
  },
  methods: {
//*************************************************************/
//******************* FUNZIONI DI CALCOLO *********************/
//*************************************************************/
      //TOTALE ELEMENTI IN UN'AREA
      totaleElementiArea(area) {
        let somma = 0;
        area.items.forEach(item => {
          if(!item.label.toLowerCase().includes('vibrazione')){
            somma++;
          }
        });
        return somma;
      },
      //TOTALE ELEMENTI APERTI IN UN'AREA
      sommaElementiAperti(area) {
        let somma = 0;
        area.items.forEach(item => {
          if (item.state === 'OPEN') {
            somma++;
          };
        });
        return somma;
      },
      //TOTALE ELEMENTI APERTI generico
      totaleElementiAperti() {
        let somma = 0;
        store.areas.forEach(area => {
          somma += this.sommaElementiAperti(area);
        });
        return somma;
      },
      //TOTALE ELEMENTI generico
      totaleElementi() {
        let somma = 0;
        store.areas.forEach(area => {
          area.items.forEach(item => {
            if(!item.label.toLowerCase().includes('vibrazione')){
              somma++;
            };
          });
        });
        return somma;
      },
      //TOTALE ELEMENTI APERTI DELLA SINGOLA TIPOLOGIA (finestra, porta, etc...)
      elementiAperti(elementi){
        let somma = 0;

        store.areas.forEach(area => {
          area.items.forEach(item => {
            if(item.state === 'OPEN' && item.label.includes(elementi)){
              somma++;
            };
          });
        });
        return somma;
      },
      //TOTALE ELEMENTI CHIUSI DELLA SINGOLA TIPOLOGIA (finestra, porta, etc...)
      elementiChiusi(elementi){
        let somma = 0;
        store.areas.forEach(area => {
          area.items.forEach(item => {
            if(item.state === 'CLOSED' && item.label.includes(elementi)){
              somma++;
            };
          });
        });
        return somma;
      },
      //TOTALE ELEMENTI APERTI A BASCULA
      elementiBascula(){
        let somma = 0;
        store.areas.forEach(area => {
          area.items.forEach(item => {
            if(item.state === 'TILTED'){
              somma++;
            };
          });
        });
        return somma;
      },
      //TOTALE ELEMENTI DI UNA SINGOLA TIPOLOGIA (finestra, porta, etc...)
      TotElementi(elemento){
        let somma = 0;
        store.areas.forEach(area => {
          area.items.forEach(item => {
            if(item.label.includes(elemento) && !item.label.includes('Vibrazione')){
              somma++;
            };
          });
        });
        return somma;
      },
      // CALCOLA SERRANDA APERTE, SOCCHIUSE, CHIUSE
      serrandeCalculator(){
        let sommaAperte = 0;
        let sommaChiusa = 0;
        let sommaSocchiusa = 0;
        store.areas.forEach(area => {
          area.items.forEach(item => {
            if(item.label.includes('Serranda')){
              if(item.state >= 20){
                sommaAperte++;
              }
              if(item.state < 20 && item.state >= 5){
                sommaSocchiusa++;
              }
              if(item.state < 5){
                sommaChiusa++;
              };
            };
          });
        });
        return {
          aperte: sommaAperte,
          socchiusa: sommaSocchiusa,
          chiusa: sommaChiusa
        };
      },
//*************************************************************/
//********************* COMANDI SERRANDE **********************/
//*************************************************************/



      // FUNZIONE PER I BOTTONI SU, GIU, STOP DELLA SERRANDA
      async sendCommand(itemName, command) {
        try {
          const response = await fetch(`https://abcdomotics.econica.it/rest/items/${encodeURIComponent(itemName)}`, {
            method: 'POST', // oppure 'PUT' se le tue API lo richiedono
            headers: {
              "Content-Type": "text/plain",  // o "text/plain; charset=utf-8"
              "Authorization": "Basic " + btoa(`${authStore.username}:${authStore.password}`),
              "Bearer-Token": authStore.token 
            },
            body: command
          });

          if (!response.ok) {
            throw new Error(`Errore nell'invio del comando: ${response.status} ${response.statusText}`);
          }

          // console.log(`Comando "${command}" inviato correttamente a ${itemName}.`);
        } catch (err) {
          console.error("Errore durante l'invio del comando:", err.message);
        }
      },



      // FUNZIONE PER APRIRE AL 100%, CHIUDERE (0%) O APRIRE A METÀ (50%) la serranda
      async setRollerShutterPosition(itemName, position) {
        // Per sicurezza, controlliamo che `position` sia 0, 50 o 100
        if (![0, 50, 100].includes(position)) {
          console.error(`Posizione non valida: ${position}`);
          return;
        }

      try {
        const response = await fetch(`https://abcdomotics.econica.it/rest/items/${encodeURIComponent(itemName)}`, {
          method: 'POST',
          headers: {
            "Content-Type": "text/plain",
            "Authorization": "Basic " + btoa(`${authStore.username}:${authStore.password}`),
            "Bearer-Token": authStore.token 
          },
          // Il body è la percentuale che vuoi impostare, in formato stringa
          body: position.toString()
        });

        if (!response.ok) {
          throw new Error(`Errore nell'invio del comando: ${response.status} ${response.statusText}`);
        }

        // console.log(`Posizione ${position}% inviata correttamente all'item "${itemName}".`);
      } catch (err) {
        console.error("Errore durante l'invio del comando:", err.message);
      }
    },
    
  }

})