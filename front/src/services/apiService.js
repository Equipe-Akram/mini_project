import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const API_URL = 'http://localhost:3000/api/students';

const api = axios.create({
  baseURL: API_URL,
});


api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const authStore = useAuthStore();

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await authStore.refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); 
      } catch (refreshError) {
        authStore.clearTokens();
        router.push('/auth/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


const apiService = {
  async getAllStudents() {
    try {
      const response = await api.get('/students');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants :', error);
      throw new Error('Impossible de récupérer les étudiants.');
    }
  },

  async addStudent(student) {
    try {
      const response = await api.post('/students', student);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étudiant :", error);
      throw new Error("Vérifiez les données de l'étudiant.");
    }
  },

  async updateStudent(id, student) {
    try {
      const response = await api.put(`/students/${id}`, student);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      throw new Error("Impossible de mettre à jour.");
    }
  },

  async deleteStudent(id) {
    try {
      await api.delete(`/students/${id}`);
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      throw new Error("Échec de la suppression.");
    }
  },
};

export default apiService;