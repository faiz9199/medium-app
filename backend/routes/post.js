const express = require("express");
const { createPost, updatePost, getPosts } = require("../controllers/post");
const { authMiddleware } = require("../middlewares/auth");
const router = express.Router();

router.post("/blog", authMiddleware, createPost);
router.put("/blog", updatePost);
router.get("/blogs",authMiddleware, getPosts);

module.exports = router;
