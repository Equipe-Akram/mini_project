<template>
  <div class="container">
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label>Email address</label>
        <input type="email" v-model="email" placeholder="Email" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" placeholder="Mot de passe" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <p class="link">
      <router-link to="/auth/register">Créer un compte</router-link> |
      <router-link to="/auth/forgot-password">Mot de passe oublié ?</router-link>
    </p>
    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import authService from '@/services/authService';

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
      error: '',
    };
  },
  methods: {
    async login() {
      this.message = '';
      this.error = '';

      try {
        
        const response = await authService.login(this.email, this.password);
        const authStore = useAuthStore();
        authStore.setTokens(response.accessToken, response.refreshToken);

        this.$router.push('/students');
      } catch (error) {
        this.error = 'Erreur de connexion : ' + (error.response?.data?.message || error.message);
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  width: 350px;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #ddd; 
  text-align: center;
}

h2 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  text-align: left;
  margin-bottom: 15px;
}

label {
  font-weight: bold; 
  color: #34495e;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9; 
}

button {
  background: #456485; 
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #1d1e1f; 
}

p {
  margin-top: 10px;
  color:red;
}
.link{
  color: black;
}
a {
  text-decoration: none;
  color: #2980b9; 
}

a:hover {
  color: #1c5985; 
}
</style>