<template>
<div class="container mt-3">          
    <div class="row">

         <!-- Ciclo delle areas -->
          <div 
            v-for="area in store.areas" 
            :key="area.name" 
          >
            <div
            v-if="area.items.length > 0"
            class="col-12 my-3"
            >
              <router-link 
              :to="{ name: 'areaDetails', params: { areaName: area.name } }"
              >
                  <div class="card text-bg-dark">
                    <!-- Immagine di background dell'area -->
                    <img :src="area.img" class="bg_img" :alt="area.name" />

                    <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
                      <div class="card-header">
                        <h3 class="card-title custom-color"><font-awesome-icon :icon="['fas', 'location-dot']" class="color_blue" /> {{ area.name }}</h3>
                        <p class="card-text  bg_text">Elementi: {{ store.methods.totaleElementiArea(area) }}</p>
                      </div>
                      
                      <div class="d-flex align-items-center justify-content-center gap-2">
                            <span class="custom-color fs-2"><font-awesome-icon :icon="['fas', 'door-open']" /></span> <span class="fs-2">{{ store.methods.sommaElementiAperti(area) }}</span>
                      </div>
                    </div>
                  </div>
                </router-link>
            </div>
         </div> <!-- FINE Ciclo aree -->


    </div> <!-- FINE ROW -->
        <!-- DEBUG -->
      <p class="mt-3 text-muted">Ultimo aggiornamento: {{ lastUpdate }}</p>
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
        pollInterval: null
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
    },
    mounted() {
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