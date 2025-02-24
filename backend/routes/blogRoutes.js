const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/create", blogController.createBlog); //http://localhost:5000/api/blogs/create
router.get("/getall", blogController.getAllBlogs); //http://localhost:5000/api/blogs/getall
router.get("/getbyid/:id", blogController.getBlogById); //http://localhost:5000/api/blogs/getbyid/${id}
router.put("/update/:id", blogController.updateBlog); //http://localhost:5000/api/blogs/update/${id}
router.put("/softdelete/:id", blogController.softDeleteBlog); //http://localhost:5000/api/blogs/softdelete/${id}
router.delete("/permanent-delete/:id", blogController.permanentDeleteBlog); //http://localhost:5000/api/blogs/permanent-delete/${id}
router.post("/:blogId/comments", blogController.createComment); //http://localhost:5000/api/blogs/${blogId}/comments
router.delete("/:blogId/comments/:commentId", blogController.deleteComment); //http://localhost:5000/api/blogs/${blogId}/comments/${commentId}

module.exports = router;
