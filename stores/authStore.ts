import { defineStore } from 'pinia';

interface User {
  login: string;
  id: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as User | null
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUser(user: User) {
      this.user = user;
    },
    clearAuth() {
      this.token = null;
      this.user = null;
    },
    getUser() {
      const user = localStorage.getItem('user');
      const parsedUser = user ? JSON.parse(user) : null;
      return parsedUser;
    }
  }
});
