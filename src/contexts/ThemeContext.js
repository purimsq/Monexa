import React, { createContext, useContext, useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

// Font definitions - 4 professional + 4 fun fonts
export const fonts = {
  // Professional Fonts
  inter: {
    name: 'Inter',
    family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'Professional',
    description: 'Clean and modern'
  },
  roboto: {
    name: 'Roboto',
    family: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    category: 'Professional',
    description: 'Google\'s trusted font'
  },
  openSans: {
    name: 'Open Sans',
    family: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'Professional',
    description: 'Highly legible and clean'
  },
  sourceSans: {
    name: 'Source Sans Pro',
    family: "'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'Professional',
    description: 'Clean and corporate'
  },
  
  // Fun & Curvy Fonts
  nunito: {
    name: 'Nunito',
    family: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'Fun',
    description: 'Rounded and friendly'
  },
  comfortaa: {
    name: 'Comfortaa',
    family: "'Comfortaa', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'Fun',
    description: 'Bubble-like and playful'
  },
  quicksand: {
    name: 'Quicksand',
    family: "'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'Fun',
    description: 'Smooth and curvy'
  },
  fredoka: {
    name: 'Fredoka',
    family: "'Fredoka', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'Fun',
    description: 'Bouncy and cheerful'
  }
};

// Helper function to convert hex to RGB for rgba usage
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
    '255, 255, 255'; // fallback to white
};

