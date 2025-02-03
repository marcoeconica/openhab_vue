<script>
import { authStore } from '../store/auth.js'
export default {
  components: {
    
  },
  data() {
    return {
      authStore,

    }
  }
}

</script>

<template>

  <header>
    <section class="bg-dark">
      <div class="container pt-4 pb-2">
        <div class="row">
          <div class="d-flex justify-content-start title gap-1 col-8">
            <router-link to="/home"><span class="fs-1"><font-awesome-icon :icon="['fas', 'house-user']" /></span></router-link>
            <router-link to="/home"><h1 class="custom-color"><span class="color_blue">ABC</span>Domotics</h1></router-link>
          </div>
          <div class="d-flex justify-content-end align-items-center col-4">
            <p class="user">{{ this.authStore.username }}</p>
            <router-link to="/login"
             @click="authStore.logout(); authStore.isAuthenticated = false" 
             class="btn btn-sm btn-danger" 
             v-if="this.authStore.isAuthenticated !== false"
             >
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </header>

</template>

<style lang="scss">
@use '../assets/style/general.scss';
.user {
  font-size: 45%;
  color: var(--primary-wheat)!important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

header a {
  color: var(--primary-wheat) !important;
  text-decoration: none;
}
</style>