import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

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
    // Check if admin is already logged in (from localStorage)
    const savedAdmin = localStorage.getItem('admin');
    if (savedAdmin) {
      try {
        setAdmin(JSON.parse(savedAdmin));
      } catch (error) {
        localStorage.removeItem('admin');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Mock login - in real app, this would call your API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        const mockAdmin = {
          id: 1,
          username: 'admin',
          email: 'admin@yushan.com',
          role: 'super_admin',
          permissions: ['read', 'write', 'delete', 'manage_users', 'manage_content'],
          avatar: null,
          lastLogin: new Date().toISOString(),
        };

        setAdmin(mockAdmin);
        localStorage.setItem('admin', JSON.stringify(mockAdmin));
        message.success('Login successful!');
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      message.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
    message.success('Logged out successfully');
  };

  const value = {
    admin,
    loading,
    login,
    logout,
    isAuthenticated: !!admin,
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};
