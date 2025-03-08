import { defineStore } from 'pinia';
import router from '@/router';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null, 
  }),
  actions: {
    setTokens(accessToken) {
      this.accessToken = accessToken;
    },
    clearTokens() {
      this.accessToken = null;
    },
    async refreshAccessToken() {
      try {
        const response = await axios.get('/auth/refresh');
        this.accessToken = response.data.accessToken;
        return this.accessToken;
      } catch (error) {
        this.clearTokens();
        router.push('/auth/login');
        throw error;
      }
    },
  },
});