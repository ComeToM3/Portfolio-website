import axios from 'axios';

// Configuration de base d'Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes sortantes
api.interceptors.request.use(
  (config) => {
    // Ajouter le token d'authentification si disponible
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses entrantes
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gérer les erreurs d'authentification
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_token');
        // Rediriger vers la page de connexion si nécessaire
        // window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
