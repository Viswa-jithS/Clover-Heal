import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

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

    // Send email using EmailJS
    emailjs.send(
      'service_ysghy17', // replace with your EmailJS service ID
      'template_aq3pcfl', // replace with your EmailJS template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        time: new Date().toLocaleString(),
      },
      '5nk6VN_Y6N05PToI3' // replace with your EmailJS public key
    ).then(() => {
      alert('✅ Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }).catch((error) => {
      console.error('Email sending failed:', error);
      alert('❌ Failed to send message. Please try again later.');
    });
  };

  return (
    <section className="contact section-padding" id="contact">
      <div className="container">
        <div className="text-center mb-8">
          <h2>Get In Touch</h2>
          <p>Have questions about your assessment or need immediate assistance? We're here to help.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Visit Us</h3>
              <p>123 Healthcare Avenue<br />Medical District, MD 12345</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Call Us</h3>
              <p>(555) 123-4567<br />Emergency: (555) 911-HELP</p>
            </div>

            <div className="info-card">
              <div className="info-icon">⏰</div>
              <h3>Hours</h3>
              <p className="text-3xl font-bold">24/7</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};
