<template>
  <div class="card shadow-sm p-4 mb-4">
    <h2 class="text-center mb-3">Ajouter un Étudiant</h2>
    <form @submit.prevent="ajouterEtudiant">
      <div class="mb-3">
        <input type="text" class="form-control" v-model="etudiant.nom" placeholder="Nom" required />
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" v-model="etudiant.prenom" placeholder="Prénom" required />
      </div>
      <div class="mb-3">
        <input type="number" class="form-control" v-model="etudiant.note" placeholder="Note" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">
        <i class="fas fa-plus"></i> Ajouter
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  emits: ["ajouterEtudiant"],
  setup(_, { emit }) {
    const etudiant = ref({ nom: "", prenom: "", note: "" });

    const ajouterEtudiant = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/students", etudiant.value);
        emit("ajouterEtudiant", response.data); // Envoi au parent
        etudiant.value = { nom: "", prenom: "", note: "" }; // Réinitialiser le formulaire
      } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
      }
    };

    return { etudiant, ajouterEtudiant };
  },
};
</script>

  <style scoped>
  .card {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 12px;
    background: rgba(161, 151, 151, 0.2); /* Semi-transparent */
    backdrop-filter: blur(10px); /* Flou derrière */
    box-shadow: 0 4px 10px #ebe3e3ea;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  
  </style>
  
  
  