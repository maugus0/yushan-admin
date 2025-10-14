// Base API configuration for Yushan Admin
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios-like mock API instance
class MockAPIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.defaults = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  // Simulate network delay
  delay(ms = 300 + Math.random() * 700) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Mock request interceptor
  async request(config) {
    await this.delay();

    // Add auth token if available
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  }

  // HTTP methods
  async get(url, config = {}) {
    await this.request({ ...config, method: 'GET', url });
    return { data: null, status: 200 };
  }

  async post(url, data, config = {}) {
    await this.request({ ...config, method: 'POST', url, data });
    return { data: null, status: 201 };
  }

  async put(url, data, config = {}) {
    await this.request({ ...config, method: 'PUT', url, data });
    return { data: null, status: 200 };
  }

  async patch(url, data, config = {}) {
    await this.request({ ...config, method: 'PATCH', url, data });
    return { data: null, status: 200 };
  }

  async delete(url, config = {}) {
    await this.request({ ...config, method: 'DELETE', url });
    return { data: null, status: 204 };
  }
}

// Create API instance
const api = new MockAPIClient(API_BASE_URL);

// Response interceptor for error handling
api.interceptors = {
  response: {
    use: (successHandler, errorHandler) => {
      // Mock implementation
      return { successHandler, errorHandler };
    },
  },
};

export default api;
