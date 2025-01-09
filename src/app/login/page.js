"use client"
import React, { useState } from "react";
import axios from "../../utils/axiosInstance"
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const res = await axios.post("/auth/login", { email, password });
      // Save token and role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
  
      // Redirect based on role
      if (res.data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto bg-gray-100">
      <div className="sm:w-2/4 relative max-sm:hidden">
        <img src="/login.svg" alt="Modern House" className="h-full w-full object-cover" />
      </div>

      <div className=" w-full sm:w-2/4 flex justify-center items-center bg-white">
        <div className="w-full m-10">
          <img src="/ipcalogo.png" alt="IPCA Logo" className="mb-6 mx-auto w-24" />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Welcome 👋</h1>
          <p className="text-gray-500 mb-6">Please login here</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="johnallen@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-red-400 text-white p-3 rounded-lg hover:bg-red-500 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
