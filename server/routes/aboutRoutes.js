const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");

// Get all blogs
router.get("/blogs", aboutController.getBlogs);

module.exports = router;
