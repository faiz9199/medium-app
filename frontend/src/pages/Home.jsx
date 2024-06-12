// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-4">
            The Best Todo Solution You Can Find On Internet
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            You can create, display, edit, delete, and search the todos and it's
            completely working as well.
          </p>
          <Link
            to="/blogs"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
