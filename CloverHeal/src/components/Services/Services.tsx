import React from 'react';

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
    <section className="py-24 bg-white relative overflow-hidden" id="services">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Our <span className="text-blue-600">Medical Services</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Comprehensive healthcare solutions tailored to your needs, powered by advanced technology and human expertise.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} 
                 className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-100 transition-all duration-300 group animate-in zoom-in fade-in fill-mode-both"
                 style={{ animationDelay: `${index * 150}ms` }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-teal-50 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
