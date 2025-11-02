// Configuration de l'API
const API_CONFIG = {
  // URL de l'API backend Railway (SANS /api à la fin car les routes l'ont déjà)
  baseURL: window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://rh-tuc-production-c8f0.up.railway.app/health',

  // Timeout des requêtes (en ms)
  timeout: 10000
};
