import React, { useState } from 'react';
import { X, Palette, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSelector = ({ isOpen, onClose }) => {
  const { theme, changeTheme, customColors, updateCustomColors, availableThemes } = useTheme();
  const [localColors, setLocalColors] = useState(customColors);

  const handleColorChange = (type, color) => {
    const newColors = { ...localColors, [type]: color };
    setLocalColors(newColors);
    updateCustomColors(newColors);
  };

  const applyCustomTheme = () => {
    changeTheme('custom');
    updateCustomColors(localColors);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md mx-4 bg-card border border-border rounded-lg shadow-xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Theme Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Theme Options */}
        <div className="p-4">
          <div className="space-y-3">
            {availableThemes.map((themeOption) => (
              <div
                key={themeOption.id}
                onClick={() => changeTheme(themeOption.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                  theme === themeOption.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{themeOption.name}</h3>
                    <p className="text-sm text-muted-foreground">{themeOption.description}</p>
                  </div>
                  {theme === themeOption.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
                
                {/* Theme Preview */}
                <div className="flex space-x-2 mt-3">
                  {themeOption.id === 'light' && (
                    <>
                      <div className="w-4 h-4 rounded-full bg-white border border-gray-200"></div>
                      <div className="w-4 h-4 rounded-full" style={{backgroundColor: '#90EE90'}}></div>
                      <div className="w-4 h-4 rounded-full bg-gray-100"></div>
                    </>
                  )}
                  {themeOption.id === 'dark' && (
                    <>
                      <div className="w-4 h-4 rounded-full bg-gray-900"></div>
                      <div className="w-4 h-4 rounded-full" style={{backgroundColor: '#90EE90'}}></div>
                      <div className="w-4 h-4 rounded-full bg-gray-800"></div>
                    </>
                  )}
                  {themeOption.id === 'high-contrast' && (
                    <>
                      <div className="w-4 h-4 rounded-full bg-black"></div>
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <div className="w-4 h-4 rounded-full bg-white border border-black"></div>
                    </>
                  )}
                  {themeOption.id === 'custom' && (
                    <>
                      <div className="w-4 h-4 rounded-full bg-gray-100"></div>
                      <div className="w-4 h-4 rounded-full" style={{backgroundColor: localColors.primary}}></div>
                      <div className="w-4 h-4 rounded-full bg-gray-50"></div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Custom Color Picker */}
          {theme === 'custom' && (
            <div className="mt-6 p-4 border border-border rounded-lg bg-muted/30">
              <h4 className="font-medium mb-4">Custom Colors</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={localColors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="w-12 h-8 rounded border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={localColors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      placeholder="#90EE90"
                      className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Primary Text Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={localColors.primaryForeground}
                      onChange={(e) => handleColorChange('primaryForeground', e.target.value)}
                      className="w-12 h-8 rounded border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={localColors.primaryForeground}
                      onChange={(e) => handleColorChange('primaryForeground', e.target.value)}
                      placeholder="#003200"
                      className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <button
                  onClick={applyCustomTheme}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Apply Custom Theme
                </button>
              </div>
            </div>
          )}

          {/* Theme Info */}
          <div className="mt-6 p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              💡 Your theme preference is automatically saved and will be remembered on future visits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;