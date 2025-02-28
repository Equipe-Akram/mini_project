<template>
    <div class="form-container">
      <h2 v-if="isEditing">Modifier un étudiant</h2>
      <h2 v-else>Ajouter un étudiant</h2>
  
      <form @submit.prevent="submitForm">
        <label>Nom :</label>
        <input v-model="student.nom" type="text" required />
        <label>Prénom :</label>
        <input v-model="student.prenom" type="text" required />
        <label>Note :</label>
        <input v-model="student.note" type="number" step="0.1" required />
  
        <button type="submit">{{ isEditing ? "Modifier" : "Ajouter" }}</button>
        <button type="button" v-if="isEditing" @click="cancelEdit">Annuler</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      studentToEdit: Object
    },
    data() {
      return {
        student: { id: null, nom: '', prenom: '', note: '' },
        isEditing: false
      };
    },
    watch: {
      studentToEdit(newVal) {
        if (newVal) {
          this.student = { ...newVal };
          this.isEditing = true;
        }
      }
    },
    methods: {
      submitForm() {
        if (this.isEditing) {
          this.$emit('update-student', this.student);
        } else {
          this.$emit('add-student', this.student);
        }
        this.resetForm();
      },
      resetForm() {
        this.student = { id: null, nom: '', prenom: '', note: '' };
        this.isEditing = false;
      },
      cancelEdit() {
        this.resetForm();
        this.$emit('cancel-edit');
      }
    }
  };
  </script>
  
  
  <style scoped>
  .form-container {
    width: 40%;
    margin: 20px auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 8px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:first-child {
    background-color: #007bff;
    color: white;
  }
  
  button:last-child {
    background-color: gray;
    color: white;
  }
  </style>
  