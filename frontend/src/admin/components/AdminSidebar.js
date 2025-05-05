import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <div className="menu-icon" onClick={toggleSidebar}>
        {isOpen ? <FiX /> : <FiMenu />}
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-symbol">TL</div>
          <div className="logo-text">Admin.A</div>
        </div>

        <nav className="sidebar-nav">
          <ul onClick={closeSidebar}>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/admin/">DASHBOARD</Link>
            </li>
            <li className={location.pathname === '/create-blog' ? 'active' : ''}>
              <Link to="/admin/create-blog">CREATE BLOG</Link>
            </li>
            <li className={location.pathname === '/view-blogs' ? 'active' : ''}>
              <Link to="/admin/view-blogs">VIEW BLOGS</Link>
            </li>
            <li className={location.pathname === '/site-settings' ? 'active' : ''}>
              <Link to="/admin/site-settings">SITE SETTINGS</Link>
            </li>
            <li className={location.pathname === '/seo-analytics' ? 'active' : ''}>
              <Link to="/admin/seo-analytics">SEO & ANALYTICS</Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-logout">
          <button onClick={closeSidebar}>LOGOUT</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
