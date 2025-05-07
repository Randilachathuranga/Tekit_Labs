import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png'; 

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState(false);

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

  // Scroll to section when clicked and set as selected
  const handleClick = (e) => {
    const selectedItem = e.target.innerText || e.target.dataset.redirect;
    // Set the selected item
    setSelected(selectedItem);
    
    // Get the corresponding section ID
    const sectionId = selectedItem.toLowerCase();
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Smooth scroll to the section
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="logo" onClick={handleClick}><img src={logo} alt="Tekit Labs Logo" data-redirect='hero'/></div>
      <ul className="nav-links">
        <li 
          className={selected === 'Services' ? 'selected' : ''} 
          onClick={handleClick}
        >Services</li>
        <li 
          className={selected === 'About' ? 'selected' : ''} 
          onClick={handleClick}
        >About</li>
        <li 
          className={selected === 'Contact' ? 'selected' : ''} 
          onClick={handleClick}
        >Contact</li>
        <li 
          className={selected === 'Blog' ? 'selected' : ''} 
          onClick={handleClick}
        >Blog</li>
      </ul>
      <div className="book-btn">
        <div className="book-text">Book A Meeting</div>
      </div>
    </nav>
  );
}

export default Navbar;