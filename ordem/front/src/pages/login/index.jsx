import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logar = async () => {
    if (!user || !password) {
      alert("Please fill in both fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: user,
        password: password,
      });
      console.log("TokenLogin: ", response.data.access);
      localStorage.setItem("token", response.data.access);
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Login failed, please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <FaUser className="text-4xl text-gray-600 mb-4" />

      <input
        className="w-64 p-2 mb-4 border rounded-lg shadow-sm bg-white bg-opacity-30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-black"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Username"
      />

      <input
        className="w-64 p-2 mb-4 border rounded-lg shadow-sm bg-white bg-opacity-30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />

      <button
        className={`w-64 p-2 ${loading ? "bg-gray-700" : "bg-black"} text-white rounded-lg hover:bg-gray-900 transition`}
        onClick={logar}
        disabled={loading}
      >
        {loading ? "Loading..." : "Enter"}
      </button>
    </div>
  );
}
