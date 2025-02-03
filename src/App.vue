<script>
import { store } from './store.js'
import AppHeader from './components/AppHeader.vue'
import AppContent from './components/AppContent.vue'
import AppFooter from './components/AppFooter.vue'
import LoginView from './components/LoginView.vue'
import HomeView from './components/HomeView.vue'
import AreaDetails from './components/AreaDetails.vue'
import AreaView from './components/AreaView.vue'
import WidgetView from './components/WidgetView.vue'
import { authStore } from './store/auth.js'


export default {
  components: {
    AppHeader,
    AppContent,
    AppFooter,
    LoginView,
    HomeView,
    AreaView,
    AreaDetails,
    WidgetView,
  },
  data() {
    return {
      store,
      authStore,
    }
  }
}

</script>

<template>

  <div id="app">
    <AppHeader></AppHeader>
    <AppContent></AppContent>
    <AppFooter></AppFooter>

  </div>

</template>

<style lang="scss">
@use './assets/style/general.scss';
@use 'bootstrap'
</style>
