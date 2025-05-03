const Blog = require("../models/Blog");

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const blog = new Blog({ title, content, category, tags });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blogs (Only Active Blogs)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 1 }); // Only return active blogs
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.status === 0)
      return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, category, tags },
      { new: true }
    );
    if (!blog || blog.status === 0)
      return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete a blog (Change status to 0)
exports.softDeleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { status: 0 },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog soft deleted successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//permanent delete a blog
exports.permanentDeleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog permanently deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific comment from a blog
// exports.deleteComment = async (req, res) => {
//   try {
//     const { blogId, commentId } = req.params;
//     const blog = await Blog.findById(blogId);

//     if (!blog || blog.status === 0)
//       return res.status(404).json({ message: "Blog not found" });

//     // Filter out the comment with the given commentId
//     blog.comments = blog.comments.filter(
//       (comment) => comment._id.toString() !== commentId
//     );

//     await blog.save();
//     res.json({ message: "Comment deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// create comments
// exports.createComment = async (req, res) => {
//   try {
//     const { comment } = req.body;
//     const blogId = req.params.blogId;

//     const blog = await Blog.findById(blogId);
//     if (!blog) return res.status(404).json({ message: "Blog not found" });

//     // Add comment
//     const newComment = { comment };
//     blog.comments.push(newComment);

//     await blog.save();
//     res.status(201).json({ message: "Comment added successfully", blog });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
