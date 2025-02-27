<template>
  <div id="app" class="container mt-4">
    <h1 class="text-center mb-4">Gestion des Étudiants</h1>

    <!-- Formulaire d'ajout -->
    <EtudiantForm @ajouterEtudiant="ajouterEtudiant" />

    <!-- Liste des étudiants -->
    <EtudiantList :etudiants="etudiants" @supprimerEtudiant="supprimerEtudiant" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getEtudiants, addEtudiant, deleteEtudiant } from "./api.js"; // Importer API
import EtudiantForm from "./components/EtudiantForm.vue";
import EtudiantList from "./components/EtudiantList.vue";

export default {
  name: "App",
  components: { EtudiantForm, EtudiantList },
  setup() {
    const etudiants = ref([]);

    // Charger les étudiants depuis l'API
    const fetchEtudiants = async () => {
      etudiants.value = await getEtudiants();
    };

    // Ajouter un étudiant
    const ajouterEtudiant = async (nouvelEtudiant) => {
      const addedStudent = await addEtudiant(nouvelEtudiant);
      if (addedStudent) {
        etudiants.value.push(addedStudent);
      }
    };

    // Supprimer un étudiant
    const supprimerEtudiant = async (id) => {
      const success = await deleteEtudiant(id);
      if (success) {
        etudiants.value = etudiants.value.filter(etudiant => etudiant.id !== id);
      }
    };

    onMounted(fetchEtudiants);

    return { etudiants, ajouterEtudiant, supprimerEtudiant };
  },
};
</script>



<style>
body {
  background-color: #f1eded; /* Change cette couleur selon ton choix */
  margin: 0;
  padding: 0;
}
</style>

