<template>
  <div id="app">
    <h1>Gestion des étudiants</h1>

    <EtudiantForm 
      @add-student="addStudent" 
      @update-student="updateStudent"
      @cancel-edit="cancelEdit"
      :studentToEdit="studentToEdit"
    />

    <EtudiantList 
      :etudiants="etudiants" 
      @delete-student="deleteStudent"
      @edit-student="editStudent"
    />
  </div>
</template>

<script>
import EtudiantList from './components/EtudiantList.vue';
import EtudiantForm from './components/EtudiantForm.vue';
import apiService from './services/apiService';

export default {
  components: {
    EtudiantList,
    EtudiantForm
  },
  data() {
    return {
      etudiants: [],
      studentToEdit: null
    };
  },
  mounted() {
    this.fetchStudents();
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await apiService.getAllStudents();
        this.etudiants = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des étudiants :", error);
      }
    },
    async addStudent(student) {
      try {
        const response = await apiService.addStudent(student);
        this.etudiants.push(response.data);
      } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
      }
    },
    async deleteStudent(id) {
      try {
        await apiService.deleteStudent(id);
        this.etudiants = this.etudiants.filter(etudiant => etudiant.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    },
    editStudent(student) {
      this.studentToEdit = { ...student };
    },
    async updateStudent(updatedStudent) {
      try {
        await apiService.updateStudent(updatedStudent.id, updatedStudent);
        const index = this.etudiants.findIndex(et => et.id === updatedStudent.id);
        if (index !== -1) {
          this.etudiants.splice(index, 1, updatedStudent);
        }
        this.studentToEdit = null;
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
      }
    },
    cancelEdit() {
      this.studentToEdit = null;
    }
  }
};
</script>


<style>
body {
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
}
</style>


















 




















  