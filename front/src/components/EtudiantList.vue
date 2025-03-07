<template>
    <div class="list-container">
      <h2>Liste des étudiants</h2>
      <div class="filters">
    <label for="sort">Trier par :</label>
    <select id="sort" v-model="sortKey">
      <option value="">Aucun</option>
      <option value="nom">Nom</option>
      <option value="prenom">Prénom</option>
      <option value="note">Note</option>
    </select>
    </div>
  
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    <tr v-for="etudiant in sortedEtudiants" :key="etudiant.id">
      <td>{{ etudiant.id }}</td>
      <td>{{ etudiant.nom }}</td>
      <td>{{ etudiant.prenom }}</td>
      <td>{{ etudiant.note }}</td>
      <td>
        <button @click="$emit('edit-student', etudiant)">Modifier</button>
        <button @click="$emit('delete-student', etudiant.id)">Supprimer</button>
      </td>
    </tr>
  </tbody>
  
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      etudiants: Array
    },
    data() {
      return {
        sortKey: '' // La clé utilisée pour le tri (vide par défaut)
      };
    },
    computed: {
      sortedEtudiants() {
        if (!this.sortKey) return this.etudiants; // Si aucun tri sélectionné
        return [...this.etudiants].sort((a, b) => {
          return a[this.sortKey] > b[this.sortKey] ? 1 : -1;
        });
      }
    }
  };
  
  
  </script>
  
  <style scoped>
  .list-container {
    width: 100px ;
    margin: 20px auto;
  }
  
  table {
    width: 200px ;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  button {
    margin: 0 5px;
    padding: 5px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:first-child {
    background-color: #007bff;
    color: white;
  }
  
  button:last-child {
    background-color: #dc3545;
    color: white;
  }
  </style>
  
  
  <style scoped>
  .list-container {
    width: 50%;
    margin: auto;
    text-align: center;
  }
  
  .filters {
    margin-bottom: 10px;
  }
  
  label {
    margin-right: 10px;
  }
  
  select {
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 5px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    margin-left: 5px;
  }
  
  button:hover {
    background-color: #0056b3;
    color: white;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  th, td {
    padding: 8px;
    text-align: center;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .edit-btn {
    background-color: rgb(6, 169, 30);
    color: white;
    margin-right: 5px;
  }
  
  .delete-btn {
    background-color: red;
    color: white;
  }
  .filters {
    margin-bottom: 10px;
  }
  
  label {
    margin-right: 10px;
  }
  
  select {
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  </style> 