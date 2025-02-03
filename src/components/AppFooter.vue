<script>


export default {
  components: {
  },
  data() {
    return {
    }
  }
}

</script>

<template>
    <footer class="bg-dark">
      <div class="container py-2 fs-2">
        <div class="d-flex justify-content-around">
            <div class="col-3 d-flex justify-content-center align-items-center">
              <router-link to="/home" :class="{ 'active': $route.path === '/home' }">
                <font-awesome-icon :icon="['fas', 'house-lock']" />
              </router-link>
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
              <router-link to="/stanze" 
                            :class="{ 'active': $route.path === '/stanze'}">
                <font-awesome-icon :icon="['fas', 'door-closed']" />
              </router-link>
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
              <router-link :to="{ name: 'widget', params: { currentCategory: ' ' } }" 
                            :class="{ 'active': $route.path === '/widget/%20' || $route.path === '/widget/finestra' || $route.path === '/widget/porta' || $route.path === '/widget/serranda' }">
                <font-awesome-icon :icon="['fas', 'list']" />
              </router-link>
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
              <router-link to="/location" :class="{ 'active': $route.path === '/location' }">
                <font-awesome-icon :icon="['fas', 'people-roof']" />
              </router-link>
            </div>
        </div>
      </div>
    </footer>
</template>

<style lang="scss">
@use '../assets/style/general.scss';

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 0px;
  padding: 0px;
}

a {
  color: var(--primary-orange)!important;
}

.active{
  color: var(--primary-blue)!important;
}
</style>
