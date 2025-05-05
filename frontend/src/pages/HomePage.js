import React from 'react';
import './HomePage.css';


function HomePage() {
    return(
        <div className="home-page">
        <section className="hero">
            <div className="hero-content">
            <h1>Welcome to Tekit Labs</h1>
            <p>Innovative solutions for your technological needs</p>
            <button className="cta-button">Learn More</button>
            </div>
        </section>

        <section className="services">
            <h2>Our Services</h2>
            <div className="services-grid">
            <div className="service-card">
                <h3>Web Development</h3>
                <p>Custom web solutions tailored to your business needs</p>
            </div>
            <div className="service-card">
                <h3>Mobile Development</h3>
                <p>Native and cross-platform mobile applications</p>
            </div>
            <div className="service-card">
                <h3>UI/UX Design</h3>
                <p>User-centered designs that enhance user experience</p>
            </div>
            </div>
        </section>

        <section className="about">
            <h2>About Us</h2>
            <p>Tekit Labs is a technology company specializing in innovative solutions for businesses of all sizes.</p>
        </section>
        </div>
    );
}

export default HomePage;