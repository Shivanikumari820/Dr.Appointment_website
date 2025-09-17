const Blog = require("../models/blogModels"); // Create Blog model in models/blogModel.js

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};
