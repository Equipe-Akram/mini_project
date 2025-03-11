<template>
  <div>
    <h1>Gestion des Étudiants</h1>
    <EtudiantForm
      @add-student="addStudent"
      @update-student="updateStudent"
      :studentToEdit="studentToEdit"
      @cancel-edit="cancelEdit"
    />
    <EtudiantList
      :etudiants="etudiants"
      @edit-student="editStudent"
      @delete-student="deleteStudent"
    />
  </div>
</template>

<script>
import EtudiantForm from '@/components/EtudiantForm.vue';
import EtudiantList from '@/components/EtudiantList.vue';
import apiService from '@/services/apiService';

export default {
  components: {
    EtudiantForm,
    EtudiantList,
  },
  data() {
    return {
      etudiants: [], 
      studentToEdit: null, 
    };
  },
  async created() {
    
    await this.fetchStudents();
  },
  methods: {
   
    async fetchStudents() {
      try {
        const response = await apiService.getAllStudents();
        this.etudiants = response.data.data; 
      } catch (error) {
        console.error("Erreur lors de la récupération des étudiants :", error);
      }
    },

    async addStudent(student) {
      try {
        const response = await apiService.addStudent(student);
        this.etudiants.push(response.data.data); 
      } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
      }
    },

    async deleteStudent(id) {
      try {
        await apiService.deleteStudent(id);
        this.etudiants = this.etudiants.filter((etudiant) => etudiant.id !== id); 
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    },

   
    async updateStudent(updatedStudent) {
      try {
        await apiService.updateStudent(updatedStudent.id, updatedStudent);
        const index = this.etudiants.findIndex((et) => et.id === updatedStudent.id);
        if (index !== -1) {
          this.etudiants.splice(index, 1, updatedStudent); 
        }
        this.studentToEdit = null;
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
      }
    },

    editStudent(student) {
      this.studentToEdit = { ...student };
    },

   
    cancelEdit() {
      this.studentToEdit = null; 
    },
  },
};
</script>

<style scoped>

</style>