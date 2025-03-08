import axios from 'axios';


const API_URL = 'http://localhost:3000/auth';

const authApi = axios.create({
  baseURL: API_URL,
});

export default {
  /**
   * Connexion de l'utilisateur
   * @param {string} email - L'email de l'utilisateur
   * @param {string} password - Le mot de passe de l'utilisateur
   * @returns {Promise<Object>} - Les tokens (accessToken, refreshToken) ou une erreur
   */
  async login(email, password) {
    try {
      const response = await authApi.post('/login', { email, password });
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erreur lors de la connexion");
    }
  },

  /**
   * Inscription d'un nouvel utilisateur
   * @param {string} nom - Le nom de l'utilisateur
   * @param {string} prenom - Le prénom de l'utilisateur
   * @param {string} email - L'email de l'utilisateur
   * @param {string} password - Le mot de passe de l'utilisateur
   * @returns {Promise<Object>} - Les données de l'utilisateur créé ou une erreur
   */
  async register(nom, prenom, email, password) {
    try {
      const response = await authApi.post('/register', { nom, prenom, email, password });
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erreur lors de l'inscription");
    }
  },

  /**
   * Demande de réinitialisation du mot de passe
   * @param {string} email - L'email de l'utilisateur
   * @returns {Promise<Object>} - Un message de succès ou une erreur
   */
  async forgotPassword(email) {
    try {
      const response = await authApi.post('/forgot-password', { email });
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erreur lors de la demande de réinitialisation");
    }
  },
};