import React from 'react';
import './ViewBlogs.css'; 

const ViewBlogs = () => {
  return (
    <div className="view-blogs-container">
      <h2>VIEW BLOGS</h2>

      <div className="blogs-grid">
        {/* Simulated blog cards */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="blog-card" key={index}></div>
        ))}
      </div>

      <div className="pagination-buttons">
        <button className="prev-btn">Previous</button>
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default ViewBlogs;
