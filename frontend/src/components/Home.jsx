import React, { useEffect, useState } from "react";
import axios from "axios";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:2002/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.todos);
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchtodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(
        "http://localhost:2002/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.newTodo);
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:2002/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.todo);
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("Failed to find todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2002/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to Delete Todo");
    }
  };

  const navigateTo = useNavigate();
  const logout = async () => {
    try {
      await axios.get("http://localhost:2002/user/logout", {
        withCredentials: true,
      });
      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4 font-[Poppins]">
      <div className="mx-auto max-w-2xl bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700 animate__animated animate__fadeIn">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-8">
          📝 Todo App
        </h1>

        {/* Input and Add Button */}
        <div className="flex mb-6 shadow-sm">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && todoCreate()}
            className="flex-grow p-3 border-t border-b border-l border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <button
            onClick={todoCreate}
            className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-all duration-300"
          >
            Add
          </button>
        </div>

        {/* Loading/Error State */}
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400 font-medium animate__animated animate__fadeIn animate__delay-1s">
            Loading...
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-400 font-semibold animate__animated animate__fadeIn animate__delay-1s">
            {error}
          </div>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo, index) => (
              <li
                key={todo._id || index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition duration-300 transform hover:scale-[1.02] animate__animated animate__fadeInUp"
              >
                <div className="flex items-center">
                  <button
                    onClick={() => todoStatus(todo._id)}
                    className="mr-3 text-blue-500 hover:text-blue-700 transition"
                  >
                    {todo.completed ? (
                      <FaCheckCircle className="w-5 h-5" />
                    ) : (
                      <FaRegCircle className="w-5 h-5" />
                    )}
                  </button>
                  <span
                    className={`text-lg font-medium ${
                      todo.completed
                        ? "line-through text-gray-400 dark:text-gray-500"
                        : "text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => todoDelete(todo._id)}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition duration-300"
                >
                  <FaTrashAlt size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Remaining Todos */}
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
          {remainingTodos} task{remainingTodos !== 1 && "s"} remaining
        </p>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-6 w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;