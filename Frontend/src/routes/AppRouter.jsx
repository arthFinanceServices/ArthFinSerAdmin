import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../components/Admin";
import Employee from "../components/Employee";
import EmployeeDetails from "../Employee Details/EmployeeDetails";
import EmployeeDashboad from "../components/EmployeeDashboad";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/employee" element={<Employee />}></Route>
      <Route
        path="/employeeDetails"
        element={
          <ProtectedRoute>
            <EmployeeDetails />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute>
            <EmployeeDashboad />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};

export default AppRouter;
