import React from "react";
import axiosInstance from "../Api/AxiosInstance";
import { useState } from "react";
import { useEffect } from "react";

const EmployeeDashboard = () => {
  return (
    <div className="min-h-screen bg-[#f4f6fb] flex flex-col items-center px-4 py-10">
      <h1 className="text-2xl font-medium text-gray-800 mb-6 tracking-tight">
        Employee Form
      </h1>
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
