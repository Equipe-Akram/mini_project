<template>
  <div class="card shadow-sm p-4">
    <h2 class="text-center mb-3">Liste des Étudiants</h2>
    <table class="table table-striped table-bordered text-center">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Note</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="etudiant in etudiants" :key="etudiant.id">
          <td>{{ etudiant.nom }}</td>
          <td>{{ etudiant.prenom }}</td>
          <td>{{ etudiant.note }}</td>
          <td>
            <button class="btn btn-danger" @click="supprimerEtudiant(etudiant.id)">
              <i class="fas fa-trash"></i> Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["etudiants"],
  emits: ["supprimerEtudiant"],
  setup(props, { emit }) {
    const supprimerEtudiant = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/students/${id}`);
        emit("supprimerEtudiant", id);
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    };

    return { supprimerEtudiant };
  },
};
</script>

  
  <style scoped>
  .card{
    background: rgba(161, 151, 151, 0.2);
  }
  
  </style>
  