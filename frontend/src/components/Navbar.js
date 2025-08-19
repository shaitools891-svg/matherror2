import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Palette, Moon, Sun, Contrast } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import SearchModal from './SearchModal';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const { subjects } = useData();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/contact', label: 'Contact' },
    { path: '/admin', label: 'Admin' }
  ];

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'high-contrast':
        return <Contrast className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover-scale">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold gradient-text">ME</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse-soft"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Math ERROR</h1>
                <p className="text-xs text-muted-foreground">HSC Resources</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Subject Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <span>Subjects</span>
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 w-80 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {subjects.map(subject => (
                      <Link
                        key={subject.id}
                        to={`/subject/${subject.id}`}
                        className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted transition-colors hover-lift"
                      >
                        <span className="text-xl">{subject.icon}</span>
                        <div>
                          <p className="font-medium text-sm">{subject.name}</p>
                          <p className="text-xs text-muted-foreground">{subject.code}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md transition-colors hover-scale ${
                    location.pathname === link.path
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-md hover:bg-muted transition-colors hover-scale"
                title="Search Resources"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsThemeOpen(true)}
                className="p-2 rounded-md hover:bg-muted transition-colors hover-scale"
                title="Change Theme"
              >
                {getThemeIcon()}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-in">
            <div className="px-4 py-4 bg-card border-t border-border">
              {/* Mobile Subject Links */}
              <div className="mb-4">
                <p className="font-semibold mb-2 text-muted-foreground">Subjects</p>
                <div className="grid grid-cols-1 gap-1">
                  {subjects.map(subject => (
                    <Link
                      key={subject.id}
                      to={`/subject/${subject.id}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <span>{subject.icon}</span>
                      <span className="text-sm">{subject.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      location.pathname === link.path
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ThemeSelector isOpen={isThemeOpen} onClose={() => setIsThemeOpen(false)} />
    </>
  );
};

export default Navbar;