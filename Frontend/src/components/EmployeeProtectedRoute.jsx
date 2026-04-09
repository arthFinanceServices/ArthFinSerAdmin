import { useEffect, useState } from "react";
import axiosInstance from "../Api/AxiosInstance";
import { Navigate } from "react-router-dom";

export const EmployeeProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState("");

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/check-auth");
      setIsAuthenticated(res.data.success);
      setUser(res.data.user.user);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <h1>Loading...</h1>;

  if (!isAuthenticated) return <Navigate to="/employee" />; // login page par bhejo

  if (user !== "employee") return <Navigate to="/employee" />; // employee nahi to bhejo

  return children; // ✅ Employee hai to page dikhaao
};
