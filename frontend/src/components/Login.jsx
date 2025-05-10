import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:2002/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success(data.message || "User loggedin successfully");
      localStorage.setItem("jwt", data.token);
      navigateTo("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors || "User registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700 animate__animated animate__fadeIn">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600 dark:text-white">
          Login
        </h2>
        <form onSubmit={handleRegister}>
          {/* Email */}
          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your email"
            />
          </div>
  
          {/* Password */}
          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password"
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 rounded-xl font-semibold p-4"
          >
            Login
          </button>
  
          <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
            New user?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium dark:text-blue-400">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
  
}

export default Login;