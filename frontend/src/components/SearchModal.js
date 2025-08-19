import React, { useState, useEffect, useRef } from 'react';
import { X, Search, FileText, Video, BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const { searchResources, trackDownload } = useData();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const searchTimeout = setTimeout(() => {
      const searchResults = searchResources(query);
      setResults(searchResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, searchResources]);

  const getResourceIcon = (type) => {
    switch (type) {
      case 'papers':
        return <FileText className="h-4 w-4" />;
      case 'pedia':
        return <BookOpen className="h-4 w-4" />;
      case 'videos':
        return <Video className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getResourceTypeLabel = (type) => {
    switch (type) {
      case 'papers':
        return 'Paper';
      case 'pedia':
        return 'Notes';
      case 'videos':
        return 'Video';
      default:
        return 'Resource';
    }
  };

  const handleResourceClick = (resource) => {
    trackDownload(resource.subjectId, resource.resourceType, resource.id, resource.title);
    
    if (resource.resourceType === 'videos') {
      // Open YouTube video in new tab
      window.open(resource.url, '_blank');
    } else {
      // Open PDF/Drive link in new tab
      window.open(resource.url, '_blank');
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl mx-4 bg-card border border-border rounded-lg shadow-xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Search Resources</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for papers, notes, videos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              <div className="animate-pulse">Searching...</div>
            </div>
          ) : results.length > 0 ? (
            <div className="p-4">
              <div className="text-sm text-muted-foreground mb-3">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </div>
              
              <div className="space-y-2">
                {results.map((resource, index) => (
                  <div
                    key={`${resource.subjectId}-${resource.resourceType}-${resource.id}-${index}`}
                    onClick={() => handleResourceClick(resource)}
                    className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer transition-all hover-lift"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-primary mt-1">
                        {getResourceIcon(resource.resourceType)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium truncate">{resource.title}</h3>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                            {getResourceTypeLabel(resource.resourceType)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {resource.subjectName}
                        </p>
                        
                        {resource.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {resource.description}
                          </p>
                        )}
                      </div>
                      
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : query.trim() && !isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No resources found for "{query}"</p>
              <p className="text-sm mt-2">Try different keywords or browse subjects directly.</p>
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start typing to search resources...</p>
              <p className="text-sm mt-2">Search across all subjects and resource types.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Use keywords like "physics", "chemistry", "math"</span>
            <Link
              to="/admin"
              onClick={onClose}
              className="text-primary hover:underline"
            >
              Manage Resources →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;