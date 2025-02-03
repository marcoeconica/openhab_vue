<template>
<!-- FILTRI -->
<div class="btn-group filtri bg_secondary_blue">
  <h6 class="custom-color px-2" v-if="currentCategory == ' '">Scegli una categoria</h6>
  <button @click="filterItems('finestra')" class="btn btn-secondary"><span v-if="currentCategory == 'finestra'" class="color_blue fw-bold">Finestre</span> <span class="custom-color" v-else>Finestre</span></button>
  <button @click="filterItems('serranda')" class="btn btn-secondary"><span v-if="currentCategory == 'serranda'" class="color_blue fw-bold">Serrande</span> <span class="custom-color" v-else>Serrande</span></button>
  <button @click="filterItems('porta')" class="btn btn-secondary"><span v-if="currentCategory == 'porta'" class="color_blue fw-bold">Porte</span> <span class="custom-color" v-else>Porte</span></button>
  <!-- <button @click="filterItems('lampada')" class="btn btn-secondary">Lampade</button> ESEMPIO -->
</div>
<!-- RICORDA CHE LA LABEL DEGLI ITEMS DEVE AVERE ALMENO UNO SPAZIO PER ESSERE LETTO -->
<div class="my-2 card" v-if="currentCategory !== ' '">
  <button  
          @click="filterItems(' ')" 
          class="btn btn-secondary fw-bold">
          Azzera filtri
  </button>
</div>


<!-- CARD CONTROLLO SERRANDE -->
<div class="container-fluid my-3">
  <div v-if="openPannelloSerrande">
    <div class="card p-2 ">
      <ul class="d-flex gap-2 justify-content-center">
        <li class="d-flex justify-content-center">
          <div @click="setAllRollerShuttersPosition(100)" class="btn bg_secondary_blue color_blue fw-bold">Alza tutto</div>
        </li>
        <li class="d-flex justify-content-center">
          <div @click="setAllRollerShuttersPosition(50)" class="btn bg_secondary_blue color_blue fw-bold">Apri tutto a metà</div>
        </li>
        <li class="d-flex justify-content-center">
          <div @click="setAllRollerShuttersPosition(0)" class="btn bg_secondary_blue color_blue fw-bold">Chiudi tutto</div>
        </li>
      </ul>
    </div>
  </div>
</div>


<!-- CARD NO ELEMENTI -->
<div class="card" v-if="filteredItems.length === 0 && currentCategory !== ' '">
  <h5>Non hai elementi di questo tipo</h5>
</div>
      
<div class="container mt-3">
  <div class="row">
          
          <!-- CICLO PER GLI ELEMENTI FILTRATI -->
          <div
          v-for="item in filteredItems"
          :key="item.name"
          class="col-12"
          >
          
          <!-- CARDS ELEMENTI FILTRATI -->


            <!-- SERRANDE -->
            <div class="card mb-2 p-2 py-2" v-if="item.label.toLowerCase().includes('serranda')">                          
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="col-9">
                      <div class="d-flex justify-content-between gap-2">
                        <p class="serranda_label bg_secondary_blue">{{ item.label }}</p>
                        <div>
                          <p class="badge bg_blue" v-if="item.state >= 10">Aperta ({{ item.state }}%)</p>
                          <p class="badge bg_secondary_blue" v-else-if="item.state < 10">Chiusa ({{ item.state }}%)</p>
                        </div>
                      </div>
                      <div class="d-flex gap-3">
                            <div class="badge bg-secondary custom-color" @click="store.methods.setRollerShutterPosition(item.name, 100)">
                              Apri
                            </div>
                            <div class="badge bg-secondary custom-color" @click="store.methods.setRollerShutterPosition(item.name, 50)">
                              Apri a metà
                            </div>
                            <div class="badge bg-secondary custom-color" @click="store.methods.setRollerShutterPosition(item.name, 0)">
                              Chiudi
                            </div>
                      </div>
                    </div>
                      <div class="col-3 d-flex flex-row-reverse justify-content-around align-items-center">
                          <div class="comando_serranda">
                              <div class="d-flex justify-content-center align-items-center tasto_up" @click="store.methods.sendCommand(item.name, 'DOWN')"><font-awesome-icon :icon="['fas', 'angle-up']" /></div>
                              <div class="d-flex justify-content-center align-items-center stop" @click="store.methods.sendCommand(item.name, 'STOP')"><font-awesome-icon :icon="['fas', 'stop']" /></div>
                              <div class="d-flex justify-content-center align-items-center tasto_down" @click="store.methods.sendCommand(item.name, 'UP')"><font-awesome-icon :icon="['fas', 'angle-down']" /></div>
                          </div>                       
                      </div>
                  </div>
            </div>
      
            <!-- FINESTRE -->
            <div class="card mb-2 py-2 d-flex gap-2" v-if="item.label.toLowerCase().includes('finestra') && !item.label.toLowerCase().includes('vibrazione')">
                <h5 class="finestra_label bg_secondary_blue">{{ item.label }}</h5>
                <div class="pb-2">
                    <span v-if="item.state === 'CLOSED'" class="badge bg_secondary_blue py-2">
                      Chiusa
                    </span>
                    <span v-else-if="item.state === 'OPEN'" class="badge bg_blue py-2">
                      Aperta
                    </span>
                    <span v-else-if="item.state === 'TILTED'" class="badge bg-warning py-2">
                      Ribalta aperta
                    </span>
                </div> 
            </div>

            <!-- PORTE -->
            <div class="card mb-2 py-2 d-flex gap-2" v-if="item.label.toLowerCase().includes('porta')">
              <h5 class="finestra_label bg_secondary_blue">{{ item.label }}</h5>
              <div class="pb-2">
                    <span v-if="item.state === 'CLOSED'" class="badge bg_secondary_blue py-2">
                      Chiusa
                    </span>
                    <span v-else-if="item.state === 'OPEN'" class="badge bg_blue py-2">
                      Aperta
                    </span>
                </div> 
            </div> 

      </div> <!-- FINE CICLO -->
  </div> <!-- FINE ROW -->
