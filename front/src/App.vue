<template>
  <div id="app">
    
    <nav v-if="isAuthenticated">
      <router-link to="/students">Étudiants</router-link> |
      <button @click="logout">Déconnexion</button>
    </nav>

    
    <router-view></router-view>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';

export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: false, 
    };
  },
  created() {
    this.checkAuthentication();
  },
  methods: {
    
    checkAuthentication() {
      const authStore = useAuthStore();
      this.isAuthenticated = !!authStore.accessToken; 
    },

   
    logout() {
      const authStore = useAuthStore();
      authStore.clearTokens(); 
      this.isAuthenticated = false; 
      this.$router.push('/auth/login'); 
    },
  },
  watch: {

    $route() {
      this.checkAuthentication();
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}

button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #c82333;
}
</style>