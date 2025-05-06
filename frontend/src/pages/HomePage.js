import React from 'react';
import './HomePage.css';
import rightArrow from '../assets/right_btn.svg'; 


function HomePage() {
    return (
          <div className="hero-section">
            <p className="hero-headline main-white">Innovating <span className='main-green'>Businesses</span> with Tailored <span className='main-green'>Digital Solutions</span></p>
            <div className="hero-description">
              <p className="description-text">
                From Concept To Completion, We Build Digital Experiences That
                Drive Success
              </p>
              <div className="cta-container">
                <div className="cta-secondary">
                  <div className="cta-secondary-text">Explore Our Services</div>
                </div>
                <div className="cta-primary">
                  <div className="cta-primary-text">Book A Meeting</div>
                  <div className="cta-icon-container">
                    <img
                      className="cta-icon"
                      src={rightArrow}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="service-tags">
              <div className="service-tag">
                <div className="service-tag-text">Web development services</div>
              </div>
              <div className="service-tag">
                <div className="service-tag-text">Software development</div>
              </div>
              <div className="service-tag">
                <div className="service-tag-text">UI/UX design</div>
              </div>
              <div className="service-tag">
                <div className="service-tag-text">Digital marketing assets</div>
              </div>
              <div className="service-tag">
                <div className="service-tag-text">
                  Consultation &amp; Support
                </div>
              </div>
            </div>
            <div className="scroll-indicator-container">
              <div className="scroll-indicator">SCROLL DOWN</div>
              <div className="scroll-icon">
                <div className="scroll-arrow"></div>
                <div className="scroll-arrow"></div>
                <div className="scroll-arrow"></div>
              </div>
            </div>
          </div>
    );
}

export default HomePage;