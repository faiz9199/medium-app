const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createPost = async (req, res) => {
  const { title, content, published } = req.body;
  const authorId = req.user.id;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId,
      },
    });
    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id, title, content, published } = req.body;
  try {
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: title || existingPost.title,
        content: content || existingPost.content,
        published: published !== undefined ? published : existingPost.published,
      },
    });
    res.status(200).json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getPosts = async (req, res) => {
  const authorId = req.user.id;
  try {
    const userPosts = await prisma.post.findMany({
      where: { authorId: authorId },
    });
    res
      .status(200)
      .json({ message: "Posts retrieved successfully", userPosts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createPost,
  updatePost,
  getPosts,
};
