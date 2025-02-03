<template>
    <div class="container mt-5" style="max-width: 400px;">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Username (openHAB Cloud)</label>
          <input v-model="username" type="text" id="username" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password (openHAB Cloud)</label>
          <input v-model="password" type="password" id="password" class="form-control" required />
        </div>
        <button class="btn btn-primary" type="submit">Login</button>
      </form>
  
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { authStore } from '../store/auth.js';
  
  export default {
    setup() {
      const router = useRouter();
      const username = ref('');
      const password = ref('');
      const errorMessage = ref('');
  
      async function handleLogin() {
        errorMessage.value = '';
        const success = await authStore.login(username.value, password.value);
        if (success) {
          // Vai a /home
          router.push('/home');
        } else {
          errorMessage.value = 'Credenziali non valide';
        }
      }
  
      return {
        username,
        password,
        errorMessage,
        handleLogin
      };
    }
  };
  </script>
  <style></style>