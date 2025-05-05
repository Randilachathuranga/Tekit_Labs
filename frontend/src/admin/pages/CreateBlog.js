import React, { useState } from 'react';
import './CreateBlog.css';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePublish = () => {
    console.log('Publishing blog:', { title, content });
  };

  return (
    <div className="create-blog-container">
      <h2>CREATE BLOG</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label>Editor:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea-field"
        ></textarea>
      </div>
      <button className="publish-button" onClick={handlePublish}>
        Publish
      </button>
    </div>
  );
};

export default CreateBlog;
