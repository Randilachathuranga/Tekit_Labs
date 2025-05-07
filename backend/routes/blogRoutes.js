const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { protect: verifyToken } = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin'); 
const upload = require('../middlewares/upload');

router.post('/', verifyToken, isAdmin, upload.array('images'), blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id', verifyToken, isAdmin, blogController.updateBlog);
router.delete('/:id', verifyToken, isAdmin, blogController.deleteBlog);

module.exports = router;
