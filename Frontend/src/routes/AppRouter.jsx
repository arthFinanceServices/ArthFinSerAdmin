import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Admin from "../components/Admin";
import Employee from "../components/Employee";
import EmployeeDetails from "../Employee Details/EmployeeDetails";
import EmployeeDashboad from "../components/EmployeeDashboad";
import DealerStatus from "../components/DealerStatus";

import { AdminProtectedRoute } from "../components/AdminProtectedRoute";
import { EmployeeProtectedRoute } from "../components/EmployeeProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" />} />

      {/* Auth */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/employee" element={<Employee />} />

      {/* Admin */}
      <Route
        path="/employeeDetails"
        element={
          <AdminProtectedRoute>
            <EmployeeDetails />
          </AdminProtectedRoute>
        }
      />

      {/* Employee */}
      <Route
        path="/employee-dashboard"
        element={
          <EmployeeProtectedRoute>
            <EmployeeDashboad />
          </EmployeeProtectedRoute>
        }
      />

      {/* ✅ Dealer Status (PUBLIC) */}
      <Route path="/dealer-status" element={<DealerStatus />} />
    </Routes>
  );
};

export default AppRouter;
