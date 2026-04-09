import { useEffect, useState } from "react";
import axiosInstance from "../Api/AxiosInstance";
import { Navigate } from "react-router-dom";

export const AdminProtectedRoute = ({ children }) => {
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

  if (!isAuthenticated) return <Navigate to="/admin" />; // login page par bhejo

  if (user !== "admin") return <Navigate to="/" />; // admin nahi hai to bhejo

  return children; // ✅ Admin hai to page dikhaao
};
