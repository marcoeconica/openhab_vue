<template>
    <div class="location-page">
      <h1>Controllo Posizione</h1>
      
      <div v-if="error">
        <p style="color: red">{{ error }}</p>
      </div>
  
      <div v-else-if="isLoading">
        <p>Sto controllando la tua posizione...</p>
      </div>
  
      <div v-else>
        <p>
          La tua posizione attuale è: <br>
          Lat: {{ latitude }} <br>
          Lon: {{ longitude }}
        </p>
        <p v-if="insideHome" style="color: green">
          Sei all'interno della tua abitazione!
        </p>
        <p v-else style="color: red">
          Non ti trovi in casa.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LocationCheck',
    data() {
      return {
        isLoading: true,
        error: null,
        latitude: null,
        longitude: null,
        insideHome: false
      }
    },
    mounted() {
      this.checkLocation()
    },
    methods: {
      checkLocation() {
        if (!('geolocation' in navigator)) {
          this.error = 'Geolocalizzazione non supportata dal browser.'
          this.isLoading = false
          return
        }
  
        // Richiedi la posizione
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude
            this.longitude = position.coords.longitude
            this.isLoading = false
  
            // Qui controlli se sei in casa
            // Sostituisci con la lat e lon della tua abitazione
            //45°18'09.3"N 7°53'32.0"E
            const homeLat = 45.5071
            const homeLon = 8.6618
            const distanceThreshold = 150 // metri di tolleranza
  
            const distance = this.computeDistance(
              this.latitude,
              this.longitude,
              homeLat,
              homeLon
            )
  
            // Se la distanza è minore della soglia, sei "in casa"
            this.insideHome = distance <= distanceThreshold
          },
          (err) => {
            this.error = 'Impossibile ottenere la posizione: ' + err.message
            this.isLoading = false
          }
        )
      },
      // Funzione per calcolare distanza in metri tra due coordinate (formula haversine semplificata)
      computeDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3 // Raggio della Terra in metri
        const rad = Math.PI / 180
        const dLat = (lat2 - lat1) * rad
        const dLon = (lon2 - lon1) * rad
  
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * rad) *
            Math.cos(lat2 * rad) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2)
  
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const d = R * c
        return d // distanza in metri
      }
    }
  }
  </script>
  
  <style scoped>
  .location-page {
    margin: 2rem;
  }
  </style>
  