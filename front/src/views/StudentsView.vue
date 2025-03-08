<template>
  <div>
    <h1>Gestion des Étudiants</h1>
    <EtudiantForm @add-student="addStudent" @update-student="updateStudent" :studentToEdit="studentToEdit" />
    <EtudiantList :etudiants="etudiants" @edit-student="editStudent" @delete-student="deleteStudent" />
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
    this.etudiants = await apiService.getAllStudents();
  },
  methods: {
    async addStudent(student) {
      const newStudent = await apiService.addStudent(student);
      this.etudiants.push(newStudent);
    },
    async updateStudent(student) {
      const updatedStudent = await apiService.updateStudent(student.id, student);
      const index = this.etudiants.findIndex((e) => e.id === updatedStudent.id);
      if (index !== -1) {
        this.etudiants.splice(index, 1, updatedStudent);
      }
      this.studentToEdit = null;
    },
    editStudent(student) {
      this.studentToEdit = student;
    },
    async deleteStudent(id) {
      await apiService.deleteStudent(id);
      this.etudiants = this.etudiants.filter((e) => e.id !== id);
    },
  },
};
</script>

