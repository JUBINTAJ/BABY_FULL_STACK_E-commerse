import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios/intersptr";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const role = import.meta.env.VITE_roleProtectKey;

  const mutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosInstance.post("user/login", userData);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("_id", data.user.id);
      localStorage.setItem("username", data.user.username);
      toast.success("Login successful!");
      setTimeout(() => {
        if (data.user.role === "admin") {
          localStorage.setItem("role", role);
          navigate("/Adminhome");
        } else {
          localStorage.setItem("role", data.user.role);
          navigate("/");
        }
      }, 1500);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Please enter email and password.");
      return;
    }
    mutation.mutate({ email, password });
  };

  return (
    <div
  className="flex items-center justify-center min-h-screen bg-cover bg-center"
  style={{
    backgroundImage: "url('/2f9efc161943193.63cde7cc0e28c.png')",
  }}
>
  <div className="bg-gradient-to-br from-pink-50 to-pink-100 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-md w-full border-2 border-green-950">
    <div className="flex flex-col items-center mb-6">
      <span className="text-5xl">🍼</span>
      <h2 className="text-center text-4xl font-bold text-green-800 mt-4">Welcome to BabyShop</h2>
      <p className="text-center text-gray-600 mt-2">Log in to shop sweet things for your little one!</p>
    </div>

    <form onSubmit={handleLogin} className="flex flex-col gap-5">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-4 py-3 rounded-xl bg-white border focus:outline-none focus:ring-2 focus:ring-pink-300"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="w-full px-4 py-3 rounded-xl bg-white border focus:outline-none focus:ring-2 focus:ring-pink-300"
        required
      />

      <button
        type="submit"
        disabled={mutation.isLoading}
        className="bg-green-800 hover:bg-green-950 transition-colors text-white font-semibold py-3 rounded-xl"
      >
        {mutation.isLoading ? "Logging in..." : "Login"}
      </button>

      <div className="text-center text-gray-700">
        <p>Don’t have an account?</p>
        <Link
          to="/Registration"
          className="text-green-950 underline hover:text-green-950"
        >
          Register Here
        </Link>
      </div>
    </form>
  </div>
  <ToastContainer position="top-right" autoClose={3000} />
</div>

  );
};

export default Login;
