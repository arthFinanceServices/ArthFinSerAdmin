import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../Api/AxiosInstance";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("Access your dashboard securely");
  const [messageType, setMessageType] = useState("default"); 
  // default | success | error

  const navigate = useNavigate();
  async function handleEmployeeLogin(data) {
  try {
    const res = await axiosInstance.post("/login/employee", data);

    if (res.status === 200) {
      setMessage(res.data.message || "Login successful");
      setMessageType("success");

      setTimeout(() => {
        navigate("/employee-dashboard");
      }, 800); // small delay so user sees message
    }
  } catch (error) {
    setMessage(
      error.response?.data?.message || "Login failed"
    );
    setMessageType("error");
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-white mb-6 tracking-wide">
          Employee Login
        </h2>
      <p className={`text-center mb-6 text-sm font-medium transition-colors
          ${
            messageType === "success"
            ? "text-green-400"
            : messageType === "error"
            ? "text-red-400"
            : "text-gray-300"
          }
    `}>
      {message}
      </p>

        <form
          onSubmit={handleSubmit(handleEmployeeLogin)}
          className="space-y-5"
        >
          <div>
            <label className="block text-gray-300 mb-1 text-sm">Email</label>
            <input
              type="text"
              {...register("email")}
              placeholder="Enter email"
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-xl hover:opacity-90 transition font-medium"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          © 2026 Employee Panel
        </p>
      </div>
    </div>
  );
};

export default Employee;
