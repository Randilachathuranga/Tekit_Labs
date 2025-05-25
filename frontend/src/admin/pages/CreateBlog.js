import React, { useState, useRef } from 'react';
import { Upload, Image, Bold, Italic, List, AlignLeft, Save, Eye, X, Plus, Tag } from 'lucide-react';
import axios from 'axios';

const BlogEditor = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: []
  });
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [preview, setPreview] = useState(false);
  const fileInputRef = useRef(null);
  const contentRef = useRef(null);

  const categories = [
    'Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 
    'Business', 'Education', 'Entertainment', 'Sports', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 // 5MB limit
    );

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          file,
          preview: e.target.result,
          id: Date.now() + Math.random()
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const insertImageToContent = (imageUrl) => {
    const content = contentRef.current;
    const cursorPos = content.selectionStart;
    const textBefore = formData.content.substring(0, cursorPos);
    const textAfter = formData.content.substring(cursorPos);
    const imageMarkdown = `\n![Image](${imageUrl})\n`;
    
    setFormData(prev => ({
      ...prev,
      content: textBefore + imageMarkdown + textAfter
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async () => {
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    setIsLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      submitData.append('category', formData.category);
      submitData.append('tags', JSON.stringify(formData.tags));

      // Append images
      images.forEach(img => {
        submitData.append('images', img.file);
      });
      const token = localStorage.getItem('adminToken');

      const response = await axios.post('http://localhost:5000/api/blogs', submitData, {
        headers: {
          
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 second timeout for large file uploads
      });

      if (response.status === 201) {
        alert('Blog created successfully!');
        // Reset form
        setFormData({ title: '', content: '', category: '', tags: [] });
        setImages([]);
        setTagInput('');
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
      
      if (error.response) {
        // Server responded with error status
        alert(`Error: ${error.response.data.error || 'Failed to create blog'}`);
      } else if (error.request) {
        // Request made but no response received
        alert('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        alert('Failed to submit blog. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatText = (format) => {
    const content = contentRef.current;
    const start = content.selectionStart;
    const end = content.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'list':
        formattedText = `\n- ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = formData.content.substring(0, start) + formattedText + formData.content.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const renderPreview = () => {
    return (
      <div style={styles.preview}>
        <h1 style={styles.previewTitle}>{formData.title || 'Untitled'}</h1>
        <div style={styles.previewMeta}>
          <span style={styles.categoryBadge}>
            {formData.category || 'No category'}
          </span>
        </div>
        {formData.tags.length > 0 && (
          <div style={styles.previewTags}>
            {formData.tags.map(tag => (
              <span key={tag} style={styles.tagBadge}>
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div style={styles.previewContent}>{formData.content}</div>
        {images.length > 0 && (
          <div style={styles.previewImages}>
            {images.map(img => (
              <Image key={img.id} src={img.preview} alt="Blog image" style={styles.previewImage} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.editor}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Create New Blog Post</h1>
        </div>

        {/* Toggle Preview */}
        <div style={styles.toolbar}>
          <button
            onClick={() => setPreview(!preview)}
            style={styles.previewButton}
          >
            <Eye size={18} />
            {preview ? 'Edit Mode' : 'Preview Mode'}
          </button>
        </div>

        {preview ? (
          <div style={styles.content}>
            {renderPreview()}
          </div>
        ) : (
          <div style={styles.content}>
            {/* Title */}
            <div style={styles.field}>
              <label style={styles.label}>
                Blog Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter your blog title..."
                style={styles.titleInput}
                required
              />
            </div>

            {/* Category */}
            <div style={styles.field}>
              <label style={styles.label}>
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={styles.select}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div style={styles.field}>
              <label style={styles.label}>
                Tags
              </label>
              <div style={styles.tagInput}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag..."
                  style={styles.tagInputField}
                  onKeyPress={handleTagKeyPress}
                />
                <button
                  type="button"
                  onClick={addTag}
                  style={styles.addTagButton}
                >
                  <Plus size={18} />
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div style={styles.tagList}>
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      style={styles.tag}
                    >
                      <Tag size={14} />
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        style={styles.removeTagButton}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content Editor */}
            <div style={styles.field}>
              <label style={styles.label}>
                Content *
              </label>
              
              {/* Formatting Toolbar */}
              <div style={styles.formatToolbar}>
                <button
                  type="button"
                  onClick={() => formatText('bold')}
                  style={styles.formatButton}
                  title="Bold"
                >
                  <Bold size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => formatText('italic')}
                  style={styles.formatButton}
                  title="Italic"
                >
                  <Italic size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => formatText('list')}
                  style={styles.formatButton}
                  title="List"
                >
                  <List size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  style={styles.formatButton}
                  title="Upload Image"
                >
                  <Upload size={18} />
                </button>
              </div>

              <textarea
                ref={contentRef}
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your blog content here... You can use markdown formatting."
                style={styles.textarea}
                rows="15"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              
              {images.length > 0 && (
                <div style={styles.field}>
                  <label style={styles.label}>
                    Uploaded Images
                  </label>
                  <div style={styles.imageGrid}>
                    {images.map(img => (
                      <div key={img.id} style={styles.imageItem}>
                        <img
                          src={img.preview}
                          alt="Upload preview"
                          style={styles.imagePreview}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          style={styles.removeImageButton}
                        >
                          <X size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertImageToContent(img.preview)}
                          style={styles.insertImageButton}
                        >
                          Insert
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div style={styles.submitContainer}>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                  ...styles.submitButton,
                  ...(isLoading ? styles.submitButtonDisabled : {})
                }}
              >
                <Save size={18} />
                {isLoading ? 'Publishing...' : 'Publish Blog'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  editor: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px 24px',
    color: 'white'
  },
  headerTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold'
  },
  toolbar: {
    padding: '16px 24px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #e9ecef'
  },
  previewButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  },
  content: {
    padding: '24px'
  },
  field: {
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  },
  titleInput: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '18px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: 'white',
    boxSizing: 'border-box'
  },
  tagInput: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px'
  },
  tagInputField: {
    flex: 1,
    padding: '8px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  addTagButton: {
    padding: '8px 16px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px'
  },
  removeTagButton: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    padding: '2px',
    marginLeft: '4px',
    display: 'flex',
    alignItems: 'center'
  },
  formatToolbar: {
    display: 'flex',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #d1d5db',
    borderBottom: 'none',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px'
  },
  formatButton: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s'
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderTop: 'none',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    fontSize: '16px',
    lineHeight: '1.6',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '16px'
  },
  imageItem: {
    position: 'relative',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  imagePreview: {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    display: 'block'
  },
  removeImageButton: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    opacity: 0.8
  },
  insertImageButton: {
    position: 'absolute',
    bottom: '4px',
    left: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '12px',
    cursor: 'pointer',
    opacity: 0.9
  },
  submitContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  submitButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  preview: {
    maxWidth: 'none',
    lineHeight: '1.6'
  },
  previewTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#1f2937'
  },
  previewMeta: {
    marginBottom: '16px'
  },
  categoryBadge: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px'
  },
  previewTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px'
  },
  tagBadge: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '14px'
  },
  previewContent: {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.8',
    fontSize: '16px',
    color: '#374151'
  },
  previewImages: {
    marginTop: '24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  previewImage: {
    width: '100%',
    borderRadius: '8px',
    display: 'block'
  }
};

export default BlogEditor;