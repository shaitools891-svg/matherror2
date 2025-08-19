import React from 'react';
import { MessageSquare, Mail, Phone, MapPin, Users, ExternalLink, Clock, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const whatsappGroupUrl = 'https://chat.whatsapp.com/IzZiXBiXaEz8nVG4UQjCel';
  
  const contactInfo = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'WhatsApp Group',
      description: 'Join our active community for instant help',
      value: 'HSC Study Group',
      action: 'Join Now',
      link: whatsappGroupUrl,
      color: 'text-green-500'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Support',
      description: 'Send us your queries and suggestions',
      value: 'shshakib891@gmail.com',
      action: 'Send Email',
      link: 'mailto:shshakib891@gmail.com',
      color: 'text-blue-500'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone Support',
      description: 'Personal Phone Number',
      value: '+8801712-399364',
      action: 'Call Us',
      link: 'tel:+8801712399364',
      color: 'text-purple-500'
    }
  ];

  const features = [
    {
      icon: <Clock className="h-5 w-5" />,
      text: '24/7 Resource Access'
    },
    {
      icon: <Users className="h-5 w-5" />,
      text: 'Active Community Support'
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      text: 'Verified Study Materials'
    },
    {
      icon: <ExternalLink className="h-5 w-5" />,
      text: 'Easy Download Links'
    }
  ];

  const faqs = [
    {
      question: 'How can I access the study materials?',
      answer: 'All study materials are available for free. Just browse the subjects and click on the resources you need. PDFs and videos will open in new tabs.'
    },
    {
      question: 'Can I request specific materials?',
      answer: 'Yes! Join our WhatsApp group and request any specific materials you need. Our community members and admins will help you find them.'
    },
    {
      question: 'Are the materials updated regularly?',
      answer: 'We regularly update our resources with the latest question papers and study materials. Follow our WhatsApp group for update notifications.'
    },
    {
      question: 'How can I contribute materials?',
      answer: 'If you have valuable study materials to share, contact us through WhatsApp or email. We appreciate community contributions!'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Need help with your HSC preparation? We're here to support you on your academic journey.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((contact, index) => (
            <div
              key={index}
              className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all hover-lift animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={`${contact.color} mb-4`}>
                {contact.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{contact.title}</h3>
              <p className="text-muted-foreground mb-4">{contact.description}</p>
              
              <div className="mb-4">
                <p className="font-medium">{contact.value}</p>
              </div>
              
              <a
                href={contact.link}
                target={contact.link.startsWith('http') ? '_blank' : '_self'}
                rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <span>{contact.action}</span>
                {contact.link.startsWith('http') && <ExternalLink className="h-4 w-4" />}
              </a>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-8 mb-16 text-center animate-fade-in">
          <div className="text-6xl mb-4">📱</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Join Our WhatsApp Community
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect with thousands of HSC students, share resources, get instant help with your doubts, 
            and stay updated with the latest materials and exam tips.
          </p>
          
          <a
            href={whatsappGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors hover-lift"
          >
            <MessageSquare className="h-6 w-6" />
            <span>Join WhatsApp Group</span>
            <ExternalLink className="h-5 w-5" />
          </a>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className="text-green-500">{feature.icon}</div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-lg animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Info */}
        <div className="bg-muted/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is always ready to assist you with any questions about using Math ERROR 
            or accessing study materials.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Quick WhatsApp Support
            </a>
            
            <a
              href="mailto:support@matherror.com"
              className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Send Detailed Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