// Accent Color Themes - 6 beautiful color mixes + default
export const accentThemes = {
  default: {
    name: 'Default',
    colors: ['#1a1a1a', '#333333', '#4a4a4a', '#666666'],
    gradient: 'linear-gradient(135deg, #1a1a1a, #333333, #4a4a4a, #666666)',
    description: 'Neutral and balanced',
    light: {
      primary: '#ffffff',
      secondary: '#fafbfc',
      tertiary: '#f8fafc',
      background: '#ffffff',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      textTertiary: '#64748b',
      borderPrimary: '#e2e8f0',
      borderSecondary: '#f1f5f9',
      card: '#ffffff',
      cardHover: '#fafbfc',
      input: '#ffffff',
      inputBorder: '#d1d5db',
      buttonPrimary: '#1a1a1a',
      buttonSecondary: '#f3f4f6',
      buttonText: '#ffffff',
      buttonTextSecondary: '#374151',
      accent: '#1a1a1a',
      accentHover: '#333333'
    },
    dark: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      background: '#0f172a',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
      borderPrimary: '#334155',
      borderSecondary: '#475569',
      card: '#1e293b',
      cardHover: '#334155',
      input: '#334155',
      inputBorder: '#475569',
      buttonPrimary: '#1a1a1a',
      buttonSecondary: '#334155',
      buttonText: '#ffffff',
      buttonTextSecondary: '#f8fafc',
      accent: '#1a1a1a',
      accentHover: '#333333'
    }
  },
  blue: {
    name: 'Ocean Blue',
    colors: ['#3b82f6', '#1d4ed8', '#60a5fa', '#1e40af'],
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8, #60a5fa, #1e40af)',
    description: 'Professional and calming',
    light: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      background: '#f0f8ff',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      textTertiary: '#64748b',
      borderPrimary: '#e2e8f0',
      borderSecondary: '#f1f5f9',
      card: '#ffffff',
      cardHover: '#f8fafc',
      input: '#ffffff',
      inputBorder: '#d1d5db',
      buttonPrimary: '#3b82f6',
      buttonSecondary: '#f3f4f6',
      buttonText: '#ffffff',
      buttonTextSecondary: '#374151',
      accent: '#3b82f6',
      accentHover: '#1d4ed8'
    },
    dark: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      background: '#0a1a2e',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
      borderPrimary: '#334155',
      borderSecondary: '#475569',
      card: '#1e293b',
      cardHover: '#334155',
      input: '#334155',
      inputBorder: '#475569',
      buttonPrimary: '#3b82f6',
      buttonSecondary: '#334155',
      buttonText: '#ffffff',
      buttonTextSecondary: '#f8fafc',
      accent: '#3b82f6',
      accentHover: '#1d4ed8'
    }
  },
  green: {
    name: 'Emerald Green',
    colors: ['#10b981', '#059669', '#34d399', '#047857'],
    gradient: 'linear-gradient(135deg, #10b981, #059669, #34d399, #047857)',
    description: 'Fresh and natural',
    light: {
      primary: '#ffffff',
      secondary: '#f0fdf4',
      tertiary: '#ecfdf5',
      background: '#f0fdf4',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      textTertiary: '#64748b',
      borderPrimary: '#d1fae5',
      borderSecondary: '#ecfdf5',
      card: '#ffffff',
      cardHover: '#f0fdf4',
      input: '#ffffff',
      inputBorder: '#d1fae5',
      buttonPrimary: '#10b981',
      buttonSecondary: '#f3f4f6',
      buttonText: '#ffffff',
      buttonTextSecondary: '#374151',
      accent: '#10b981',
      accentHover: '#059669'
    },
    dark: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      background: '#0a1f0a',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
      borderPrimary: '#334155',
      borderSecondary: '#475569',
      card: '#1e293b',
      cardHover: '#334155',
      input: '#334155',
      inputBorder: '#475569',
      buttonPrimary: '#10b981',
      buttonSecondary: '#334155',
      buttonText: '#ffffff',
      buttonTextSecondary: '#f8fafc',
      accent: '#10b981',
      accentHover: '#059669'
    }
  },
  orange: {
    name: 'Sunset Orange',
    colors: ['#f97316', '#ea580c', '#fb923c', '#c2410c'],
    gradient: 'linear-gradient(135deg, #f97316, #ea580c, #fb923c, #c2410c)',
    description: 'Warm and energetic',
    light: {
      primary: '#ffffff',
      secondary: '#fff7ed',
      tertiary: '#ffedd5',
      background: '#fff7ed',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      textTertiary: '#64748b',
      borderPrimary: '#fed7aa',
      borderSecondary: '#ffedd5',
      card: '#ffffff',
      cardHover: '#fff7ed',
      input: '#ffffff',
      inputBorder: '#fed7aa',
      buttonPrimary: '#f97316',
      buttonSecondary: '#f3f4f6',
      buttonText: '#ffffff',
      buttonTextSecondary: '#374151',
      accent: '#f97316',
      accentHover: '#ea580c'
    },
    dark: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      background: '#1a0f0a',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
      borderPrimary: '#334155',
      borderSecondary: '#475569',
      card: '#1e293b',
      cardHover: '#334155',
      input: '#334155',
      inputBorder: '#475569',
      buttonPrimary: '#f97316',
      buttonSecondary: '#334155',
      buttonText: '#ffffff',
      buttonTextSecondary: '#f8fafc',
      accent: '#f97316',
      accentHover: '#ea580c'
    }
  },
  teal: {
    name: 'Ocean Teal',
    colors: ['#06b6d4', '#0891b2', '#22d3ee', '#0e7490'],
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2, #22d3ee, #0e7490)',
    description: 'Modern and refreshing',
    light: {
      primary: '#ffffff',
      secondary: '#f0fdfa',
      tertiary: '#ccfbf1',
      background: '#f0fdfa',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      textTertiary: '#64748b',
      borderPrimary: '#99f6e4',
      borderSecondary: '#ccfbf1',
      card: '#ffffff',
      cardHover: '#f0fdfa',
      input: '#ffffff',
      inputBorder: '#99f6e4',
      buttonPrimary: '#06b6d4',
      buttonSecondary: '#f3f4f6',
      buttonText: '#ffffff',
      buttonTextSecondary: '#374151',
      accent: '#06b6d4',
      accentHover: '#0891b2'
    },
    dark: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      background: '#0a1f1a',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
      borderPrimary: '#334155',
      borderSecondary: '#475569',
      card: '#1e293b',
      cardHover: '#334155',
      input: '#334155',
      inputBorder: '#475569',
      buttonPrimary: '#06b6d4',
      buttonSecondary: '#334155',
      buttonText: '#ffffff',
      buttonTextSecondary: '#f8fafc',
      accent: '#06b6d4',
      accentHover: '#0891b2'
    }
  },
  rose: {
    name: 'Rose Pink',
    colors: ['#f43f5e', '#e11d48', '#fb7185', '#be123c'],
    gradient: 'linear-gradient(135deg, #f43f5e, #e11d48, #fb7185, #be123c)',
    description: 'Elegant and vibrant',
    light: {
      primary: '#ffffff',
      secondary: '#fff1f2',
      tertiary: '#ffe4e6',
      background: '#fff1f2',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      textTertiary: '#64748b',
      borderPrimary: '#fecdd3',
      borderSecondary: '#ffe4e6',
      card: '#ffffff',
      cardHover: '#fff1f2',
      input: '#ffffff',
      inputBorder: '#fecdd3',
      buttonPrimary: '#f43f5e',
      buttonSecondary: '#f3f4f6',
      buttonText: '#ffffff',
      buttonTextSecondary: '#374151',
      accent: '#f43f5e',
      accentHover: '#e11d48'
    },
    dark: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      background: '#1a0f0f',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
      borderPrimary: '#334155',
      borderSecondary: '#475569',
      card: '#1e293b',
      cardHover: '#334155',
      input: '#334155',
      inputBorder: '#475569',
      buttonPrimary: '#f43f5e',
      buttonSecondary: '#334155',
      buttonText: '#ffffff',
      buttonTextSecondary: '#f8fafc',
      accent: '#f43f5e',
      accentHover: '#e11d48'
    }
  },
  amber: {
    name: 'Golden Amber',
    colors: ['#f59e0b', '#d97706', '#fbbf24', '#b45309'],
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706, #fbbf24, #b45309)',
    description: 'Rich and luxurious',
    light: {
      primary: '#ffffff',
      secondary: '#fffbeb',
      tertiary: '#fef3c7',
      background: '#fffbeb',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      textTertiary: '#64748b',
      borderPrimary: '#fde68a',
      borderSecondary: '#fef3c7',
      card: '#ffffff',
      cardHover: '#fffbeb',
      input: '#ffffff',
      inputBorder: '#fde68a',
      buttonPrimary: '#f59e0b',
      buttonSecondary: '#f3f4f6',
      buttonText: '#ffffff',
      buttonTextSecondary: '#374151',
      accent: '#f59e0b',
      accentHover: '#d97706'
    },
    dark: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      background: '#1a150a',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
      borderPrimary: '#334155',
      borderSecondary: '#475569',
      card: '#1e293b',
      cardHover: '#334155',
      input: '#334155',
      inputBorder: '#475569',
      buttonPrimary: '#f59e0b',
      buttonSecondary: '#334155',
      buttonText: '#ffffff',
      buttonTextSecondary: '#f8fafc',
      accent: '#f59e0b',
      accentHover: '#d97706'
    }
  }
};

