import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, FileText, BookOpen, Video, BarChart3, Download, Users, TrendingUp } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const AdminPanel = () => {
  const { subjects, addResource, removeResource, downloads, stats } = useData();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('papers');
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [activeTab, setActiveTab] = useState('add');
  
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    url: '',
    size: ''
  });

  const resetForm = () => {
    setNewResource({
      title: '',
      description: '',
      url: '',
      size: ''
    });
    setIsAddingResource(false);
  };

  const handleAddResource = () => {
    if (!selectedSubject || !newResource.title || !newResource.url) {
      alert('Please fill in all required fields');
      return;
    }

    addResource(selectedSubject, selectedType, newResource);
    resetForm();
    alert('Resource added successfully!');
  };

  const handleDeleteResource = (subjectId, type, resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      removeResource(subjectId, type, resourceId);
    }
  };

  const getResourceTypeLabel = (type) => {
    switch (type) {
      case 'papers':
        return 'Question Papers';
      case 'pedia':
        return 'Study Notes';
      case 'videos':
        return 'Video Lectures';
      default:
        return 'Resources';
    }
  };

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

  const tabs = [
    { id: 'add', label: 'Add Resources', icon: <Plus className="h-4 w-4" /> },
    { id: 'manage', label: 'Manage Resources', icon: <Edit3 className="h-4 w-4" /> },
    { id: 'stats', label: 'Statistics', icon: <BarChart3 className="h-4 w-4" /> }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Admin <span className="gradient-text">Panel</span>
          </h1>
          <p className="text-muted-foreground">
            Manage subjects, resources, and track platform statistics.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.totalSubjects}</p>
                <p className="text-muted-foreground">Subjects</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.totalResources}</p>
                <p className="text-muted-foreground">Total Resources</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.totalDownloads}</p>
                <p className="text-muted-foreground">Total Downloads</p>
              </div>
              <Download className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">Active</p>
                <p className="text-muted-foreground">Status</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
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
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Add Resources Tab */}
        {activeTab === 'add' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Add New Resource</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>
                        {subject.icon} {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Resource Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="papers">📄 Question Papers</option>
                    <option value="pedia">📚 Study Notes</option>
                    <option value="videos">🎥 Video Lectures</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={newResource.title}
                    onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Physics Final Exam 2023"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={newResource.description}
                    onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the resource"
                    rows={3}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {selectedType === 'videos' ? 'YouTube URL *' : 'Google Drive/PDF URL *'}
                  </label>
                  <input
                    type="url"
                    value={newResource.url}
                    onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                    placeholder={selectedType === 'videos' 
                      ? "https://www.youtube.com/watch?v=..." 
                      : "https://drive.google.com/file/d/..."}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {selectedType !== 'videos' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">File Size (optional)</label>
                    <input
                      type="text"
                      value={newResource.size}
                      onChange={(e) => setNewResource(prev => ({ ...prev, size: e.target.value }))}
                      placeholder="e.g., 2.5 MB"
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddResource}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Add Resource</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Manage Resources Tab */}
        {activeTab === 'manage' && (
          <div className="animate-fade-in">
            {subjects.map(subject => (
              <div key={subject.id} className="mb-8 bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${subject.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                      {subject.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground">{subject.code}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {['papers', 'pedia', 'videos'].map(type => (
                    <div key={type} className="mb-6 last:mb-0">
                      <div className="flex items-center space-x-2 mb-3">
                        {getResourceIcon(type)}
                        <h4 className="font-medium">{getResourceTypeLabel(type)}</h4>
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                          {subject.resources[type].length}
                        </span>
                      </div>

                      {subject.resources[type].length > 0 ? (
                        <div className="space-y-2">
                          {subject.resources[type].map(resource => (
                            <div
                              key={resource.id}
                              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                            >
                              <div className="flex-1">
                                <p className="font-medium">{resource.title}</p>
                                {resource.description && (
                                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                                )}
                              </div>
                              
                              <button
                                onClick={() => handleDeleteResource(subject.id, type, resource.id)}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Delete resource"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No resources added yet</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-8 animate-fade-in">
            {/* Recent Downloads */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Downloads</h3>
              
              {downloads.length > 0 ? (
                <div className="space-y-3">
                  {downloads.slice(0, 10).map(download => (
                    <div
                      key={download.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{download.resourceName}</p>
                        <p className="text-sm text-muted-foreground">
                          {subjects.find(s => s.id === download.subjectId)?.name} - {getResourceTypeLabel(download.resourceType)}
                        </p>
                      </div>
                      
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{download.date}</p>
                        <p>{new Date(download.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No downloads recorded yet</p>
              )}
            </div>

            {/* Subject-wise Statistics */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Subject-wise Resource Count</h3>
              
              <div className="space-y-3">
                {subjects.map(subject => {
                  const totalResources = Object.values(subject.resources).flat().length;
                  return (
                    <div key={subject.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{subject.icon}</span>
                        <span className="font-medium">{subject.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <span>{subject.resources.papers.length} Papers</span>
                        <span>{subject.resources.pedia.length} Notes</span>
                        <span>{subject.resources.videos.length} Videos</span>
                        <span className="font-semibold">{totalResources} Total</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;