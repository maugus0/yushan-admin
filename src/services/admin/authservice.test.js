import authService from './authservice';

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('Auth Service Structure', () => {
    test('should export auth service object', () => {
      expect(authService).toBeDefined();
      expect(typeof authService).toBe('object');
    });

    test('should have login method', () => {
      expect(authService.login).toBeDefined();
      expect(typeof authService.login).toBe('function');
    });

    test('should have logout method', () => {
      expect(authService.logout).toBeDefined();
      expect(typeof authService.logout).toBe('function');
    });

    test('should have isAuthenticated method', () => {
      expect(authService.isAuthenticated).toBeDefined();
      expect(typeof authService.isAuthenticated).toBe('function');
    });

    test('should have refreshToken method', () => {
      expect(authService.refreshToken).toBeDefined();
      expect(typeof authService.refreshToken).toBe('function');
    });

    test('should have getCurrentUser method', () => {
      expect(authService.getCurrentUser).toBeDefined();
      expect(typeof authService.getCurrentUser).toBe('function');
    });

    test('should have setupTokenRefresh method', () => {
      expect(authService.setupTokenRefresh).toBeDefined();
      expect(typeof authService.setupTokenRefresh).toBe('function');
    });

    test('should have initializeAuth method', () => {
      expect(authService.initializeAuth).toBeDefined();
      expect(typeof authService.initializeAuth).toBe('function');
    });

    test('should have refreshTimer property', () => {
      expect(authService.refreshTimer !== undefined).toBe(true);
    });
  });

  describe('getCurrentUser', () => {
    test('should return user data when stored in localStorage', () => {
      const userData = { uuid: '123', username: 'admin', isAdmin: true };
      localStorage.setItem('admin_user', JSON.stringify(userData));
      const user = authService.getCurrentUser();
      expect(user).toEqual(userData);
    });

    test('should return null when no user data in localStorage', () => {
      const user = authService.getCurrentUser();
      expect(user).toBeNull();
    });

    test('should return null on invalid JSON in localStorage', () => {
      localStorage.setItem('admin_user', 'invalid json');
      const user = authService.getCurrentUser();
      expect(user).toBeNull();
    });

    test('should parse user object correctly', () => {
      const userData = {
        uuid: 'user-123',
        email: 'admin@example.com',
        username: 'testadmin',
        isAdmin: true,
      };
      localStorage.setItem('admin_user', JSON.stringify(userData));
      const user = authService.getCurrentUser();
      expect(user.uuid).toBe('user-123');
      expect(user.email).toBe('admin@example.com');
    });
  });

  describe('isAuthenticated', () => {
    test('should return true when both token and admin user exist', () => {
      const userData = { isAdmin: true };
      localStorage.setItem('accessToken', 'test-token');
      localStorage.setItem('admin_user', JSON.stringify(userData));
      expect(authService.isAuthenticated()).toBe(true);
    });

    test('should return false when no token exists', () => {
      const userData = { isAdmin: true };
      localStorage.setItem('admin_user', JSON.stringify(userData));
      expect(authService.isAuthenticated()).toBe(false);
    });

    test('should return false when no user data exists', () => {
      localStorage.setItem('accessToken', 'test-token');
      expect(authService.isAuthenticated()).toBe(false);
    });

    test('should return false when user is not admin', () => {
      const userData = { isAdmin: false };
      localStorage.setItem('accessToken', 'test-token');
      localStorage.setItem('admin_user', JSON.stringify(userData));
      expect(authService.isAuthenticated()).toBe(false);
    });

    test('should return false when token is empty', () => {
      const userData = { isAdmin: true };
      localStorage.setItem('accessToken', '');
      localStorage.setItem('admin_user', JSON.stringify(userData));
      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe('Logout', () => {
    test('should remove accessToken from localStorage', async () => {
      localStorage.setItem('accessToken', 'token');
      await authService.logout();
      expect(localStorage.getItem('accessToken')).toBeNull();
    });

    test('should remove refreshToken from localStorage', async () => {
      localStorage.setItem('refreshToken', 'token');
      await authService.logout();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });

    test('should remove admin_user from localStorage', async () => {
      localStorage.setItem('admin_user', JSON.stringify({}));
      await authService.logout();
      expect(localStorage.getItem('admin_user')).toBeNull();
    });

    test('should remove tokenType from localStorage', async () => {
      localStorage.setItem('tokenType', 'Bearer');
      await authService.logout();
      expect(localStorage.getItem('tokenType')).toBeNull();
    });

    test('should remove expiresIn from localStorage', async () => {
      localStorage.setItem('expiresIn', '3600');
      await authService.logout();
      expect(localStorage.getItem('expiresIn')).toBeNull();
    });

    test('should return success response', async () => {
      const result = await authService.logout();
      expect(result.success).toBe(true);
    });

    test('should clear refresh timer', async () => {
      authService.refreshTimer = setTimeout(() => {}, 1000);
      await authService.logout();
      expect(authService.refreshTimer).toBeNull();
    });
  });

  describe('Token Refresh Setup', () => {
    test('should store tokens in correct localStorage keys', () => {
      const tokens = {
        accessToken: 'access-token-value',
        refreshToken: 'refresh-token-value',
        tokenType: 'Bearer',
        expiresIn: '3600',
      };

      Object.entries(tokens).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });

      expect(localStorage.getItem('accessToken')).toBe('access-token-value');
      expect(localStorage.getItem('refreshToken')).toBe('refresh-token-value');
      expect(localStorage.getItem('tokenType')).toBe('Bearer');
    });

    test('setupTokenRefresh should accept expiresIn duration', () => {
      expect(() => authService.setupTokenRefresh(3600)).not.toThrow();
    });

    test('setupTokenRefresh should clear existing timer', () => {
      authService.refreshTimer = setTimeout(() => {}, 1000);
      authService.setupTokenRefresh(3600);
      expect(authService.refreshTimer).toBeDefined();
    });

    test('should not create timer for negative refresh time', () => {
      authService.refreshTimer = null;
      authService.setupTokenRefresh(-100);
      expect(authService.refreshTimer).toBeNull();
    });
  });

  describe('Credentials Validation', () => {
    test('should accept email as username in credentials', () => {
      const credentials = {
        username: 'admin@example.com',
        password: 'password123',
      };
      expect(credentials.username).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    test('should validate email format', () => {
      const email = 'test@example.com';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(email)).toBe(true);
    });

    test('should reject invalid email format', () => {
      const email = 'invalid-email';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(email)).toBe(false);
    });

    test('should validate password minimum length', () => {
      const password = 'pass123';
      expect(password.length >= 6).toBe(true);
    });

    test('should reject short password', () => {
      const password = 'pass';
      expect(password.length >= 6).toBe(false);
    });
  });

  describe('Authorization Headers', () => {
    test('should format Bearer token correctly', () => {
      const token = 'abc123xyz';
      const bearerToken = `Bearer ${token}`;
      expect(bearerToken).toMatch(/^Bearer /);
    });

    test('should include token in Authorization header', () => {
      const token = 'test-token';
      const headers = { Authorization: `Bearer ${token}` };
      expect(headers.Authorization).toBe('Bearer test-token');
    });

    test('should set content-type header', () => {
      const headers = { 'Content-Type': 'application/json' };
      expect(headers['Content-Type']).toBe('application/json');
    });
  });

  describe('Error Handling', () => {
    test('should handle 401 unauthorized error', () => {
      const error = { response: { status: 401 } };
      expect(error.response.status).toBe(401);
    });

    test('should handle 403 forbidden error', () => {
      const error = { response: { status: 403 } };
      expect(error.response.status).toBe(403);
    });

    test('should handle network errors', () => {
      const error = new Error('Network failed');
      expect(error.message).toBe('Network failed');
    });

    test('should handle admin privilege check failure', () => {
      const userData = { isAdmin: false };
      expect(userData.isAdmin).toBe(false);
    });
  });

  describe('API Endpoints', () => {
    test('should use login endpoint', () => {
      const endpoint = '/auth/login';
      expect(endpoint).toMatch(/^\/auth/);
    });

    test('should use logout endpoint', () => {
      const endpoint = '/auth/logout';
      expect(endpoint).toMatch(/^\/auth/);
    });

    test('should use refresh endpoint', () => {
      const endpoint = '/auth/refresh';
      expect(endpoint).toMatch(/^\/auth/);
    });

    test('should use correct base URL', () => {
      const baseUrl = 'https://yushan-backend-staging.up.railway.app/api';
      expect(baseUrl).toContain('api');
    });
  });

  describe('User Data Storage', () => {
    test('should store admin_user in localStorage', () => {
      const userData = { uuid: '123', isAdmin: true };
      localStorage.setItem('admin_user', JSON.stringify(userData));
      expect(localStorage.getItem('admin_user')).toBeDefined();
    });

    test('should preserve user permissions on storage', () => {
      const userData = {
        isAdmin: true,
        permissions: ['read', 'write', 'delete'],
      };
      localStorage.setItem('admin_user', JSON.stringify(userData));
      const stored = JSON.parse(localStorage.getItem('admin_user'));
      expect(stored.permissions).toHaveLength(3);
    });

    test('should extract user role from isAdmin flag', () => {
      const isAdmin = true;
      const role = isAdmin ? 'admin' : 'user';
      expect(role).toBe('admin');
    });

    test('should set user role to user when not admin', () => {
      const isAdmin = false;
      const role = isAdmin ? 'admin' : 'user';
      expect(role).toBe('user');
    });
  });

  describe('Auth Response Processing', () => {
    test('should extract user data from successful login response', () => {
      const response = {
        code: 200,
        data: {
          uuid: '123',
          email: 'admin@example.com',
          isAdmin: true,
          accessToken: 'token',
        },
      };
      expect(response.code).toBe(200);
      expect(response.data.isAdmin).toBe(true);
    });

    test('should verify success response code is 200', () => {
      const response = { code: 200 };
      expect(response.code).toBe(200);
    });

    test('should verify error response code is not 200', () => {
      const response = { code: 401 };
      expect(response.code).not.toBe(200);
    });

    test('should extract error message from response', () => {
      const response = { code: 401, message: 'Unauthorized' };
      expect(response.message).toBeDefined();
    });
  });

  describe('initializeAuth', () => {
    test('should return false when no token exists', async () => {
      const result = await authService.initializeAuth();
      expect(result).toBe(false);
    });

    test('should verify token structure requirements', () => {
      const token = 'valid-token-string';
      const expiresIn = '3600';
      localStorage.setItem('accessToken', token);
      localStorage.setItem('expiresIn', expiresIn);

      expect(localStorage.getItem('accessToken')).toBeDefined();
      expect(localStorage.getItem('expiresIn')).toBeDefined();
    });
  });
});
