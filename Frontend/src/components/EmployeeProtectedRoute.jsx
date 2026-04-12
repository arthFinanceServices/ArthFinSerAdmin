import { useEffect, useState } from "react";
import axiosInstance from "../Api/AxiosInstance";
import { Navigate } from "react-router-dom";

export const EmployeeProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/check-auth");

        if (res.data?.user) {
          setIsAuthenticated(true);
          setRole(res.data.user.role); // ✅ "employee"
        }
      } catch (error) {
        setIsAuthenticated(false);
        setRole(null);
      } finally {
        setLoading(false); // ✅ always stop loading
      }
    };

    checkAuth();
  }, []);

  // ✅ 1. Wait for auth check to finish
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // ✅ 2. Not logged in → employee login
  if (!isAuthenticated) {
    return <Navigate to="/employee" replace />;
  }

  // ✅ 3. Logged in but not employee
  if (role !== "employee") {
    return <Navigate to="/employee" replace />;
  }

  // ✅ 4. Employee → allow access
  return children;
};
