import React from 'react';
import './About.css';

export const About = () => {
  return (
    <section className="about section-padding" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About CloverHeal</h2>
            <p>
              At CloverHeal, we believe that quality healthcare should be accessible, 
              compassionate, and comprehensive. Our state-of-the-art facility combines 
              cutting-edge medical technology with a warm, patient-centered approach.
            </p>
            <p>
              We intend to reduce and simplify the entire diagnosis process to
              a more fast, simple and effective experience. 
            </p>
            
{/* 
<div className="stats">
  <div className="stat">
    <h3>10,000+</h3>
    <p>Patients Served</p>
  </div>
  <div className="stat">
    <h3>50+</h3>
    <p>Medical Experts</p>
  </div>
  <div className="stat">
    <h3>20+</h3>
    <p>Years Experience</p>
  </div>
</div>
*/}

          </div>
          
          <div className="about-image">
            <div className="image-placeholder">
              <div className="placeholder-content">
                <div className="medical-icon">🏥</div>
                <h3>Modern Healthcare Facility</h3>
                <p>Equipped with the latest medical technology</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
