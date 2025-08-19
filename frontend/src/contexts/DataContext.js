import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Default HSC subjects and structure
const defaultSubjects = [
  {
    id: 'bangla-1st',
    name: 'Bangla 1st Paper',
    code: 'BAN101',
    icon: '📝',
    color: 'from-red-400 to-red-600',
    description: 'বাংলা প্রথম পত্র',
    resources: {
      papers: [],
      pedia: [],
      videos: []
    }
  },
  {
    id: 'bangla-2nd',
    name: 'Bangla 2nd Paper',
    code: 'BAN102',
    icon: '📚',
    color: 'from-red-500 to-red-700',
    description: 'বাংলা দ্বিতীয় পত্র',
    resources: {
      papers: [],
      pedia: [],
      videos: []
    }
  },
  {
    id: 'english-1st',
    name: 'English 1st Paper',
    code: 'ENG101',
    icon: '🇬🇧',
    color: 'from-blue-400 to-blue-600',
    description: 'English First Paper',
    resources: {
      papers: [],
      pedia: [],
      videos: []
    }
  },
  {
    id: 'english-2nd',
    name: 'English 2nd Paper',
    code: 'ENG102',
    icon: '📖',
    color: 'from-blue-500 to-blue-700',
    description: 'English Second Paper',
    resources: {
      papers: [],
      pedia: [],
      videos: []
    }
  },
  {
    id: 'ict',
    name: 'ICT',
    code: 'ICT101',
    icon: '💻',
    color: 'from-purple-400 to-purple-600',
    description: 'Information & Communication Technology',
    resources: {
      papers: [],
      pedia: [],
      videos: []
    }
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: 'CHE101',
    icon: '⚗️',
    color: 'from-green-400 to-green-600',
    description: 'রসায়ন',
    resources: {
      papers: [],
      pedia: [],
      videos: []
    }
  },
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHY101',
    icon: '⚛️',
    color: 'from-indigo-400 to-indigo-600',
    description: 'পদার্থবিজ্ঞান',
    resources: {
      papers: [],
      pedia: [],
      videos: []
    }
  },
  {
    id: 'higher-math',
    name: 'Higher Mathematics',
    code: 'MAT101',
    icon: '📐',
    color: 'from-orange-400 to-orange-600',
    description: 'উচ্চতর গণিত',
    resources: {
      papers: [],
      pedia: [],
      videos: []
    }
  },
  {
    id: 'biology',
    name: 'Biology',
    code: 'BIO101',
    icon: '🧬',
    color: 'from-emerald-400 to-emerald-600',
    description: 'জীববিজ্ঞান',
    resources: {
      papers: [],
      pedia: [],
      videos: []
    }
  }
];

export const DataProvider = ({ children }) => {
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [downloads, setDownloads] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Load data from localStorage
    const savedSubjects = localStorage.getItem('math-error-subjects');
    const savedDownloads = localStorage.getItem('math-error-downloads');
    const savedSearchHistory = localStorage.getItem('math-error-search-history');

    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    }

    if (savedDownloads) {
      setDownloads(JSON.parse(savedDownloads));
    }

    if (savedSearchHistory) {
      setSearchHistory(JSON.parse(savedSearchHistory));
    }
  }, []);

  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addResource = (subjectId, type, resource) => {
    const updatedSubjects = subjects.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          resources: {
            ...subject.resources,
            [type]: [...subject.resources[type], {
              id: Date.now().toString(),
              ...resource,
              dateAdded: new Date().toISOString()
            }]
          }
        };
      }
      return subject;
    });
    
    setSubjects(updatedSubjects);
    saveToStorage('math-error-subjects', updatedSubjects);
  };

  const removeResource = (subjectId, type, resourceId) => {
    const updatedSubjects = subjects.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          resources: {
            ...subject.resources,
            [type]: subject.resources[type].filter(r => r.id !== resourceId)
          }
        };
      }
      return subject;
    });
    
    setSubjects(updatedSubjects);
    saveToStorage('math-error-subjects', updatedSubjects);
  };

  const trackDownload = (subjectId, resourceType, resourceId, resourceName) => {
    const download = {
      id: Date.now().toString(),
      subjectId,
      resourceType,
      resourceId,
      resourceName,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    };

    const updatedDownloads = [download, ...downloads].slice(0, 100); // Keep last 100 downloads
    setDownloads(updatedDownloads);
    saveToStorage('math-error-downloads', updatedDownloads);
  };

  const addSearchHistory = (query, results) => {
    const search = {
      id: Date.now().toString(),
      query,
      results: results.length,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [search, ...searchHistory].slice(0, 50); // Keep last 50 searches
    setSearchHistory(updatedHistory);
    saveToStorage('math-error-search-history', updatedHistory);
  };

  const searchResources = (query) => {
    if (!query.trim()) return [];

    const results = [];
    const lowerQuery = query.toLowerCase();

    subjects.forEach(subject => {
      // Search in all resource types
      ['papers', 'pedia', 'videos'].forEach(type => {
        subject.resources[type].forEach(resource => {
          if (
            resource.title?.toLowerCase().includes(lowerQuery) ||
            resource.description?.toLowerCase().includes(lowerQuery) ||
            subject.name.toLowerCase().includes(lowerQuery)
          ) {
            results.push({
              ...resource,
              subjectId: subject.id,
              subjectName: subject.name,
              resourceType: type
            });
          }
        });
      });
    });

    addSearchHistory(query, results);
    return results;
  };

  const getSubjectById = (id) => subjects.find(s => s.id === id);

  return (
    <DataContext.Provider value={{
      subjects,
      downloads,
      searchHistory,
      addResource,
      removeResource,
      trackDownload,
      searchResources,
      getSubjectById,
      stats: {
        totalSubjects: subjects.length,
        totalResources: subjects.reduce((acc, subject) => 
          acc + Object.values(subject.resources).flat().length, 0),
        totalDownloads: downloads.length,
        recentDownloads: downloads.slice(0, 10)
      }
    }}>
      {children}
    </DataContext.Provider>
  );
};