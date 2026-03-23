import React from 'react';
import './Hero.css';

export const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Your Health, Our Priority</h1>
            <p>
              Experience compassionate healthcare with CloverHeal. Our dedicated team of 
              medical professionals is committed to providing you with the highest quality 
              care in a comfortable and welcoming environment.
            </p>
            <div className="hero-actions">
              <a href="#symptoms" className="btn-primary">Enter Symptoms</a>
              <a href="#services" className="btn-secondary">Our Services</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card">
              <div className="card-icon">🏥</div>
              <h3>24/7 Emergency Care</h3>
              <p>Round-the-clock medical assistance when you need it most</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
