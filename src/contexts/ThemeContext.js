import React, { createContext, useContext, useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

// Theme definitions
const lightTheme = {
  name: 'light',
  colors: {
    // Background colors - Bright and clean
    primary: '#ffffff',
    secondary: '#fafbfc',
    tertiary: '#f8fafc',
    
    // Text colors - High contrast for readability
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textTertiary: '#64748b',
    
    // Border colors - Subtle but visible
    borderPrimary: '#e2e8f0',
    borderSecondary: '#f1f5f9',
    
    // Accent colors - Bold and vibrant
    accent: '#1a1a1a',
    accentHover: '#333333',
    
    // Status colors - Bright and clear
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#2563eb',
    
    // Shadow colors - Subtle depth
    shadow: 'rgba(0, 0, 0, 0.04)',
    shadowHover: 'rgba(0, 0, 0, 0.08)',
    
    // Card colors - Pure white with subtle hover
    card: '#ffffff',
    cardHover: '#fafbfc',
    
    // Input colors - Clean and bright
    input: '#ffffff',
    inputFocus: '#ffffff',
    inputBorder: '#d1d5db',
    inputFocusBorder: '#1a1a1a',
    
    // Button colors - High contrast
    buttonPrimary: '#1a1a1a',
    buttonSecondary: '#f3f4f6',
    buttonText: '#ffffff',
    buttonTextSecondary: '#374151',
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02)',
    large: '0 10px 40px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.03)',
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  }
};

const darkTheme = {
  name: 'dark',
  colors: {
    // Background colors
    primary: '#0f172a',
    secondary: '#1e293b',
    tertiary: '#334155',
    
    // Text colors
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    
    // Border colors
    borderPrimary: '#334155',
    borderSecondary: '#475569',
    
    // Accent colors
    accent: '#3b82f6',
    accentHover: '#60a5fa',
    
    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Shadow colors
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowHover: 'rgba(0, 0, 0, 0.5)',
    
    // Card colors
    card: '#1e293b',
    cardHover: '#334155',
    
    // Input colors
    input: '#334155',
    inputFocus: '#475569',
    inputBorder: '#475569',
    inputFocusBorder: '#3b82f6',
    
    // Button colors
    buttonPrimary: '#3b82f6',
    buttonSecondary: '#334155',
    buttonText: '#ffffff',
    buttonTextSecondary: '#f8fafc',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.3)',
    medium: '0 8px 32px rgba(0, 0, 0, 0.3)',
    large: '0 20px 60px rgba(0, 0, 0, 0.4)',
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  }
};

// Global styles for theme transitions
const GlobalStyle = createGlobalStyle`
  * {
    transition: background-color ${props => props.theme.transitions.medium}, 
                color ${props => props.theme.transitions.medium}, 
                border-color ${props => props.theme.transitions.medium},
                box-shadow ${props => props.theme.transitions.medium};
  }
  
  body {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.textPrimary};
    transition: background-color ${props => props.theme.transitions.slow}, 
                color ${props => props.theme.transitions.slow};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  /* Smooth theme transition overlay */
  .theme-transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.name === 'dark' ? '#0f172a' : '#ffffff'};
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .theme-transition-overlay.active {
    opacity: 1;
  }
`;

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('monexa-theme') || 'light';
    setTheme(savedTheme);
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('monexa-theme', theme);
  }, [theme]);

  const toggleTheme = async () => {
    setIsTransitioning(true);
    
    // Add transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    document.body.appendChild(overlay);
    
    // Trigger transition
    setTimeout(() => {
      overlay.classList.add('active');
    }, 10);
    
    // Change theme after a brief delay
    setTimeout(() => {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
      
      // Remove overlay after theme change
      setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => {
          document.body.removeChild(overlay);
          setIsTransitioning(false);
        }, 300);
      }, 100);
    }, 150);
  };

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ 
      theme: currentTheme, 
      themeName: theme, 
      toggleTheme, 
      isTransitioning 
    }}>
      <GlobalStyle theme={currentTheme} />
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
