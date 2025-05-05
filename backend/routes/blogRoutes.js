const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/create", blogController.createBlog); //http://localhost:5000/blogs/create
router.get("/getall", blogController.getAllBlogs); //http://localhost:5000/blogs/getall
router.get("/getbyid/:id", blogController.getBlogById); //http://localhost:5000/blogs/getbyid/:id
router.put("/update/:id", blogController.updateBlog); //http://localhost:5000/blogs/update/:id
router.put("/softdelete/:id", blogController.softDeleteBlog); //http://localhost:5000/blogs/softdelete/:id
router.delete("/permanent-delete/:id", blogController.permanentDeleteBlog); //http://localhost:5000/blogs/permanent-delete/:id

module.exports = router;
