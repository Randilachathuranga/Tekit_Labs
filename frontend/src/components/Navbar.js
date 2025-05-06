import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png'; 

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style after scrolling down 100px
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="logo"><img src={logo} alt="Tekit Labs Logo" /></div>
      <ul className="nav-links">
        <li className="selected">Services</li>
        <li>About</li>
        <li>Contact</li>
        <li>Blog</li>
      </ul>
      <div className="book-btn">
        <div className="book-text">Book A Meeting</div>
      </div>
    </nav>
  );
}

export default Navbar;