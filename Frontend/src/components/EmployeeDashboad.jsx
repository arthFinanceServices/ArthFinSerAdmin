import React from "react";
import axiosInstance from "../Api/AxiosInstance";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const EmployeeDashboard = () => {
      const navigate = useNavigate();
    
    const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
    } catch (err) {
      // even if backend fails, still logout frontend
    } finally {
      navigate("/employee", { replace: true });
    }
    };

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex flex-col items-center px-4 py-10">
  <div className="max-w-5xl mx-auto mb-6 grid grid-cols-3 items-center">
  {/* Left spacer */}
  <div></div>

  {/* ✅ Centered title */}
  <h1 className="text-2xl font-medium text-gray-800 tracking-tight text-center">
    Employee Form
  </h1>

  {/* ✅ Right-aligned logout */}
  <div className="flex justify-end">
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
    >
      Logout
    </button>
  </div>
</div>
    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-white">
        <iframe
          src={import.meta.env.VITE_FORM_URL}
          className="w-full min-h-[620px] border-0 block"
          title="Employee Form"
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
