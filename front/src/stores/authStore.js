import { defineStore } from 'pinia';
import router from '@/router';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null, 
    refreshToken: null, 
  }),
  actions: {
    setTokens(accessToken, refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },
    clearTokens() {
      this.accessToken = null;
      this.refreshToken = null;
    },
    async refreshAccessToken() {
      try {
        const response = await axios.get('/auth/refresh', {
          headers: {
            Authorization: `Bearer ${this.refreshToken}`,
          },
        });
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