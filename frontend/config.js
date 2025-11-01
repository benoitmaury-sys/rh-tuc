// Configuration de l'API
const API_CONFIG = {
  // URL de l'API backend - à modifier selon votre déploiement Railway
  baseURL: window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://votre-app-backend.up.railway.app/api',

  // Timeout des requêtes (en ms)
  timeout: 10000
};
