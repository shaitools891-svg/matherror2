import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Play, FileText, BookOpen, Video, ExternalLink, Calendar, Eye, Search } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const SubjectPage = () => {
  const { subjectId } = useParams();
  const { getSubjectById, trackDownload } = useData();
  const [subject, setSubject] = useState(null);
  const [activeTab, setActiveTab] = useState('papers');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const foundSubject = getSubjectById(subjectId);
    setSubject(foundSubject);
  }, [subjectId, getSubjectById]);

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold mb-2">Subject Not Found</h2>
          <p className="text-muted-foreground mb-6">The subject you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'papers', label: 'Question Papers', icon: <FileText className="h-4 w-4" />, count: subject.resources.papers.length },
    { id: 'pedia', label: 'Study Notes', icon: <BookOpen className="h-4 w-4" />, count: subject.resources.pedia.length },
    { id: 'videos', label: 'Video Lectures', icon: <Video className="h-4 w-4" />, count: subject.resources.videos.length }
  ];

  const handleResourceClick = (resource, type) => {
    trackDownload(subject.id, type, resource.id, resource.title);
    window.open(resource.url, '_blank');
  };

  const filterResources = (resources) => {
    if (!searchQuery.trim()) return resources;
    
    return resources.filter(resource =>
      resource.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const ResourceCard = ({ resource, type }) => {
    const isVideo = type === 'videos';
    
    return (
      <div
        onClick={() => handleResourceClick(resource, type)}
        className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all cursor-pointer hover-lift group"
      >
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${isVideo ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
            {isVideo ? <Play className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                {resource.title}
              </h3>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            
            {resource.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {resource.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                {resource.dateAdded && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(resource.dateAdded).toLocaleDateString()}</span>
                  </div>
                )}
                {resource.size && (
                  <span>{resource.size}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {isVideo && (
                  <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs rounded">
                    Video
                  </span>
                )}
                {!isVideo && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    PDF
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EmptyState = ({ type }) => {
    const getEmptyMessage = () => {
      switch (type) {
        case 'papers':
          return {
            icon: '📄',
            title: 'No Question Papers Yet',
            description: 'Question papers will be added soon. Check back later or join our WhatsApp group for updates.'
          };
        case 'pedia':
          return {
            icon: '📚',
            title: 'No Study Notes Yet',
            description: 'Study notes and reference materials will be available soon. Join our community for the latest updates.'
          };
        case 'videos':
          return {
            icon: '🎥',
            title: 'No Video Lectures Yet',
            description: 'Video lectures are being prepared. Follow our WhatsApp group to get notified when they\'re available.'
          };
        default:
          return {
            icon: '📋',
            title: 'No Resources Available',
            description: 'Resources will be added soon.'
          };
      }
    };

    const emptyInfo = getEmptyMessage();

    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">{emptyInfo.icon}</div>
        <h3 className="text-xl font-semibold mb-2">{emptyInfo.title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">{emptyInfo.description}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://chat.whatsapp.com/IzZiXBiXaEz8nVG4UQjCel"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Join WhatsApp Group
          </a>
          
          <Link
            to="/admin"
            className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Add Resources
          </Link>
        </div>
      </div>
    );
  };

  const activeResources = filterResources(subject.resources[activeTab] || []);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Subjects</span>
          </Link>
          
          <div className="flex items-start space-x-4">
            <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-xl flex items-center justify-center text-white text-3xl`}>
              {subject.icon}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{subject.name}</h1>
              <p className="text-muted-foreground mb-4">{subject.description}</p>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4 text-primary" />
                  <span>{subject.resources.papers.length} Papers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4 text-secondary" />
                  <span>{subject.resources.pedia.length} Notes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Video className="h-4 w-4 text-accent" />
                  <span>{subject.resources.videos.length} Videos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 animate-fade-in">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 animate-fade-in">
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent hover:text-primary hover:border-primary/50'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeResources.length > 0 ? (
            <>
              {searchQuery && (
                <div className="mb-6 text-sm text-muted-foreground">
                  Showing {activeResources.length} result{activeResources.length !== 1 ? 's' : ''} for "{searchQuery}"
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    type={activeTab}
                  />
                ))}
              </div>
            </>
          ) : searchQuery ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
              <p className="text-muted-foreground mb-6">
                No resources found for "{searchQuery}" in {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <EmptyState type={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;