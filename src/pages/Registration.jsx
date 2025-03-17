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

  const nav=useNavigate()
  const mutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosInstance.post("user/signup", userData);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("User registered successfully:", data);
      toast.success(" Registration Successful!");
      setTimeout(() => {
        nav('/Login')
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
      toast.warn(" Please fill out all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error(" Passwords do not match.");
      return;
    }

    mutation.mutate({ username, email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto bg-white shadow-2xl rounded-lg p-6 lg:p-12">
        <form
          className="flex flex-col rounded-xl items-center sm:max-w-96 m-auto mt-14 gap-4 text-gray-600"
          onSubmit={handleSubmit}
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="text-3xl">REGISTER</p>
          </div>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800 rounded-xl"
            placeholder="Enter your name"
            required
          />
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
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800 rounded-xl"
            placeholder="Confirm password"
            required
          />
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-xl"
            type="submit"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Registration;