</div> <!-- FINE CONTAINER -->
</template>
  
<script>
  import { authStore } from '../store/auth.js';
  import { store } from '../store.js';
  
  export default {
    data() {
      return {
        store,
        lastUpdate: null,
        pollInterval: null,
        filteredItems: [],
        openPannelloSerrande: false,
        currentCategory: '',
      }
    },
    methods: {
      // Funzione che effettua la chiamata API a openHAB Cloud
      async fetchItems() {
        try {
          const response = await fetch("http://149.62.186.157:3000/rest/items", {
            headers: {
              "Authorization": "Basic " + btoa(`${authStore.username}:${authStore.password}`),
              "Bearer-Token": authStore.token 
            }
          });
          if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
  
          // Converte in JSON
          const data = await response.json();
          this.updateItemsState(this.store.items, data); // funzione per controllare e aggiornare
          this.store.items = data;

          // popola le aree
          this.populateAreas(data);
  
          this.lastUpdate = new Date().toLocaleTimeString();
        } catch (err) {
          console.error("Errore fetch items:", err.message);
        }
      },
      // Funzione che confronta oldItems e newItems
      // e gestisce eventuali differenze di stato
      updateItemsState(oldData, newData) {
        // Esempio: controlliamo se c'è stato un cambio di state
        if (!oldData || !newData) return;
        newData.forEach((newItem) => {
          const oldItem = oldData.find((o) => o.name === newItem.name);
          if (oldItem && oldItem.state !== newItem.state) {
            // console.log(`Item ${newItem.name} ha cambiato stato da ${oldItem.state} a ${newItem.state}`);
            // Qui eseguire azioni, notifiche, ecc.
          }
        });
      },
      populateAreas(newItems) {
        
        // Per ogni area, filtra gli items corrispondenti
        store.areas.forEach(area => {
          // Filtraggio semplice: se il label include area.name (lowercase)
          area.items = newItems.filter(item => {
            return item.label.toLowerCase().includes(area.name.toLowerCase());
          });
        });
      },
      //funzione per inviare il comando a tutte le serrande
      async setAllRollerShuttersPosition(position) {
      // Per sicurezza, controllo che `position` sia 0, 50 o 100
      if (![0, 50, 100].includes(position)) {
        console.error(`Posizione non valida: ${position}`);
        return;
      }

      try {
        
        const results = await Promise.all(
          this.filteredItems.map(async (itemName) => {
            const response = await fetch(`${itemName.link}`, {
              method: 'POST',  
              headers: {
                "Content-Type": "text/plain",
                "Authorization": "Basic " + btoa(`${authStore.username}:${authStore.password}`),
                "Bearer-Token": authStore.token
              },
              body: position.toString()
              
            });

            if (!response.ok) {
              throw new Error(`Errore per item "${itemName}": ${response.status} ${response.statusText}`);
            }

            return itemName; // Se tutto ok, restituisco il nome dell'item
          })
        );

        // Se tutte le promesse sono andate a buon fine, results conterrà i nomi delle serrande impostate
        // console.log(`Posizione ${position}% inviata correttamente a: ${results.join(", ")}`);
      } catch (err) {
          console.error("Errore durante l'invio del comando a tutte le serrande:", err.message);
        }
      },
      filterItems(category) {
        this.currentCategory = category;
        this.filteredItems = [];
        //resetta il pannello delle serrande
        this.openPannelloSerrande = false;
        if (category === 'serranda') {
          this.openPannelloSerrande = true;
        }

        //filtra gli item per categoria e li ordina per avere quelli aperti in cima
        this.filteredItems = store.items.filter(item => item.label.toLowerCase().includes(category.toLowerCase())).sort((a, b) => {
            if (a.state === "OPEN" && b.state !== "OPEN") {
              return -1; // "a" prima di "b"
          }
          if (a.state !== "OPEN" && b.state === "OPEN") {
            return 1; // "b" prima di "a"
          }
          return 0; // Lascia inalterati quelli con lo stesso valore di "state"
        });

        // console.log(this.filteredItems);
      }
      },
  
    mounted() {
        // Carica i dati
        this.currentCategory = this.$route.params.currentCategory;
        this.fetchItems();
        this.filterItems(this.currentCategory);
  
        // aggiorna periodicamente 
        this.pollInterval = setInterval(() => {
          this.fetchItems();
          this.filterItems(this.currentCategory);
        }, 1_000);
      },
      beforeUnmount() {
        // Libera l'intervallo per evitare memory leak
        if (this.pollInterval) clearInterval(this.pollInterval);
      }


  };
</script> 
<style scoped lang="scss">
@use '../assets/style/general.scss';

.filtri {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom-right-radius: 999px;
  border-bottom-left-radius: 999px;
  border-left: 1px solid var(--primary-orange);
  padding-top: 4px

}



.filtri button{
  border: 1px solid var(--primary-orange);
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}


.serranda_label{
  border: 1px solid var(--secondary-blue);
  border-radius: 10px;
  padding: 2px;
  font-weight: bold;
  color: var(--primary-orange);
}

.finestra_label{
  border: 1px solid var(--secondary-blue);
  border-radius: 999px;
  margin: 0 8px 0 8px;
  padding: 2px;
  font-weight: bold;
  color: var(--primary-orange);

}

</style>