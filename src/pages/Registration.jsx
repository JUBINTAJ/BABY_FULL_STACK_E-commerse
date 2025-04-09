import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios/intersptr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nav = useNavigate();

  const mutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosInstance.post("user/signup", userData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Registration Successful!");
      setTimeout(() => {
        nav("/Login");
      }, 2000);
    },
    onError: (error) => {
      const { message = "Registration failed. Please try again" } = error?.response?.data;
      toast.error(message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.warn("Please fill out all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    mutation.mutate({ username, email, password });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/1000_F_573586686_lvkwRqIMEXbjVUDNVqWgcivx3n4sqz3c.jpg')",
      }}
    >
      <div className="bg-transparent backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-md w-full border-2 border-green-800">
        <div className="flex flex-col items-center mb-6">
          <span className="text-5xl">🌱</span>
          <h2 className="text-center text-4xl font-bold text-green-800 mt-4">Create Your Account</h2>
          <p className="text-center text-gray-600 mt-2">Join BabyShop & start shopping today!</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-xl bg-green-50 border border-green-800 focus:outline-none focus:ring-2 focus:ring-green-700"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-xl bg-green-50 border border-green-800 focus:outline-none focus:ring-2 focus:ring-green-700"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-green-50 border border-green-800 focus:outline-none focus:ring-2 focus:ring-green-700"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-xl bg-green-50 border border-green-800 focus:outline-none focus:ring-2 focus:ring-green-700"
            required
          />
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="bg-green-800 hover:bg-green-900 transition-colors text-white font-semibold py-3 rounded-xl"
          >
            {mutation.isLoading ? "Registering..." : "Register"}
          </button>
          <button onClick={()=>nav('/Login')} className="text-white">Login</button>
          
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Registration;
