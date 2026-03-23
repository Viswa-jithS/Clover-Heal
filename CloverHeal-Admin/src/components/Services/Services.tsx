import React from 'react';
import './Services.css';

export const Services = () => {
  const services = [
    {
      icon: '🩺',
      title: 'Primary Care',
      description: 'Comprehensive primary care services for all your health needs'
    },
    {
      icon: '❤️',
      title: 'Expert Opinion',
      description: 'Expert health care and health monitoring'
    },
    {
      icon: '🧠',
      title: 'Machine Learning Integration',
      description: 'Specialized machine learning model for all sorts of medical conditions and disorders'
    },

  ];

  return (
    <section className="services section-padding" id="services">
      <div className="container">
        <div className="text-center mb-8">
          <h2>Our Medical Services</h2>
          <p>Comprehensive healthcare solutions tailored to your needs</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
