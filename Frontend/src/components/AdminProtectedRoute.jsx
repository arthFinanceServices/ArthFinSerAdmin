import { useEffect, useState } from "react";
import axiosInstance from "../Api/AxiosInstance";
import { Navigate } from "react-router-dom";

export const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/check-auth");

        // ✅ user exists → authenticated
        if (res.data?.user) {
          setIsAuthenticated(true);
          setRole(res.data.user.role); // ✅ role = "admin"
        }
      } catch (error) {
        setIsAuthenticated(false);
        setRole(null);
      } finally {
        setLoading(false); // ✅ IMPORTANT
      }
    };

    checkAuth();
  }, []);

  // ✅ 1. Wait while checking auth
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // ✅ 2. Not logged in → admin login
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  // ✅ 3. Logged in but NOT admin
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ 4. Admin → allow access
  return children;
};
