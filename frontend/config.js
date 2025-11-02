// Configuration de l'API
const API_CONFIG = {
  baseURL: window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://rh-tuc-production-ff49.up.railway.app',
  timeout: 10000
};
