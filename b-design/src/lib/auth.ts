import apiService from './api';

// Interface pour l'utilisateur
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

// Service d'authentification
export const authService = {
  // Connexion utilisateur
  async login(email: string, password: string) {
    return apiService.post('/auth/login', { email, password });
  },

  // Vérifier l'état de l'authentification
  async checkAuth() {
    return apiService.get('/auth/me');
  },

  // Déconnexion
  async logout() {
    return apiService.post('/auth/logout');
  },

  // Vérifiez si l'utilisateur est connecté (côté client)
  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('auth_token') !== null;
  },

  // Obtenez le token (côté client)
  getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  },

  // Stockez le token (côté client)
  setToken(token: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('auth_token', token);
  },

  // Effacez le token (côté client)
  clearToken() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_token');
  }
};

export default authService;