import React from 'react';
import './ServiceSection.css';
import rightArrow from '../assets/right_btn.svg'; 

function ServiceSection() {
    return (
      <div className="service-container" style={{ color: `white` }}>
        <div className='service-header-text'>Explore Our <span className='main-green'>Solutions</span></div>
        <div className='service-header-description'>At TekIT labs, we offer a comprehensive suite of services designed to meet the unique needs of our clients. Our team leverages cutting-edge technology and innovative solutions to drive your business forward.</div>
        <div className='service-details-container'>
          <div className='our-services-text'>Our Services</div>
          {/* details */}
          <div className='service-details'>
            <div className='service-detail-group'>
              <div className="service-type">Personal<br />websites</div>
              <p className="service-description">
                Transform Your Vision Into Reality With Custom Software Development. Our Expert Team Crafts Scalable, Secure,
                And User-friendly Applications That Optimize Your Processes, Enhance Customer Experiences And Drive Business
                Growth. From Web And Mobile Apps To Enterprise-grade Solutions, We Tailor Each Project To Your Unique Needs,
                Ensuring Seamless Integration With Your Existing Systems. Let Us Build The Software That Fuels Your Success.
              </p>
            </div>

            <div className='service-detail-group'>
              <div className="service-type">Business web<br /> solutions</div>
              <p className="service-description">
                Transform Your Vision Into Reality With Custom Software Development. Our Expert Team Crafts Scalable, Secure,
                And User-friendly Applications That Optimize Your Processes, Enhance Customer Experiences And Drive Business
                Growth.
              </p>
            </div>

            <div className='service-detail-group'>
              <div className="service-type">E-commerce<br />solutions</div>
              <p className="service-description">
                Transform Your Vision Into Reality With Custom Software Development. Our Expert Team Crafts Scalable, Secure,
                And User-friendly Applications That Optimize Your Processes, Enhance Customer Experiences And Drive Business
                Growth.
              </p>
            </div>
          </div>
        </div>
      </div>

    );
}

export default ServiceSection;