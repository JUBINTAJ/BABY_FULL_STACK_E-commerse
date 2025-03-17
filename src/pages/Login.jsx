import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios/intersptr";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const role=import.meta.env.VITE_roleProtectKey

  const mutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosInstance.post("user/login", userData);
      return res.data;
    },
    onSuccess: (data) => {
    console.log(data.user.role,'ikkoi')
      localStorage.setItem("_id", data.user.id);
      localStorage.setItem("username", data.user.username);
      
      toast.success("Login successful!");
      
      setTimeout(() => {
        if (data.user.role === "admin") {
          localStorage.setItem("role", role);
          setTimeout(() => {
            
            navigate('/Adminhome');
          }, 1000);
        } else {
          localStorage.setItem("role", data.user.role);
          navigate("/");
        }
      }, 2000);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto bg-white shadow-2xl rounded-lg p-6 lg:p-12">
        <form
          className="flex flex-col items-center border-gray-800 rounded-xl sm:max-w-96 m-auto mt-14 gap-4 text-gray-600"
          onSubmit={handleLogin}
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="text-4xl">Login</p>
          </div>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800 rounded-xl"
            placeholder="Enter your email"
            required
          />

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800 rounded-xl"
            placeholder="Enter your password"
            required
          />

          <p>Don't have an account?</p>
          <Link to={"/Registration"} className="text-blue-600 font-semibold">
            Register
          </Link>

          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-xl"
            type="submit"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Logging in..." : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
