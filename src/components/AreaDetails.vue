
<template>
<div class="container mt-3">
  <div class="badge bg_secondary_blue custom-color px-3">
      <h1>{{ areaName }}</h1>
    </div>
      <div class="row">
          <div 
          v-for="area in store.areas"
          :key="area.name"
          >
              <div class=""
              v-if="area.items.length > 0 && detectAreaName(area)"
              >

                <div class="col-12 my-3"
                v-for="item in area.items"
                :key="item.name"
                >

                    <!-- CARDS -->
                  <div class="card" v-if="!item.label.toLowerCase().includes('vibrazione')">
                      <div class="card-header bg-dark">
                        <h4 class="card-title color_blue fw-bold">{{ item.label.replace(area.name, '') }}</h4>
                      </div>
                      <div class="card-body row">
                          <div class="text-start col-12">
                            
                                <!-- FINESTRA -->
                                <div
                                v-if="item.label.toLowerCase().includes('finestra')"
                                class="d-flex justify-content-between"
                                >
                                    <p>{{ item.label }}</p>
                                    <p>
                                        <span class="badge bg_blue" v-if="item.state === 'OPEN'">Aperta</span>
                                        <span class="badge bg_secondary_blue" v-else-if="item.state === 'CLOSED'">Chiusa</span>
                                        <span class="badge bg-secondary custom-color" v-else-if="item.state === 'TILTED'">Bascula</span>
                                        <span v-else>Stato non valido</span>
                                    </p>
                                </div>
                                
                                <!-- SERRANDA -->
                                <div
                                v-if="item.label.toLowerCase().includes('serranda')"
                                >
                                    <div class="d-flex justify-content-between align-items-center">
                                      <div class="col-9">
                                        <div class="d-flex justify-content-between">
                                          <p class="fw-bold">{{ item.label }}</p>
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
  
                                <!-- PORTA -->
                                <div
                                v-if="item.label.toLowerCase().includes('porta')"
                                >
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p>{{ item.label }}</p>
                                        <p>
                                            <span class="badge bg_blue" v-if="item.state === 'OPEN'">Aperta</span>
                                            <span class="badge bg_secondary_blue" v-else-if="item.state === 'CLOSED'">Chiusa</span>
                                            <span v-else>Stato non valido</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> <!-- Chiusura card-->


                </div> <!-- FINE Ciclo items -->
            </div><!-- FINE Ciclo check area -->
        </div><!-- FINE Ciclo areas -->
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
      areaName: null,

    }
  },
methods: {
      // Funzione che effettua la chiamata API a openHAB Cloud
      async fetchItems() {
        try {
          const response = await fetch("https://abcdomotics.econica.it/rest/items", {
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
      detectAreaName(area){
        if (area.name.toLowerCase() === this.areaName?.toLowerCase()) {
          return true;
          }
      }
    },
    mounted() {
      
      this.areaName = this.$route.params.areaName

        // Carica i dati
        this.fetchItems();

        // aggiorna periodicamente 
        this.pollInterval = setInterval(() => {
          this.fetchItems();
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

</style>