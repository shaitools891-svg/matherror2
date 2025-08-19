import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [customColors, setCustomColors] = useState({
    primary: '#90EE90',
    primaryForeground: '#003200'
  });

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('math-error-theme');
    const savedColors = localStorage.getItem('math-error-custom-colors');
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    if (savedColors) {
      setCustomColors(JSON.parse(savedColors));
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Apply custom colors if theme is custom
    if (theme === 'custom') {
      const rgb = hexToRgb(customColors.primary);
      const fgRgb = hexToRgb(customColors.primaryForeground);
      
      document.documentElement.style.setProperty('--custom-primary', `${rgb.r} ${rgb.g} ${rgb.b}`);
      document.documentElement.style.setProperty('--custom-primary-foreground', `${fgRgb.r} ${fgRgb.g} ${fgRgb.b}`);
    }
    
    // Save to localStorage
    localStorage.setItem('math-error-theme', theme);
    localStorage.setItem('math-error-custom-colors', JSON.stringify(customColors));
  }, [theme, customColors]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 144, g: 238, b: 144 };
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const updateCustomColors = (colors) => {
    setCustomColors(colors);
    if (theme === 'custom') {
      // Trigger re-render to apply new colors
      setTheme('custom');
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      changeTheme,
      customColors,
      updateCustomColors,
      availableThemes: [
        { id: 'light', name: 'Light', description: 'Clean and bright' },
        { id: 'dark', name: 'Dark', description: 'Easy on the eyes' },
        { id: 'high-contrast', name: 'High Contrast', description: 'Maximum accessibility' },
        { id: 'custom', name: 'Custom', description: 'Your own colors' }
      ]
    }}>
      {children}
    </ThemeContext.Provider>
  );
};