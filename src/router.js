
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './components/LoginView.vue';
import HomeView from './components/HomeView.vue';
import AreaDetails from './components/AreaDetails.vue';
import { authStore } from './store/auth.js';
import AreaView from './components/AreaView.vue';
import WidgetView from './components/WidgetView.vue';
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/area/:areaName',
    name: 'areaDetails',
    component: AreaDetails,
    meta: { requiresAuth: true }
  },
  {
    path: '/stanze',
    name: 'areaView',
    component: AreaView,
    meta: { requiresAuth: true }
  },
  {
    path: '/widget/:currentCategory',
    name: 'widget',
    component: WidgetView,
    meta: { requiresAuth: true }
  },
  {
    path: '/area/:areaName',
    name: 'areaDetails',
    component: AreaDetails,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard per proteggere /home
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
