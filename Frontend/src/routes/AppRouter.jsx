import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../components/Admin";
import Employee from "../components/Employee";
import EmployeeDetails from "../Employee Details/EmployeeDetails";
import EmployeeDashboad from "../components/EmployeeDashboad";

import { AdminProtectedRoute } from "../components/AdminProtectedRoute";
import { EmployeeProtectedRoute } from "../components/EmployeeProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/employee" element={<Employee />}></Route>
      <Route
        path="/employeeDetails"
        element={
          <AdminProtectedRoute>
            <EmployeeDetails />
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/employee-dashboard"
        element={
          <EmployeeProtectedRoute>
            <EmployeeDashboad />
          </EmployeeProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};

export default AppRouter;
