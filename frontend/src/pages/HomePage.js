import React from 'react';
import './HomePage.css';
import HeroSection from '../sections/HeroSection';
import ServiceSection from '../sections/ServiceSection';

function HomePage() {
    return (
        <div className="home-page">
          <div id='hero' className="hero-section-container">
            <HeroSection />
          </div>
          <div id="services" className="service-section-container">
            <ServiceSection />
          </div>
          <div id="about" className="about-section-container">
            {/* About section content will go here */}
          </div>
          <div id="contact" className="contact-section-container">
            {/* Contact section content will go here */}
          </div>
          <div id="blog" className="blog-section-container">
            {/* Blog section content will go here */}
          </div>
        </div>
    );
}

export default HomePage;