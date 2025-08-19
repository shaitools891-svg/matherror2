import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SubjectPage from './components/SubjectPage';
import AdminPanel from './components/AdminPanel';
import ContactPage from './components/ContactPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/subject/:subjectId" element={<SubjectPage />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;