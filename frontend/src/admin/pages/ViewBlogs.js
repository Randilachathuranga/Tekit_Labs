import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewBlogs.css';

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs') 
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  // Extract image URL from content array, including base64 images inside text content
  const extractImageFromContent = (content) => {
    // Check for content items with type 'image'
    const imageItem = content.find(item => item.type === 'image');
    if (imageItem) return imageItem.data;

    // If no 'image' type, look for base64 images embedded in markdown inside text content
    for (const item of content) {
      if (item.type === 'text') {
        const regex = /!\[.*?\]\((data:image\/.*?base64,.*?)\)/;
        const match = item.data.match(regex);
        if (match && match[1]) {
          return match[1];
        }
      }
    }

    // Default placeholder if no image found
    return 'https://via.placeholder.com/300x200?text=No+Image';
  };

  return (
    <div className="view-blogs-container">
      <h2>VIEW BLOGS</h2>

      <div className="blogs-grid">
        {blogs.map((blog, index) => {
          const imageUrl = extractImageFromContent(blog.content);

          return (
            <div className="blog-card" key={index}>
              <img src={imageUrl} alt={blog.title} className="blog-image" />
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-date">{new Date(blog.created_Date).toLocaleDateString()}</p>
            </div>
          );
        })}
      </div>

      <div className="pagination-buttons">
        <button className="prev-btn">Previous</button>
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default ViewBlogs;
