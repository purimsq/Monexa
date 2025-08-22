import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('monexa_token');
      if (token) {
        try {
          apiService.setToken(token);
          const response = await apiService.getCurrentUser();
          if (response.success) {
            setUser(response.user);
          } else {
            // Invalid token, clear it
            apiService.setToken(null);
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          apiService.setToken(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password, twoFactorToken = null) => {
    try {
      const response = await apiService.login(email, password, twoFactorToken);
      if (response.success) {
        setUser(response.user);
        return { success: true };
      } else if (response.requires2FA) {
        return { success: false, requires2FA: true, error: response.error || '2FA required' };
      } else {
        return { success: false, error: response.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await apiService.signup(userData);
      if (response.success) {
        setUser(response.user);
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Signup failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message || 'Signup failed' };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await apiService.updateProfile(profileData);
      if (response.success) {
        setUser(response.user);
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Profile update failed' };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message || 'Profile update failed' };
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const refreshSession = async () => {
    try {
      const response = await apiService.refreshSession();
      if (response.success) {
        setUser(response.user);
        return true;
      }
    } catch (error) {
      console.error('Session refresh error:', error);
      // If refresh fails, logout user
      logout();
    }
    return false;
  };

  const value = {
    user,
    login,
    signup,
    updateProfile,
    logout,
    refreshSession,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};