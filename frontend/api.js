// Gestionnaire d'API
class APIClient {
  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
        timeout: API_CONFIG.timeout
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur réseau');
      }

      return data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  // Authentification
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    this.setToken(data.token);
    return data;
  }

  async register(userData) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    this.setToken(data.token);
    return data;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Utilisateurs
  async getUsers() {
    return this.request('/users');
  }

  async getUser(id) {
    return this.request(`/users/${id}`);
  }

  async updateUser(id, updates) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE'
    });
  }

  async getCollaborators(managerId) {
    return this.request(`/users/manager/${managerId}/collaborators`);
  }

  // Congés
  async createLeave(leaveData) {
    return this.request('/leaves', {
      method: 'POST',
      body: JSON.stringify(leaveData)
    });
  }

  async getMyLeaves() {
    return this.request('/leaves/my-leaves');
  }

  async getAllLeaves() {
    return this.request('/leaves');
  }

  async getManagerLeaves(managerId) {
    return this.request(`/leaves/manager/${managerId}`);
  }

  async updateLeaveStatus(leaveId, status, managerComment) {
    return this.request(`/leaves/${leaveId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, managerComment })
    });
  }

  async deleteLeave(leaveId) {
    return this.request(`/leaves/${leaveId}`, {
      method: 'DELETE'
    });
  }

  // Documents
  async uploadDocument(documentData) {
    return this.request('/documents/upload', {
      method: 'POST',
      body: JSON.stringify(documentData)
    });
  }

  async getMyDocuments() {
    return this.request('/documents/my-documents');
  }

  async validateDocument(userId, documentId, validationStatus, rejectionReason) {
    return this.request(`/documents/${userId}/documents/${documentId}/validate`, {
      method: 'PUT',
      body: JSON.stringify({ validationStatus, rejectionReason })
    });
  }

  async requestDocument(userId, documentType, reason) {
    return this.request('/documents/request', {
      method: 'POST',
      body: JSON.stringify({ userId, documentType, reason })
    });
  }

  async deleteDocument(documentId) {
    return this.request(`/documents/${documentId}`, {
      method: 'DELETE'
    });
  }

  // Paramètres
  async getSettings() {
    return this.request('/settings');
  }

  async updateSettings(settings) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  }

  logout() {
    this.setToken(null);
  }
}

// Instance globale
const api = new APIClient();
