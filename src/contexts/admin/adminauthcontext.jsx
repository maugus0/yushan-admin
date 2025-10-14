import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import authService from '../../services/admin/authservice';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state on component mount
    const initAuth = async () => {
      try {
        const isAuthenticated = await authService.initializeAuth();
        if (isAuthenticated) {
          const currentUser = authService.getCurrentUser();
          setAdmin(currentUser);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const result = await authService.login(credentials);
      if (result.success) {
        setAdmin(result.data.user);
        message.success('Login successful!');
        return { success: true };
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      message.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setAdmin(null);
      message.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout API fails, clear local state
      setAdmin(null);
      message.success('Logged out successfully');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    admin,
    loading,
    login,
    logout,
    isAuthenticated: !!admin,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
