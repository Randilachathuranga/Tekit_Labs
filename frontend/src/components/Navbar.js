import React from 'react';
import './Navbar.css';
import logo from '../assets/logo.png'; 

function Navbar() {
  return (
    <nav className="navbar">
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