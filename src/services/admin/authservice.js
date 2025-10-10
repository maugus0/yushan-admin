import api from './api';

// Mock admin users for development
const mockAdmins = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@yushan.com',
    password: 'admin123', // In real app, this would be hashed
    role: 'super_admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_content', 'manage_settings', 'view_analytics'],
    profile: {
      firstName: 'Super',
      lastName: 'Admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin',
      phone: '+1-555-0001',
      department: 'IT Administration',
      joinDate: '2023-01-15T00:00:00.000Z',
      lastLogin: new Date().toISOString(),
    },
    settings: {
      theme: 'light',
      language: 'en',
      notifications: true,
      twoFactorEnabled: true,
    }
  },
  {
    id: 2,
    username: 'moderator',
    email: 'moderator@yushan.com',
    password: 'mod123',
    role: 'moderator',
    permissions: ['read', 'write', 'manage_content', 'moderate_comments'],
    profile: {
      firstName: 'Content',
      lastName: 'Moderator',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Moderator',
      phone: '+1-555-0002',
      department: 'Content Management',
      joinDate: '2023-03-10T00:00:00.000Z',
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    settings: {
      theme: 'dark',
      language: 'en',
      notifications: true,
      twoFactorEnabled: false,
    }
  },
  {
    id: 3,
    username: 'editor',
    email: 'editor@yushan.com',
    password: 'edit123',
    role: 'editor',
    permissions: ['read', 'write', 'manage_content'],
    profile: {
      firstName: 'Novel',
      lastName: 'Editor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Editor',
      phone: '+1-555-0003',
      department: 'Editorial',
      joinDate: '2023-06-20T00:00:00.000Z',
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    settings: {
      theme: 'light',
      language: 'en',
      notifications: false,
      twoFactorEnabled: true,
    }
  }
];

export const authService = {
  // Login
  login: async (credentials) => {
    try {
      await api.delay(800);
      
      const { username, password, rememberMe } = credentials;
      const admin = mockAdmins.find(
        admin => (admin.username === username || admin.email === username) && 
                admin.password === password
      );

      if (!admin) {
        throw new Error('Invalid username or password');
      }

      // Update last login
      admin.profile.lastLogin = new Date().toISOString();

      // Generate mock token
      const token = `yushan_token_${admin.id}_${Date.now()}`;
      
      // Store token
      if (rememberMe) {
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_remember', 'true');
      } else {
        sessionStorage.setItem('admin_token', token);
      }
      
      localStorage.setItem('admin_user', JSON.stringify({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
        profile: admin.profile,
      }));

      return {
        success: true,
        data: {
          user: {
            id: admin.id,
            username: admin.username,
            email: admin.email,
            role: admin.role,
            permissions: admin.permissions,
            profile: admin.profile,
          },
          token,
          expiresIn: rememberMe ? '30d' : '24h',
        }
      };
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.delay(200);
      
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      localStorage.removeItem('admin_remember');
      sessionStorage.removeItem('admin_token');
      
      return { success: true };
    } catch (error) {
      throw new Error('Logout failed');
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      await api.delay(300);
      
      const userJson = localStorage.getItem('admin_user');
      if (!userJson) {
        throw new Error('No authenticated user');
      }
      
      const user = JSON.parse(userJson);
      const admin = mockAdmins.find(a => a.id === user.id);
      
      return {
        success: true,
        data: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          permissions: admin.permissions,
          profile: admin.profile,
          settings: admin.settings,
        }
      };
    } catch (error) {
      throw new Error('Failed to get current user');
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      await api.delay(300);
      
      const currentToken = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
      if (!currentToken) {
        throw new Error('No token to refresh');
      }
      
      const newToken = `yushan_token_refreshed_${Date.now()}`;
      
      if (localStorage.getItem('admin_remember')) {
        localStorage.setItem('admin_token', newToken);
      } else {
        sessionStorage.setItem('admin_token', newToken);
      }
      
      return {
        success: true,
        data: {
          token: newToken,
          expiresIn: localStorage.getItem('admin_remember') ? '30d' : '24h',
        }
      };
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      await api.delay(600);
      
      const { currentPassword, newPassword } = passwordData;
      const userJson = localStorage.getItem('admin_user');
      
      if (!userJson) {
        throw new Error('No authenticated user');
      }
      
      const user = JSON.parse(userJson);
      const admin = mockAdmins.find(a => a.id === user.id);
      
      if (admin.password !== currentPassword) {
        throw new Error('Current password is incorrect');
      }
      
      // Update password
      admin.password = newPassword;
      
      return {
        success: true,
        message: 'Password changed successfully'
      };
    } catch (error) {
      throw new Error(error.message || 'Password change failed');
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      await api.delay(500);
      
      const userJson = localStorage.getItem('admin_user');
      if (!userJson) {
        throw new Error('No authenticated user');
      }
      
      const user = JSON.parse(userJson);
      const admin = mockAdmins.find(a => a.id === user.id);
      
      // Update profile
      admin.profile = { ...admin.profile, ...profileData };
      
      // Update local storage
      const updatedUser = {
        ...user,
        profile: admin.profile,
      };
      localStorage.setItem('admin_user', JSON.stringify(updatedUser));
      
      return {
        success: true,
        data: updatedUser
      };
    } catch (error) {
      throw new Error('Profile update failed');
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    return !!(token && user);
  },

  // Get user permissions
  getUserPermissions: () => {
    try {
      const userJson = localStorage.getItem('admin_user');
      if (!userJson) return [];
      
      const user = JSON.parse(userJson);
      return user.permissions || [];
    } catch {
      return [];
    }
  },

  // Check specific permission
  hasPermission: (permission) => {
    const permissions = authService.getUserPermissions();
    return permissions.includes(permission);
  },
};

export default authService;
