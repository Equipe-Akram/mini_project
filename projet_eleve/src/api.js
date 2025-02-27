import axios from "axios";

const API_URL = "http://localhost:3000/api/students";

// Fonction pour récupérer tous les étudiants
export const getEtudiants = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants :", error);
    return [];
  }
};

// Fonction pour ajouter un étudiant
export const addEtudiant = async (etudiant) => {
  try {
    const response = await axios.post(API_URL, etudiant);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'étudiant :", error);
    return null;
  }
};

// Fonction pour supprimer un étudiant
export const deleteEtudiant = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'étudiant :", error);
    return false;
  }
};
