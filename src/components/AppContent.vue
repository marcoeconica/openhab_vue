<script>
import LoginView from './LoginView.vue'
import HomeView from './HomeView.vue'
import AreaDetails from './AreaDetails.vue'
import AreaView from './AreaView.vue'

export default {
  components: {
    LoginView,
    HomeView,
    AreaDetails,
    AreaView
  },
  data() {
    return {
    }
  }
}

</script>

<template>

  <main>
    <section class="h-100">
      <div class="container">
        <div class="row flex-column justify-content-center h-100">
          <div class="col-auto text-center">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </section>
  </main>

</template>

<style>
main {
  background-color: var(--primary-wheat);
  padding-bottom: 60px;
}
</style>
