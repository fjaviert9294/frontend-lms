// Servicio API centralizado para comunicación con backend
const API_BASE_URL = 'http://localhost:3001';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Configurar token de autorización
  setAuthToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Obtener headers por defecto
  getHeaders(contentType = 'application/json') {
    const headers = {
      'Content-Type': contentType,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Método genérico para hacer requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Si el token expiró, limpiar auth y redirigir
      if (response.status === 401) {
        this.setAuthToken(null);
        throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error ${endpoint}:`, error);
      throw error;
    }
  }

  // ================================
  // AUTENTICACIÓN
  // ================================

  async login(email, password) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data.token) {
      this.setAuthToken(response.data.token);
    }

    return response;
  }

  async register(userData) {
    const response = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data.token) {
      this.setAuthToken(response.data.token);
    }

    return response;
  }

  async verifyToken() {
    if (!this.token) return null;
    
    try {
      const response = await this.request('/api/auth/me');
      return response.success ? response.data.user : null;
    } catch (error) {
      this.setAuthToken(null);
      return null;
    }
  }

  logout() {
    this.setAuthToken(null);
  }

  // ================================
  // USUARIOS
  // ================================

  async getUserProfile(userId) {
    const response = await this.request(`/api/users/${userId}`);
    return response.data;
  }

  async updateUserProfile(userId, updates) {
    const response = await this.request(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.data;
  }

  async changePassword(userId, passwordData) {
    const response = await this.request(`/api/users/${userId}/password`, {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
    return response.data;
  }

  async getUserCourses(userId, status = 'all') {
    const response = await this.request(`/api/users/${userId}/courses?status=${status}`);
    return response.data;
  }

  async getUserStats(userId) {
    const response = await this.request(`/api/users/${userId}/stats`);
    return response.data;
  }

  // ================================
  // CURSOS
  // ================================

  async getCourses(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/api/courses?${queryString}` : '/api/courses';
    
    const response = await this.request(endpoint);
    return response.data;
  }

  async handleUpload (file) {
    if (!file) return;
    // 1. Pedir la URL prefirmada al backend
    const res = await this.request("api/s3/presigned-url", {
      params: {
        filename: file.name,
        filetype: file.type,
      },
    });
    const { url } = res.data;
    console.log('url', url)
    // 2. Subir el archivo a S3 usando la URL
    // await axios.put(url, file, {
    //   headers: {
    //     "Content-Type": file.type,
    //   },
    // });
    const response = await this.request(url, {
      method: 'PUT',
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    return response.data;
  };

  async getCourseById(courseId) {
    const response = await this.request(`/api/courses/${courseId}`);
    return response.data;
  }

  async getCourseCategories() {
    const response = await this.request('/api/courses/categories/list');
    return response.data;
  }

  async enrollInCourse(courseId) {
    const response = await this.request(`/api/courses/${courseId}/enroll`, {
      method: 'POST',
    });
    return response.data;
  }

  async completeChapter(courseId, chapterId) {
    const response = await this.request(`/api/courses/${courseId}/chapters/${chapterId}/complete`, {
      method: 'PUT',
    });
    return response.data;
  }

  async rateCourse(courseId, rating, review = null) {
    const response = await this.request(`/api/courses/${courseId}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating, review }),
    });
    return response.data;
  }

  // ================================
  // INSIGNIAS
  // ================================

  async getBadges() {
    const response = await this.request('/api/badges');
    return response.data;
  }

  async getUserBadges() {
    const response = await this.request('/api/badges/my-badges');
    return response.data;
  }

  async checkAchievements() {
    const response = await this.request('/api/badges/check-achievements', {
      method: 'POST',
    });
    return response.data;
  }

  // ================================
  // NOTIFICACIONES
  // ================================

  async getNotifications(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined) {
        queryParams.append(key, filters[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/api/notifications?${queryString}` : '/api/notifications';
    
    const response = await this.request(endpoint);
    return response.data;
  }

  async markNotificationAsRead(notificationId) {
    const response = await this.request(`/api/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
    return response.data;
  }

  async markAllNotificationsAsRead() {
    const response = await this.request('/api/notifications/read-all', {
      method: 'PUT',
    });
    return response.data;
  }

  // ================================
  // ADMINISTRACIÓN
  // ================================

  async getAdminDashboard() {
    const response = await this.request('/api/admin/dashboard');
    return response.data;
  }

  async getUsers(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/api/admin/users?${queryString}` : '/api/admin/users';
    
    const response = await this.request(endpoint);
    return response.data;
  }

  async toggleUserStatus(userId) {
    const response = await this.request(`/api/admin/users/${userId}/toggle-status`, {
      method: 'PUT',
    });
    return response.data;
  }

  async updateUserRole(userId, role) {
    const response = await this.request(`/api/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
    return response.data;
  }

  async getCourseStats() {
    const response = await this.request('/api/admin/courses/stats');
    return response.data;
  }

  async getActivityReport(period = 30) {
    const response = await this.request(`/api/admin/reports/activity?period=${period}`);
    return response.data;
  }

  async createNotification(notificationData) {
    const response = await this.request('/api/notifications', {
      method: 'POST',
      body: JSON.stringify(notificationData),
    });
    return response.data;
  }

  async broadcastNotification(userIds, notificationData) {
    const response = await this.request('/api/notifications/broadcast', {
      method: 'POST',
      body: JSON.stringify({
        user_ids: userIds,
        ...notificationData,
      }),
    });
    return response.data;
  }

  // ================================
  // HEALTH CHECK
  // ================================

  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

// Crear instancia singleton
const apiService = new ApiService();

export default apiService;