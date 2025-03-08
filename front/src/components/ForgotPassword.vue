<template>
  <div class="forgot-password">
    <h2>Mot de passe oublié ?</h2>
    <p>Entrez votre email pour recevoir un lien de réinitialisation.</p>
    <input
      type="email"
      v-model="email"
      placeholder="Votre email"
      class="email-input"
      required
    />
    <button @click="resetPassword" class="submit-btn" :disabled="isLoading">
      {{ isLoading ? "Envoi..." : "Envoyer" }}
    </button>
    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
    <p>
      <router-link to="/auth/login">Retour à la connexion</router-link>
    </p>
  </div>
</template>

<script>
import authService from '@/services/authService';

export default {
  data() {
    return {
      email: "",
      message: "",
      error: "",
      isLoading: false,
    };
  },
  methods: {
    async resetPassword() {
      this.message = "";
      this.error = "";
      this.isLoading = true;

      try {
        await authService.forgotPassword(this.email);
        this.message = "Un lien de réinitialisation a été envoyé à votre email.";
      } catch (error) {
        this.error = error.response?.data?.message || "Une erreur s'est produite.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.forgot-password {
  text-align: center;
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd; /* Bordure simple */
  border-radius: 10px;
  background-color: white; /* Fond blanc */
}

.email-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc; /* Bordure simple */
  border-radius: 5px;
  background: #f9f9f9; /* Fond légèrement gris */
}

.submit-btn {
  background-color: #456485; /* Fond bleu */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn:disabled {
  background-color: #ccc; /* Fond gris pour le bouton désactivé */
  cursor: not-allowed; /* Curseur "non autorisé" */
}

.submit-btn:hover:not(:disabled) {
  background-color: #1d1e1f; /* Fond bleu plus foncé au survol */
}

.message {
  color: green; /* Texte vert pour les messages de succès */
  margin-top: 10px;
}

.error {
  color: red; /* Texte rouge pour les messages d'erreur */
  margin-top: 10px;
}
</style>