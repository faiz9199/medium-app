import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Modal from "./Modal";
import axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/blogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      setPosts(data.userPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePost = async ({ title, content }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/blog",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        const newPost = response.data.newPost
        setPosts([newPost, ...posts]);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Create a Todo Now</h1>
        <div className="flex items-center space-x-4 mb-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setIsModalOpen(true)}
          >
            Create Post
          </button>
        </div>
        <div className="border border-gray-300 rounded-lg p-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="mb-4 p-4 border border-gray-200 rounded-lg"
              >
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No posts found.</div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </>
  );
};

export default Post;
