import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './BlogViewer.css';

const BlogViewer = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBlog(response.data.blog);
        setLoading(false);
      } catch (err) {
        setError('Failed to load blog post');
        setLoading(false);
        console.error('Blog fetch error:', err);
      }
    };

    fetchBlog();
  }, [id]);

  // Function to render content based on type
  const renderContent = (contentItem, index) => {
    switch (contentItem.type) {
      case 'text':
        return (
          <div 
            key={index} 
            className="blog-text-content"
            dangerouslySetInnerHTML={{ __html: contentItem.data }}
          />
        );
      case 'image':
        return (
          <div key={index} className="blog-image-container">
            <img 
              src={contentItem.data} 
              alt={`Blog content ${index}`}
              className="blog-content-image"
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  if (!blog) {
    return <div className="not-found-container">Blog post not found</div>;
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="blog-viewer-container">
      <div className="blog-header">
        <h1 className="blog-title">{blog.title}</h1>
        
        <div className="blog-meta">
          <div className="blog-author">
            {blog.author.name || 'Admin'}
          </div>
          <div className="blog-date">
            {formatDate(blog.created_Date)}
          </div>
        </div>
        
        <div className="blog-category">
          <span className="category-label">Category:</span> {blog.category}
        </div>
        
        {blog.tags && blog.tags.length > 0 && (
          <div className="blog-tags">
            {blog.tags.map((tag, index) => (
              <span key={index} className="blog-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="blog-content">
        {blog.content.map((contentItem, index) => 
          renderContent(contentItem, index)
        )}
      </div>
      
      <div className="blog-footer">
        <Link to="/blogs" className="back-button">
          Back to all blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogViewer;