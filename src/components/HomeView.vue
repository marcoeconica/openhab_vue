<template>   
<div class="container my-3">
  <div class="row gap-3">

    <!-- PANNELLO AGGIORNA STATI -->
    <div class="col-12">
      <div class="card bg_azure">
        <!-- <div class="card-header">
          <h5 class="card-title">{{ totaleElementi() }} Dispositivi collegati</h5>
        </div> -->
        <div @click="fetchItems">
          <div class="btn btn-sm bg_secondary_blue text-white fw-bold d-flex justify-content-center align-items-center gap-2">
            Aggiorna stati<font-awesome-icon :icon="['fas', 'rotate-right']" />
          </div>
          <div>
            <p class="mt-3 text-muted">Ultimo aggiornamento: {{ lastUpdate }}</p>
          </div>
        </div>
      </div>
    </div>



    <!-- card con il numero totale di porte, segnando quante sono aperte e chiuse; -->
    <div class="col-12" v-if="store.methods.TotElementi('Porta') > 0">
      <router-link 
        :to="{ name: 'widget', params: { currentCategory: 'porta' } }"
      >
        <div class="card text-bg-dark">
          <img src="/img/porte.webp" class="bg_img" alt="porte" />
          <div class="card-img-overlay">
              <div class="text-start d-flex justify-content-between">
                <div class="d-flex gap-2">
                  <h2 class="card-title custom-color fw-bold fs-1">Porte</h2>
                  <span class="fs-5" v-if="store.methods.elementiAperti('Porta') > 0">
                    <font-awesome-icon :icon="['fas', 'lock-open']" />
                  </span>
                  <span class="fs-5" v-else>
                    <font-awesome-icon :icon="['fas', 'lock']" />
                  </span>
                </div>
                <div class="img_text fs-5">
                  <span class="d-flex justify-content-center align-items-center gap-2">Totale: <span class="fs-5 fw-bold color_blue">{{ store.methods.TotElementi('Porta') }}</span></span>
                </div>
              </div>
                        
              <div class="d-flex flex-column gap-2">
                  <div class="img_text fs-5">
                      <span class="d-flex justify-content-center align-items-center gap-2">Aperte: <span class="fs-5 fw-bold color_blue">{{ store.methods.elementiAperti('Porta') }}</span></span>
                  </div>
                  <div class="img_text fs-5">
                      <span class="d-flex justify-content-center align-items-center gap-2">Chiuse: <span class="fs-5 fw-bold color_blue">{{ store.methods.elementiChiusi('Porta') }}</span></span>
                  </div>
              </div>
          </div>
        </div>
      </router-link>
    </div>


    <!-- card con il numero totale di finestre, segnando quante sono aperte, chiuse e a bascula; -->
    <div class="col-12" v-if="store.methods.TotElementi('Finestra') > 0">
        <router-link 
                :to="{ name: 'widget', params: { currentCategory: 'finestra' } }"
                >
            <div class="card text-bg-dark">
              <img src="/img/finestre.webp" class="bg_img" alt="finestre" />
              <div class="card-img-overlay">
                  <div class="text-start d-flex justify-content-between">
                    <div class="d-flex gap-2">
                      <h2 class="card-title custom-color fw-bold fs-1">Finestre</h2>
                      <span class="fs-5" v-if="store.methods.elementiAperti('Finestra') > 0 || store.methods.elementiBascula() > 0">
                        <font-awesome-icon :icon="['fas', 'lock-open']" />
                      </span>
                      <span class="fs-5" v-else>
                        <font-awesome-icon :icon="['fas', 'lock']" />
                      </span>
                    </div>
                    <div class="img_text fs-5">
                      <span class="d-flex justify-content-center align-items-center gap-2">Totale: <span class=" fw-bold color_blue">{{ store.methods.TotElementi('Finestra') }}</span></span>
                    </div>
                  </div>
                       
                  <div class="d-flex flex-column gap-2">

                      <div class="img_text fs-5">
                          <span class="d-flex justify-content-center align-items-center gap-2">Aperte: <span class=" fw-bold color_blue">{{ store.methods.elementiAperti('Finestra') }}</span></span>
                      </div>
                      <div class="img_text fs-5">
                          <span class="d-flex justify-content-center align-items-center gap-2">Chiuse: <span class=" fw-bold color_blue">{{ store.methods.elementiChiusi('Finestra') }}</span></span>
                      </div>
                      <div class="img_text fs-5">
                          <span class="d-flex justify-content-center align-items-center gap-2">Ribalta: <span class=" fw-bold color_blue">{{ store.methods.elementiBascula() }}</span></span>
                      </div>

                  </div>
              </div>
            </div>
      </router-link>
    </div>


    <!-- card con il numero totale di serrande, segnando quante sono aperte e chiuse/socchiuse; -->
    <div class="col-12" v-if="store.methods.TotElementi('Serranda') > 0">
      <router-link 
                :to="{ name: 'widget', params: { currentCategory: 'serranda' } }"
                >
        <div class="card text-bg-dark">
          <img src="/img/serrande.webp" class="bg_img" alt="serrande" />
          <div class="card-img-overlay">
            <div class="text-start d-flex justify-content-between">
              <div class="d-flex gap-2">
                <h2 class="card-title custom-color fw-bold fs-1">Serrande</h2>
                <!-- ICONA LUCCHETTO PER SERRANDA -->
                <!-- <span class="fs-5" v-if="elementiAperti('Serranda') > 0">
                  <font-awesome-icon :icon="['fas', 'lock-open']" />
                </span>
                <span class="fs-5" v-else>
                  <font-awesome-icon :icon="['fas', 'lock']" />
                </span> -->
              </div>
              <div class="img_text fs-5">
                <span class="d-flex justify-content-center align-items-center gap-2">Totale: <span class=" fw-bold color_blue">{{ store.methods.TotElementi('Serranda') }}</span></span>
              </div>
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="img_text fs-5">
                <span class="d-flex justify-content-center align-items-center gap-2">Aperte: <span class=" fw-bold color_blue">{{ store.methods.serrandeCalculator().aperte }}</span></span>
              </div>
              <div class="img_text fs-5">
                <span class="d-flex justify-content-center align-items-center gap-2">Socchiuse: <span class=" fw-bold color_blue">{{ store.methods.serrandeCalculator().socchiusa }}</span></span>
              </div>
              <div class="img_text fs-5">
                <span class="d-flex justify-content-center align-items-center gap-2">Chiuse: <span class=" fw-bold color_blue">{{ store.methods.serrandeCalculator().chiusa }}</span></span>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>



  </div> <!-- fine row -->
</div> <!-- fine container -->
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

        
      }
    },
    methods: {
      //Funzione che effettua la chiamata API a openHAB Cloud
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
        }, 60_000);
      },
      beforeUnmount() {
        // Libera l'intervallo per evitare memory leak
        if (this.pollInterval) clearInterval(this.pollInterval);
      }
  };
</script>
  

<style scoped lang="scss">

@use '../assets/style/general.scss';


.bg_img {
  filter: brightness(0.35);
  object-fit: cover !important;
  height: 200px;

}



</style>