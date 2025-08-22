import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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
  const [loading, setLoading] = useState(true);
  const [requires2FA, setRequires2FA] = useState(false);
  const [tempCredentials, setTempCredentials] = useState(null);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [sessionTimeout, setSessionTimeout] = useState(2); // minutes (set to 2 for testing)
  const [isSessionLocked, setIsSessionLocked] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);

  // Activity tracking
  const updateActivity = () => {
    const now = Date.now();
    setLastActivity(now);
  };

  // Session timeout check
  useEffect(() => {
    const checkSessionTimeout = () => {
      const now = Date.now();
      const timeoutMs = sessionTimeout * 60 * 1000; // Convert minutes to milliseconds
      const timeSinceActivity = now - lastActivity;
      
      if (user && timeSinceActivity > timeoutMs && !isSessionLocked) {
        // Session has timed out, lock the user
        lockSession();
      }
    };

    // Check more frequently for shorter timeouts
    const checkInterval = sessionTimeout <= 5 ? 5000 : 10000; // 5 seconds for short timeouts, 10 seconds for longer
    const interval = setInterval(checkSessionTimeout, checkInterval);
    return () => clearInterval(interval);
  }, [user, lastActivity, sessionTimeout, isSessionLocked]);

  // Activity event listeners
  useEffect(() => {
    if (!user) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      updateActivity();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [user]);

  // Load session timeout setting from user preferences
  useEffect(() => {
    if (user) {
      loadSessionTimeout();
    }
  }, [user]);

  // Listen for session timeout changes from Settings
  useEffect(() => {
    const handleSessionTimeoutChange = (e) => {
      const newTimeout = parseInt(e.detail);
      if (newTimeout && newTimeout !== sessionTimeout) {
        setSessionTimeout(newTimeout);

        // Reset activity to start counting from now
        updateActivity();
      }
    };

    window.addEventListener('sessionTimeoutChanged', handleSessionTimeoutChange);
    return () => window.removeEventListener('sessionTimeoutChanged', handleSessionTimeoutChange);
  }, [sessionTimeout, updateActivity]);

  const loadSessionTimeout = async () => {
    try {
      const response = await apiService.getUserSettings();
      if (response.success && response.settings?.session_timeout) {
        const newTimeout = parseInt(response.settings.session_timeout);
        setSessionTimeout(newTimeout);

        // Reset activity to start counting from now
        updateActivity();
      }
    } catch (error) {
      console.error('Failed to load session timeout setting:', error);
    }
  };

  const lockSession = () => {
    if (user) {
      // Store current location before locking
      setLastLocation(window.location.pathname);
      setIsSessionLocked(true);
      
      // Clear user data but keep it for restoration
      const lockedUser = { ...user };
      setUser(null);
      
      // Store locked session data in sessionStorage
      sessionStorage.setItem('lockedSession', JSON.stringify({
        user: lockedUser,
        location: window.location.pathname,
        timestamp: Date.now()
      }));
      
      toast.warning('Session timed out due to inactivity. Please log in again.', {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false
      });
    }
  };

  const unlockSession = async (email, password, twoFactorToken = null) => {
    try {
      const response = await apiService.login(email, password, twoFactorToken);
      
      if (response.success) {
        setUser(response.user);
        setIsSessionLocked(false);
        setLastLocation(null);
        setRequires2FA(false);
        setTempCredentials(null);
        
        // Clear locked session data
        sessionStorage.removeItem('lockedSession');
        
        // Restore last activity
        updateActivity();
        
        toast.success('Session restored successfully!', {
          position: "bottom-right",
          autoClose: 3000,
        });
        
        return { success: true };
      } else if (response.requires2FA) {
        setRequires2FA(true);
        setTempCredentials({ email, password });
        return { success: false, requires2FA: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to restore session' };
    }
  };

  const complete2FALogin = async (token) => {
    if (!tempCredentials) {
      return { success: false, error: 'No temporary credentials found' };
    }

    try {
      const response = await apiService.login(tempCredentials.email, tempCredentials.password, token);
      
      if (response.success) {
        setUser(response.user);
        setIsSessionLocked(false);
        setLastLocation(null);
        setRequires2FA(false);
        setTempCredentials(null);
        
        // Clear locked session data
        sessionStorage.removeItem('lockedSession');
        
        // Restore last activity
        updateActivity();
        
        toast.success('Session restored successfully!', {
          position: "bottom-right",
          autoClose: 3000,
        });
        
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to complete 2FA verification' };
    }
  };

  // Check for locked session on app start
  useEffect(() => {
    const lockedSession = sessionStorage.getItem('lockedSession');
    if (lockedSession) {
      try {
        const sessionData = JSON.parse(lockedSession);
        const sessionAge = Date.now() - sessionData.timestamp;
        const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (sessionAge < maxSessionAge) {
          setIsSessionLocked(true);
          setLastLocation(sessionData.location);
        } else {
          // Session too old, clear it
          sessionStorage.removeItem('lockedSession');
        }
      } catch (error) {
        console.error('Failed to parse locked session:', error);
        sessionStorage.removeItem('lockedSession');
      }
    }
  }, []);

  // Initialize auth on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('monexa_token');
      if (token) {
        try {
          apiService.setToken(token);
          const response = await apiService.getCurrentUser();
          if (response.success) {
            setUser(response.user);
            updateActivity(); // Initialize activity tracking
          } else {
            // Invalid token, clear it
            apiService.setToken(null);
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          apiService.setToken(null);
        }
      }
      setLoading(false);
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
    isLoading: loading,
    isAuthenticated: !!user,
    requires2FA,
    tempCredentials,
    lastLocation,
    isSessionLocked,
    sessionTimeout,
    updateActivity,
    lockSession,
    unlockSession,
    complete2FALogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};