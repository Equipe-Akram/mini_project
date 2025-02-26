<template>
    <div class="page-container">
      <h1>Gestion des Étudiants</h1>
  
      <!-- Formulaire pour ajouter un étudiant -->
      <div class="form-container">
        <h2 class="form-title">Formulaire d'Étudiant</h2>
        <form @submit.prevent="save" class="form">
          <div class="form-group">
            <label for="nom" class="form-label">Nom</label>
            <input
              type="text"
              id="nom"
              v-model="nom"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label for="prenom" class="form-label">Prénom</label>
            <input
              type="text"
              id="prenom"
              v-model="prenom"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label for="note" class="form-label">Note</label>
            <input
              type="number"
              id="note"
              v-model="note"
              class="form-input"
              required
              min="0"
              max="20"
            />
          </div>
          <button type="submit" class="form-button">Ajouter</button>
        </form>
      </div>
  
      <!-- Tableau pour afficher les étudiants -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="E in etudiants" :key="E.id">
            <th scope="row">{{ E.id }}</th>
            <td>{{ E.nom }}</td>
            <td>{{ E.prenom }}</td>
            <td>{{ E.note }}</td>
            <td>
              <button @click="edit(E.id)">Modifier</button>
              <button @click="remove(E.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <script>
  export default {
    name: 'EtdEnsat',
    data() {
      return {
        id: 1,
        indice: -1,
        nom: '',
        prenom: '',
        note: '',
        etudiants: []
      };
    },
    methods: {
      save() {
        if (this.indice === -1) {
          // Ajouter un nouvel étudiant
          this.etudiants.push({
            id: this.id++,
            nom: this.nom,
            prenom: this.prenom,
            note: this.note
          });
        } else {
          // Mettre à jour un étudiant existant
          this.etudiants[this.indice].nom = this.nom;
          this.etudiants[this.indice].prenom = this.prenom;
          this.etudiants[this.indice].note = this.note;
          this.indice = -1; // Réinitialiser l'indice après la mise à jour
        }
        // Réinitialiser les champs du formulaire
        this.nom = '';
        this.prenom = '';
        this.note = '';
      },
      edit(id) {
        // Trouver l'étudiant à modifier
        const etudiant = this.etudiants.find((E) => E.id === id);
        if (etudiant) {
          this.nom = etudiant.nom;
          this.prenom = etudiant.prenom;
          this.note = etudiant.note;
          this.indice = this.etudiants.indexOf(etudiant); // Enregistrer l'indice pour la mise à jour
        }
      },
      remove(id) {
        // Supprimer un étudiant
        this.etudiants = this.etudiants.filter((E) => E.id !== id);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles pour occuper toute la page */
  .page-container {
    width: 80vw;
    min-height: 100vh; /* Prend toute la hauteur de la fenêtre */
    padding: 0px;
    background-color: #f5f5f5;
    box-sizing: border-box; /* Inclut le padding dans la largeur et la hauteur */
  }
  
  /* Styles pour le formulaire */
  .form-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }
  
  .form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #555;
    margin-bottom: 5px;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .form-input:focus {
    border-color: #007bff;
  }
  
  .form-button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .form-button:hover {
    background-color: #0056b3;
  }
  
  /* Styles pour le tableau */
  .table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .table th,
  .table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .table th {
    background-color: #f2f2f2;
  }
  
  .table-striped tbody tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
  
  .table-striped tbody tr:hover {
    background-color: #f1f1f1;
  }
  
  button {
    margin-right: 5px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 3px;
    background-color: #007bff;
    color: #fff;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>