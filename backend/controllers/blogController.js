const Blog = require('../models/Blog');
const path = require('path');

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    // TEMP fallback for testing: ensure req.user._id is available
    const authorId = req.user?._id || "681a26304a735220c5ee86ab"; 

    console.log("Blog creation input:", { title, content, category, tags, authorId });

    // Prepare image data from the uploaded files
    const images = req.files.map(file => ({
      type: 'image',
      data: `/uploads/${file.filename}` // assuming you're saving files in the "uploads" folder
    }));

    // Add the content, which can have both text and image data
    const blogContent = [
      { type: 'text', data: content },
      ...images // Add images as part of the content array
    ];

    const blog = new Blog({
      title,
      content: blogContent, // Use the blogContent with text and images
      category,
      tags,
      author: authorId,
      status: 1 // force status for visibility
    });

    await blog.save();
    console.log("Blog saved:", blog);

    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all blogs (optional: only active ones)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 1 }).populate('author', 'name email');
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog || blog.status === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Soft delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { status: 0 },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog soft deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update blog (admin only)
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, category, tags },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog updated successfully', updatedBlog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
