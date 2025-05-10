import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { HiUser, HiMail, HiLockClosed } from "react-icons/hi"; 
function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:2002/user/signup",
        {
          username,
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
      toast.success(data.message || "User registered successfully");
      localStorage.setItem("jwt", data.token);
      navigateTo("/login");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors || "User registration failed");
    }
  };

  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transition duration-500 animate-fade-in-up"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Signup
        </h2>
        <form onSubmit={handleRegister}>
  
          {/* Username */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Username
            </label>
            <div className="flex items-center bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2">
              <HiUser className="text-gray-500 dark:text-gray-300 mr-2" />
              <input
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Type Username"
              />
            </div>
          </div>
  
          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="flex items-center bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2">
              <HiMail className="text-gray-500 dark:text-gray-300 mr-2" />
              <input
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type Email"
              />
            </div>
          </div>
  
          {/* Password */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="flex items-center bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2">
              <HiLockClosed className="text-gray-500 dark:text-gray-300 mr-2" />
              <input
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type Password"
              />
            </div>
          </div>
  
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300"
          >
            Signup
          </button>
  
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
  
}

export default Signup;