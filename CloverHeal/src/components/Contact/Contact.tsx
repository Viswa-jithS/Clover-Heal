import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send(
      'service_ysghy17', 
      'template_aq3pcfl', 
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        time: new Date().toLocaleString(),
      },
      '5nk6VN_Y6N05PToI3' 
    ).then(() => {
      alert('✅ Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }).catch((error) => {
      console.error('Email sending failed:', error);
      alert('❌ Failed to send message. Please try again later.');
    });
  };

  const inputClasses = "w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-slate-50 hover:bg-white shadow-sm";

  return (
    <section className="py-24 bg-white relative" id="contact">
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Get In <span className="text-blue-600">Touch</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Have questions about your assessment or need immediate assistance? We're here to help.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="flex-1 space-y-8 animate-in slide-in-from-left duration-700 delay-200">
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-start space-x-6 group hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                📍
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Visit Us</h3>
                <p className="text-slate-600 leading-relaxed">123 Healthcare Avenue<br />Medical District, MD 12345</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-start space-x-6 group hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                📞
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Call Us</h3>
                <p className="text-slate-600 leading-relaxed">Main: <a href="tel:5551234567" className="text-blue-600 font-medium hover:underline">(555) 123-4567</a><br />Emergency: <span className="text-rose-600 font-bold">(555) 911-HELP</span></p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-start space-x-6 group hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                ⏰
              </div>
              <div className="flex-1 flex flex-row items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Hours</h3>
                  <p className="text-slate-600">Available all hours</p>
                </div>
                <p className="text-4xl font-black text-blue-600">24/7</p>
              </div>
            </div>
          </div>

          <div className="flex-[1.2] relative animate-in slide-in-from-right duration-700 delay-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-400/10 blur-2xl rounded-[3rem] -z-10 transform translate-x-4 translate-y-4"></div>
            <form className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100/50 space-y-6 relative" onSubmit={handleSubmit}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] border-b border-l border-blue-100/50 -z-10"></div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                Send a Message <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex justify-center items-center text-sm">✉️</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className={inputClasses} />
                </div>
                <div>
                  <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className={inputClasses} />
                </div>
              </div>

              <div>
                <input type="tel" name="phone" placeholder="Your Phone (Optional)" value={formData.phone} onChange={handleChange} className={inputClasses} />
              </div>

              <div>
                <textarea name="message" placeholder="How can we help you?" rows={5} value={formData.message} onChange={handleChange} required className={`${inputClasses} resize-none`}></textarea>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'linear-gradient(to right, #2563eb, #14b8a6)',
                  color: '#ffffff',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(to right, #1d4ed8, #0d9488)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(to right, #2563eb, #14b8a6)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                Send Message <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
