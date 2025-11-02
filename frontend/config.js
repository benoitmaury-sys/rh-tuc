// Configuration de l'API
const API_CONFIG = {
  // URL de l'API backend Railway
  baseURL: window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://rh-tuc-production-c8f0.up.railway.app/api',

  // Timeout des requêtes (en ms)
  timeout: 10000
};
