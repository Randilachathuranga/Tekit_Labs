import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateBlog.css';

const BlogEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const quillRef = useRef(null);

  // Categories for dropdown
  const categories = ['Technology', 'Business', 'Health', 'Science', 'Arts', 'Personal'];

  // Custom image handler for Quill
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (!input.files?.length) return;
      
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        // Replace with your actual image upload endpoint
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const imageUrl = response.data.imageUrl;
        
        // Insert image into editor
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', imageUrl);
      } catch (err) {
        setError('Failed to upload image. Please try again.');
        console.error('Image upload error:', err);
      }
    };
  };

  // Quill modules config
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image'],
        [{ 'align': [] }],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  };

  // Handle cover image upload
  const handleCoverImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle tag input
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Submit the blog post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // First upload cover image if exists
      let coverImageUrl = '';
      if (coverImage) {
        const formData = new FormData();
        formData.append('image', coverImage);
        
        const imageResponse = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        coverImageUrl = imageResponse.data.imageUrl;
      }

      // Submit blog post
      const blogData = {
        title,
        content,
        category,
        tags,
        coverImage: coverImageUrl
      };

      const response = await axios.post('/api/blogs', blogData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Redirect to the new blog post
      navigate(`/blogs/${response.data.blog._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog post');
      setIsSubmitting(false);
      console.error('Blog submission error:', err);
    }
  };

  return (
    <div className="blog-editor-container">
      <h1 className="editor-title">Create New Blog Post</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        {/* Cover Image Upload */}
        <div className="cover-image-container">
          {coverImagePreview ? (
            <div className="cover-preview">
              <img src={coverImagePreview} alt="Cover preview" />
              <button 
                type="button" 
                className="remove-cover" 
                onClick={() => {
                  setCoverImage(null);
                  setCoverImagePreview('');
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="cover-upload">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleCoverImageChange} 
                hidden 
              />
              <div className="upload-placeholder">
                <i className="fa fa-image"></i>
                <span>Add a cover image</span>
              </div>
            </label>
          )}
        </div>
        
        {/* Title Input - Medium-style expanding input */}
        <div className="title-container">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="title-input"
            required
          />
        </div>
        
        {/* Rich Text Editor */}
        <div className="editor-container">
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Tell your story..."
            theme="snow"
          />
        </div>
        
        {/* Category Selection */}
        <div className="category-container">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        {/* Tags Input */}
        <div className="tags-container">
          <label htmlFor="tags">Tags:</label>
          <div className="tags-input-container">
            {tags.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
                <span className="tag-remove" onClick={() => removeTag(tag)}>×</span>
              </div>
            ))}
            <input
              type="text"
              id="tags"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Add tags and press Enter"
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="button-container">
          <button 
            type="submit" 
            className="publish-button"
            disabled={isSubmitting || !title || !content || !category}
          >
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;