// Base theme definitions (will be enhanced with accent colors)
const createLightTheme = (accentTheme) => ({
  name: 'light',
  colors: {
    // Use the accent theme's light colors
    ...accentTheme.light,
    
    // Status colors - Bright and clear
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#2563eb',
    
    // Shadow colors - Subtle depth
    shadow: 'rgba(0, 0, 0, 0.04)',
    shadowHover: 'rgba(0, 0, 0, 0.08)',
    
    // Input focus colors
    inputFocus: '#ffffff',
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
});

const createDarkTheme = (accentTheme) => ({
  name: 'dark',
  colors: {
    // Use the accent theme's dark colors
    ...accentTheme.dark,
    
    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Shadow colors
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowHover: 'rgba(0, 0, 0, 0.5)',
    
    // Input focus colors
    inputFocus: '#475569',
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
});

const createGlassmorphismTheme = (accentTheme) => {
  // Extract accent colors for glassmorphism styling
  const accentColor = accentTheme.colors[0]; // Primary accent color
  const accentColorSecondary = accentTheme.colors[1]; // Secondary accent color
  
  return {
    name: 'glassmorphism',
    colors: {
      // Inspired by the frosted headphones image - icy blues, whites, with accent colors
      primary: 'rgba(255, 255, 255, 0.1)',
      secondary: 'rgba(240, 248, 255, 0.15)',
      tertiary: 'rgba(230, 240, 250, 0.2)',
      background: 'url("/images/morphism.png") center/cover no-repeat fixed',
      textPrimary: '#1a237e',
      textSecondary: '#283593',
      textTertiary: '#3949ab',
      borderPrimary: `rgba(${hexToRgb(accentColor)}, 0.3)`,
      borderSecondary: `rgba(${hexToRgb(accentColor)}, 0.2)`,
      card: 'rgba(255, 255, 255, 0.25)',
      cardHover: 'rgba(255, 255, 255, 0.35)',
      input: 'rgba(255, 255, 255, 0.2)',
      inputBorder: `rgba(${hexToRgb(accentColor)}, 0.4)`,
      inputFocus: 'rgba(255, 255, 255, 0.3)',
      inputFocusBorder: accentColor,
      buttonPrimary: accentColor,
      buttonSecondary: 'rgba(255, 255, 255, 0.2)',
      buttonText: '#ffffff',
      buttonTextSecondary: '#1a237e',
      accent: accentColor,
      accentHover: accentColorSecondary,
      
      // Status colors - Vibrant and clear for glassmorphism
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
      info: '#2196f3',
      
      // Shadow colors - Subtle glass shadows
      shadow: 'rgba(31, 38, 135, 0.15)',
      shadowHover: 'rgba(31, 38, 135, 0.25)',
      
      // Glassmorphism specific properties with accent colors
      glassEffect: 'backdrop-filter: blur(20px) saturate(180%);',
      glassBorder: '1px solid rgba(255, 255, 255, 0.3)',
      glassShadow: `0 8px 32px rgba(${hexToRgb(accentColor)}, 0.2)`,
      frostEffect: 'backdrop-filter: blur(10px) saturate(150%);',
      frostBorder: '1px solid rgba(255, 255, 255, 0.2)',
      frostShadow: `0 4px 16px rgba(${hexToRgb(accentColor)}, 0.15)`
    },
    shadows: {
      small: `0 4px 16px rgba(${hexToRgb(accentColor)}, 0.15)`,
      medium: `0 8px 32px rgba(${hexToRgb(accentColor)}, 0.2)`,
      large: `0 20px 60px rgba(${hexToRgb(accentColor)}, 0.25)`,
    },
    transitions: {
      fast: '0.2s ease',
      medium: '0.3s ease',
      slow: '0.5s ease',
    }
  };
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
    background-color: ${props => props.theme.colors.background || props.theme.colors.primary};
    color: ${props => props.theme.colors.textPrimary};
    transition: background-color ${props => props.theme.transitions.slow}, 
                color ${props => props.theme.transitions.slow};
    font-family: ${props => props.fontFamily};
  }
  
  /* Glassmorphism specific styles */
  .glassmorphism-card {
    background: ${props => props.theme.name === 'glassmorphism' ? props.theme.colors.card : 'transparent'};
    backdrop-filter: ${props => props.theme.name === 'glassmorphism' ? 'blur(20px) saturate(180%)' : 'none'};
    border: ${props => props.theme.name === 'glassmorphism' ? props.theme.colors.glassBorder : 'none'};
    box-shadow: ${props => props.theme.name === 'glassmorphism' ? props.theme.colors.glassShadow : 'none'};
  }
  
  .glassmorphism-frost {
    background: ${props => props.theme.name === 'glassmorphism' ? props.theme.colors.card : 'transparent'};
    backdrop-filter: ${props => props.theme.name === 'glassmorphism' ? 'blur(10px) saturate(150%)' : 'none'};
    border: ${props => props.theme.name === 'glassmorphism' ? props.theme.colors.frostBorder : 'none'};
    box-shadow: ${props => props.theme.name === 'glassmorphism' ? props.theme.colors.frostShadow : 'none'};
  }
  
  /* Smooth theme transition overlay */
  .theme-transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.name === 'dark' ? '#0f172a' : 
                  props.theme.name === 'glassmorphism' ? 'url("/images/morphism.png") center/cover no-repeat fixed' : 
                  '#ffffff'};
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
  const [selectedFont, setSelectedFont] = useState('inter');
  const [selectedAccent, setSelectedAccent] = useState('default');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load theme, font, and accent from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('monexa-theme') || 'light';
    const savedFont = localStorage.getItem('monexa-font') || 'inter';
    const savedAccent = localStorage.getItem('monexa-accent') || 'default';
    setTheme(savedTheme);
    setSelectedFont(savedFont);
    setSelectedAccent(savedAccent);
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('monexa-theme', theme);
  }, [theme]);

  // Save font to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('monexa-font', selectedFont);
  }, [selectedFont]);

  // Save accent to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('monexa-accent', selectedAccent);
  }, [selectedAccent]);

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
      setTheme(prev => {
        if (prev === 'light') return 'dark';
        if (prev === 'dark') return 'glassmorphism';
        return 'light';
      });
      
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

  const currentAccent = accentThemes[selectedAccent];
  const currentTheme = theme === 'dark' ? createDarkTheme(currentAccent) : 
                      theme === 'glassmorphism' ? createGlassmorphismTheme(currentAccent) : 
                      createLightTheme(currentAccent);
  const currentFont = fonts[selectedFont];

  return (
    <ThemeContext.Provider value={{ 
      theme: currentTheme, 
      themeName: theme, 
      selectedFont,
      currentFont,
      setSelectedFont,
      selectedAccent,
      currentAccent,
      setSelectedAccent,
      toggleTheme, 
      isTransitioning 
    }}>
      <GlobalStyle theme={currentTheme} fontFamily={currentFont.family} />
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
