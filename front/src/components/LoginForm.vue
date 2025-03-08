<template>
  <div class="register-container">
    <h2>Créer un compte</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nom">Nom</label>
        <input type="text" id="nom" v-model="nom" required />
      </div>
      <div class="form-group">
        <label for="prenom">Prénom</label>
        <input type="text" id="prenom" v-model="prenom" required />
      </div>
      <div class="form-group">
        <label for="email">Adresse Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Créer un compte</button>
      <p v-if="message" class="message">{{ message }}</p>
    </form>
    <p>
      <router-link to="/auth/login">Se connecter</router-link>
    </p>
  </div>
</template>

<script>
import authService from '@/services/authService';

export default {
  data() {
    return {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      message: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await authService.register(this.nom, this.prenom, this.email, this.password);
        this.message = 'Inscription réussie ! Redirection en cours...';
        setTimeout(() => {
          this.$router.push('/auth/login');
        }, 2000);
      } catch (error) {
        this.message = "Erreur lors de l'inscription : " + (error.response?.data?.message || error.message);
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  width: 320px;
  padding: 25px;
  border-radius: 10px;
  background: #ffffff; /* Fond blanc */
  border: 1px solid #ddd; /* Bordure légère */
  text-align: center;
  margin: 0 auto; /* Centrer le conteneur */
}

h2 {
  color: #2c3e50; /* Couleur du texte */
  font-size: 22px;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 18px;
  text-align: left;
}

label {
  font-weight: bold; /* Texte en gras */
  color: #34495e; /* Couleur du texte */
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; /* Bordure simple */
  border-radius: 6px;
  outline: none;
  background: #f9f9f9; /* Fond légèrement gris */
  transition: border-color 0.3s ease-in-out;
}

input:focus {
  border-color: #3498db; /* Bordure bleue au focus */
}

button {
  width: 100%;
  padding: 12px;
  background: #456485; /* Fond bleu */
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

button:hover {
  background: #1d1e1f; /* Fond bleu plus foncé au survol */
}

.message {
  text-align: center;
  margin-top: 12px;
  color: #e74c3c; /* Couleur rouge pour les messages d'erreur */
  font-weight: bold;
}
</style>
