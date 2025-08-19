import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Download, Users, TrendingUp, ArrowRight, Star } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const HomePage = () => {
  const { subjects, stats } = useData();

  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Complete HSC Coverage',
      description: 'All subjects from Bangla to Higher Mathematics with comprehensive resources'
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: 'Easy Downloads',
      description: 'Direct access to PDFs, question papers, and study materials'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community Support',
      description: 'Join our WhatsApp group for discussions and doubt clearing'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Regular Updates',
      description: 'Latest question papers and updated study materials'
    }
  ];

  const whatsappGroupUrl = 'https://chat.whatsapp.com/IzZiXBiXaEz8nVG4UQjCel';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-pattern">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Math ERROR</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-muted-foreground">
              Your Ultimate HSC Study Companion
            </p>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Access comprehensive study materials, question papers, and video lectures for all HSC subjects. 
              Join thousands of students in their journey to success.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in mb-12">
            <Link
              to="#subjects"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover-lift transition-all duration-300 flex items-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Explore Subjects</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <a
              href={whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-muted transition-all duration-300 hover-lift flex items-center space-x-2"
            >
              <span>Join WhatsApp Group</span>
              <Users className="h-5 w-5" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.totalSubjects}</div>
              <div className="text-muted-foreground">Subjects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.totalResources}</div>
              <div className="text-muted-foreground">Resources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.totalDownloads}</div>
              <div className="text-muted-foreground">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Available</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-4xl animate-float opacity-20">📚</div>
        <div className="absolute top-32 right-16 text-3xl animate-float opacity-20" style={{animationDelay: '1s'}}>⚗️</div>
        <div className="absolute bottom-20 left-20 text-3xl animate-float opacity-20" style={{animationDelay: '2s'}}>📐</div>
        <div className="absolute bottom-32 right-10 text-4xl animate-float opacity-20" style={{animationDelay: '0.5s'}}>⚛️</div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose <span className="gradient-text">Math ERROR</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover-lift animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            HSC <span className="gradient-text">Subjects</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Link
                key={subject.id}
                to={`/subject/${subject.id}`}
                className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover-lift animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${subject.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {subject.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {subject.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{subject.code}</p>
                <p className="text-muted-foreground">{subject.description}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-xs text-muted-foreground">
                        {subject.resources.papers.length} Papers
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-secondary rounded-full"></span>
                      <span className="text-xs text-muted-foreground">
                        {subject.resources.pedia.length} Notes
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      <span className="text-xs text-muted-foreground">
                        {subject.resources.videos.length} Videos
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="gradient-text">Excel</span> in HSC?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our community of successful HSC students and get access to premium study materials.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover-lift transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Join WhatsApp Community</span>
            </a>
            
            <Link
              to="/contact"
              className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-muted transition-all duration-300 hover-lift"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;